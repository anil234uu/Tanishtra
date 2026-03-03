import React from 'react';
import Link from 'next/link';

export const metadata = { title: "Return Policy | Tanishtra" };

export default function ReturnPolicyPage() {
    return (
        <div className="bg-background min-h-screen pt-16 pb-24">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-10 prose prose-invert prose-p:font-inter prose-p:text-text-secondary prose-p:leading-[1.7] prose-h2:font-playfair prose-h2:text-text prose-h2:mt-10 prose-h2:mb-4">

                <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block text-center">LEGAL</span>
                <h1 className="font-bebas text-5xl md:text-6xl tracking-[4px] text-text mb-12 text-center">RETURN POLICY</h1>

                <h2>7-Day Return Window</h2>
                <p>
                    We want you to be completely satisfied with your Tanishtra purchase. If for any reason you are not, we offer a hassle-free 7-day return policy. This means you have 7 days after receiving your item to request a return or exchange.
                </p>

                <h2>Conditions for Returns</h2>
                <p>
                    To be eligible for a return, your item must be in the exact same condition that you received it:
                </p>
                <ul>
                    <li>Unworn and unused</li>
                    <li>With all original tags still attached</li>
                    <li>In its original, undamaged Tanishtra packaging</li>
                </ul>

                <h2>Starting a Return</h2>
                <p>
                    To start a return, please contact us at <a href="mailto:tanishtra@gmail.com" className="text-accent-gold no-underline hover:underline">tanishtra@gmail.com</a> with your order number and the reason for the return. If your return is accepted, we will send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
                </p>

                <h2>Refunds</h2>
                <p>
                    We will notify you once we've received and inspected your return. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.
                </p>

                <div className="mt-12 text-center">
                    <Link href="/contact" className="bg-accent-gold text-background px-8 py-3 font-montserrat uppercase font-bold text-sm tracking-[1px] rounded no-underline inline-block">CONTACT SUPPORT</Link>
                </div>

            </div>
        </div>
    );
}
