package in.tanishtra.shop;
import android.app.Activity;
import android.app.Dialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.webkit.*;
import android.widget.*;

public class MainActivity extends Activity {
    private static final String HOME = "https://tanishtra.in/";
    private WebView web;
    private ProgressBar progress;
    private LinearLayout error;
    private ValueCallback<Uri[]> upload;
    private static final int PICK_FILE = 21;
    private String retryUrl = HOME;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            if (android.os.Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            }
            return insets;
        });
        progress = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progress.setMax(100);
        root.addView(progress, new LinearLayout.LayoutParams(-1, dp(3)));
        FrameLayout content = new FrameLayout(this);
        root.addView(content, new LinearLayout.LayoutParams(-1, 0, 1));
        web = new WebView(this);
        content.addView(web, new FrameLayout.LayoutParams(-1,-1));
        configure(web);
        error = new LinearLayout(this);
        error.setOrientation(LinearLayout.VERTICAL);
        error.setGravity(android.view.Gravity.CENTER);
        error.setPadding(dp(24),dp(24),dp(24),dp(24));
        error.setBackgroundColor(Color.WHITE);
        TextView msg = new TextView(this);
        msg.setText("Unable to connect to TANISHTRA.\nPlease check your internet connection.");
        msg.setGravity(android.view.Gravity.CENTER);
        error.addView(msg);
        Button retry = new Button(this);
        retry.setText("Try again");
        retry.setOnClickListener(v -> { error.setVisibility(View.GONE); web.loadUrl(retryUrl); });
        error.addView(retry);
        Button home = new Button(this); home.setText("Back to shop");
        home.setOnClickListener(v -> { error.setVisibility(View.GONE); web.loadUrl(HOME); });
        error.addView(home);
        content.addView(error, new FrameLayout.LayoutParams(-1,-1));
        error.setVisibility(View.GONE);
        setContentView(root);
        if (state == null || web.restoreState(state) == null) web.loadUrl(HOME);
    }
    private int dp(int n) { return Math.round(n * getResources().getDisplayMetrics().density); }
    private void configure(WebView view) {
        WebSettings s = view.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setSupportMultipleWindows(true);
        s.setMediaPlaybackRequiresUserGesture(true);
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(view, true);
        view.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                return r.isForMainFrame() && navigate(r.getUrl());
            }
            @Override public void onPageStarted(WebView v, String url, android.graphics.Bitmap icon) {
                if (v == web) { retryUrl = url; progress.setVisibility(View.VISIBLE); error.setVisibility(View.GONE); }
            }
            @Override public void onPageFinished(WebView v, String url) { CookieManager.getInstance().flush(); }
            @Override public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (v == web && r.isForMainFrame()) { progress.setVisibility(View.GONE); error.setVisibility(View.VISIBLE); }
            }
            @Override public void onReceivedSslError(WebView v, SslErrorHandler h, android.net.http.SslError e) { h.cancel(); }
        });
        view.setWebChromeClient(new WebChromeClient() {
            @Override public void onProgressChanged(WebView v,int p) {
                if (v == web) { progress.setProgress(p); progress.setVisibility(p == 100 ? View.GONE : View.VISIBLE); }
            }
            @Override public boolean onCreateWindow(WebView v, boolean dialog, boolean gesture, Message result) {
                if (!gesture) return false;
                Dialog popup = new Dialog(MainActivity.this);
                WebView child = new WebView(MainActivity.this);
                configure(child);
                LinearLayout panel = new LinearLayout(MainActivity.this); panel.setOrientation(LinearLayout.VERTICAL);
                Button close = new Button(MainActivity.this); close.setText("Close"); close.setOnClickListener(w -> popup.dismiss());
                panel.addView(close); panel.addView(child,new LinearLayout.LayoutParams(-1,0,1));
                popup.setContentView(panel); popup.setOnDismissListener(d -> child.destroy()); popup.show();
                if(popup.getWindow()!=null) popup.getWindow().setLayout(-1,-1);
                ((WebView.WebViewTransport)result.obj).setWebView(child); result.sendToTarget(); return true;
            }
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if(upload!=null) upload.onReceiveValue(null);
                upload=callback;
                try { startActivityForResult(params.createIntent(),PICK_FILE); }
                catch(ActivityNotFoundException e) { upload.onReceiveValue(null); upload=null; }
                return true;
            }
        });
        view.setDownloadListener((url,ua,cd,mime,len) -> { Uri u=Uri.parse(url); if("https".equalsIgnoreCase(u.getScheme())) openExternal(u); });
    }
    private boolean navigate(Uri uri) {
        String scheme = uri.getScheme();
        if ("https".equalsIgnoreCase(scheme)) {
            String host=uri.getHost();
            if ("accounts.google.com".equalsIgnoreCase(host) || "wa.me".equalsIgnoreCase(host) || "api.whatsapp.com".equalsIgnoreCase(host)) { openExternal(uri); return true; }
            return false;
        }
        if ("intent".equalsIgnoreCase(scheme)) {
            try {
                Intent parsed=Intent.parseUri(uri.toString(),Intent.URI_INTENT_SCHEME);
                Uri data=parsed.getData();
                if(data!=null && allowedExternal(data.getScheme())) {
                    Intent safe=new Intent(Intent.ACTION_VIEW,data).addCategory(Intent.CATEGORY_BROWSABLE);
                    if(parsed.getPackage()!=null) safe.setPackage(parsed.getPackage());
                    try { startActivity(safe); return true; } catch(ActivityNotFoundException ignored) { }
                }
                String fallback=parsed.getStringExtra("browser_fallback_url");
                if(fallback!=null && "https".equalsIgnoreCase(Uri.parse(fallback).getScheme())) { openExternal(Uri.parse(fallback)); return true; }
            } catch(Exception ignored) { }
            Toast.makeText(this,"No supported app available",Toast.LENGTH_SHORT).show(); return true;
        }
        if(allowedExternal(scheme)) openExternal(uri);
        return true;
    }
    private boolean allowedExternal(String s) { return "upi".equalsIgnoreCase(s)||"tez".equalsIgnoreCase(s)||"phonepe".equalsIgnoreCase(s)||"paytmmp".equalsIgnoreCase(s)||"whatsapp".equalsIgnoreCase(s)||"tel".equalsIgnoreCase(s)||"mailto".equalsIgnoreCase(s)||"sms".equalsIgnoreCase(s)||"gpay".equalsIgnoreCase(s); }
    private void openExternal(Uri uri) {
        try { startActivity(new Intent(Intent.ACTION_VIEW,uri).addCategory(Intent.CATEGORY_BROWSABLE)); }
        catch(ActivityNotFoundException e) { Toast.makeText(this,"No supported app available",Toast.LENGTH_SHORT).show(); }
    }
    @Override protected void onActivityResult(int request,int result,Intent data) {
        super.onActivityResult(request,result,data);
        if(request==PICK_FILE && upload!=null) { upload.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result,data)); upload=null; }
    }
    @Override public void onBackPressed() { if(error.getVisibility()==View.VISIBLE) { error.setVisibility(View.GONE); if(web.canGoBack()) web.goBack(); else web.loadUrl(HOME); } else if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
    @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
    @Override protected void onPause() { super.onPause(); web.onPause(); CookieManager.getInstance().flush(); }
    @Override protected void onResume() { super.onResume(); web.onResume(); }
    @Override protected void onDestroy() { if(upload!=null) upload.onReceiveValue(null); if(web!=null) { if(web.getParent() instanceof ViewGroup) ((ViewGroup)web.getParent()).removeView(web); web.destroy(); } super.onDestroy(); }
}
