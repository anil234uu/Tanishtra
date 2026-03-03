import React from 'react';

export const metadata = { title: "Terms & Conditions | Tanishtra" };

export default function TermsPage() {
    return (
        <div className="bg-background min-h-screen pt-16 pb-24">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-10 prose prose-invert prose-p:font-inter prose-p:text-text-secondary prose-p:leading-[1.7] prose-h2:font-playfair prose-h2:text-text prose-h2:mt-10 prose-h2:mb-4">

                <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block text-center">LEGAL</span>
                <h1 className="font-bebas text-5xl md:text-6xl tracking-[4px] text-text mb-12 text-center">TERMS & CONDITIONS</h1>

                <h2>Overview</h2>
                <p>
                    This website is operated by Tanishtra. Throughout the site, the terms "we", "us" and "our" refer to Tanishtra. By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.
                </p>

                <h2>Online Store Terms</h2>
                <p>
                    By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.
                </p>

                <h2>Products or Services</h2>
                <p>
                    Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>

                <h2>Modifications to the Service and Prices</h2>
                <p>
                    Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>

                <h2>Contact Information</h2>
                <p>
                    Questions about the Terms of Service should be sent to us at <a href="mailto:tanishtra@gmail.com" className="text-accent-gold no-underline hover:underline">tanishtra@gmail.com</a>.
                </p>

            </div>
        </div>
    );
}
