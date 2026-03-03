"use client";
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="bg-background min-h-screen pt-12 pb-24">

            {/* Header Container */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 mb-12 md:mb-20 pt-10">
                <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                    SUPPORT
                </span>
                <h1 className="font-bebas text-5xl md:text-7xl tracking-[4px] text-text mb-4">
                    GET IN TOUCH
                </h1>
                <p className="font-inter text-[18px] text-text-secondary max-w-xl">
                    Whether you have a question about our collections, need help with an order, or just want to talk style — we're here.
                </p>
            </div>

            <div className="max-w-[1320px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left: Contact Info */}
                    <div className="flex flex-col gap-10">

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center border border-border shrink-0 text-accent-gold">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="font-montserrat text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Call Us</h3>
                                <a href="tel:+919594700173" className="font-inter text-2xl text-text hover:text-accent-gold transition-colors font-bold">
                                    +91 9594700173
                                </a>
                                <p className="font-inter text-sm text-text-muted mt-2">Mon - Sat, 10:00 AM to 7:00 PM IST</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center border border-border shrink-0 text-accent-gold">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-montserrat text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Email Us</h3>
                                <a href="mailto:tanishtra@gmail.com" className="font-inter text-lg text-text hover:text-accent-gold transition-colors font-bold">
                                    tanishtra@gmail.com
                                </a>
                                <p className="font-inter text-sm text-text-muted mt-2">We try to respond within 24 hours.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center border border-border shrink-0 text-accent-gold">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-montserrat text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Our Office</h3>
                                <p className="font-inter text-lg text-text font-bold leading-snug">
                                    Goregaon West, Mumbai<br />
                                    Maharashtra, India
                                </p>
                                <p className="font-inter text-sm text-text-muted mt-2">Headquarters & Design Studio</p>
                            </div>
                        </div>

                        {/* WhatsApp Callout */}
                        <div className="mt-6 bg-background-secondary border border-border p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="font-playfair text-2xl text-text mb-2">Need Instant Help?</h3>
                                <p className="font-inter text-sm text-text-secondary">Message us directly on WhatsApp for immediate assistance regarding sizing or delivery.</p>
                            </div>
                            <a
                                href="https://wa.me/919594700173"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 bg-[#25D366] text-white hover:bg-[#20BE5C] transition-colors font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[24px] py-[12px] rounded flex items-center gap-2"
                            >
                                <MessageCircle size={18} />
                                WhatsApp Us
                            </a>
                        </div>

                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-background-secondary border border-border p-6 md:p-10 rounded-lg shadow-dark">
                        <h2 className="font-playfair text-[28px] text-text mb-8">Send a Message</h2>

                        {isSuccess ? (
                            <div className="bg-system-success/10 border border-system-success/30 p-8 rounded text-center">
                                <div className="w-16 h-16 bg-system-success/20 rounded-full flex items-center justify-center text-system-success mx-auto mb-4">
                                    <Send size={24} />
                                </div>
                                <h3 className="font-inter text-xl text-text font-bold mb-2">Message Sent Successfully!</h3>
                                <p className="font-inter text-text-secondary">Thank you for reaching out. A member of our team will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subject" className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={(e: any) => handleChange(e)}
                                        required
                                        className="bg-background border border-border rounded px-4 py-3 text-text font-inter appearance-none focus:outline-none focus:border-accent-gold transition-colors"
                                    >
                                        <option value="" disabled>Select a topic</option>
                                        <option value="order_status">Order Status & Tracking</option>
                                        <option value="returns">Returns & Exchanges</option>
                                        <option value="product_inquiry">Product Inquiry</option>
                                        <option value="wholesale">Wholesale / Bulk Orders</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="bg-background border border-border rounded px-4 py-3 text-text font-inter resize-y focus:outline-none focus:border-accent-gold transition-colors"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-accent-gold text-background font-montserrat text-[14px] uppercase font-bold py-4 rounded mt-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-accent-gold-light'
                                        }`}
                                >
                                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                </button>

                            </form>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}
