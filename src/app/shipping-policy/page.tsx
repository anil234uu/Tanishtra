import React from 'react';

export const metadata = { title: "Shipping Policy | Tanishtra" };

export default function ShippingPolicyPage() {
    return (
        <div className="bg-background min-h-screen pt-16 pb-24">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-10 prose prose-invert prose-p:font-inter prose-p:text-text-secondary prose-p:leading-[1.7] prose-h2:font-playfair prose-h2:text-text prose-h2:mt-10 prose-h2:mb-4">

                <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block text-center">LEGAL</span>
                <h1 className="font-bebas text-5xl md:text-6xl tracking-[4px] text-text mb-12 text-center">SHIPPING POLICY</h1>

                <div className="bg-background-secondary border border-border p-8 rounded-lg mb-10">
                    <h3 className="font-inter font-bold text-lg text-text mb-2">Free Pan-India Shipping</h3>
                    <p className="text-text-muted m-0">We are proud to offer free standard shipping on all orders above ₹999 within India.</p>
                </div>

                <h2>Processing Time</h2>
                <p>
                    All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped, complete with a tracking number.
                </p>

                <h2>Delivery Estimates</h2>
                <ul>
                    <li><strong>Tier 1 Cities (Mumbai, Delhi, Blr, etc.):</strong> 2-4 business days</li>
                    <li><strong>Rest of India:</strong> 4-7 business days</li>
                </ul>
                <p>
                    Please note that unforeseen circumstances like weather delays or logistical issues at the courier's end may occasionally impact delivery times.
                </p>

                <h2>Cash on Delivery (COD)</h2>
                <p>
                    Cash on Delivery is available across most pin codes in India. A nominal convenience fee may apply to COD orders below ₹999. Please keep exact change ready to facilitate a smooth delivery.
                </p>

            </div>
        </div>
    );
}
