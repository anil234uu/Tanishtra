"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Folders, Settings, LogOut, ExternalLink, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('tanishtra-admin-auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'tanishtra@gmail.com' && password === 'admin123') {
            localStorage.setItem('tanishtra-admin-auth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('tanishtra-admin-auth');
        setIsAuthenticated(false);
        router.push('/');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-background-secondary border border-border p-8 rounded-lg shadow-dark">
                    <div className="text-center mb-8">
                        <span className="font-bebas text-3xl tracking-[4px] text-accent-gold select-none">TANISHTRA</span>
                        <h1 className="font-playfair text-2xl text-text mt-2">Admin Portal</h1>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        {error && (
                            <div className="p-3 bg-system-error/10 border border-system-error/50 rounded text-system-error text-sm font-inter text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors"
                                required
                            />
                        </div>

                        <button type="submit" className="bg-accent-gold text-background hover:bg-accent-gold-light transition-colors py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] mt-2">
                            Access Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-border">
                        <Link href="/" className="text-text-muted hover:text-accent-gold transition-colors text-sm font-inter">
                            &larr; Return to Website
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const NAV_LINKS = [
        { name: 'Overview', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Products', href: '/admin/products', icon: <Package size={20} /> },
        { name: 'Categories', href: '/admin/categories', icon: <Folders size={20} /> },
        { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-background flex">

            {/* Mobile Sidebar Toggle Area */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary border-b border-border z-30 flex items-center justify-between px-4">
                <span className="font-bebas text-xl tracking-[2px] text-accent-gold select-none">TANISHTRA ADMIN</span>
                <button onClick={() => setIsSidebarOpen(true)} className="text-text hover:text-accent-gold">
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-background-secondary border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-border lg:justify-center">
                    <span className="font-bebas text-2xl tracking-[4px] text-accent-gold select-none hidden lg:block">TANISHTRA</span>
                    <span className="font-bebas text-xl tracking-[2px] text-text select-none lg:hidden">MENU</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-muted hover:text-accent-gold">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    <span className="font-montserrat text-[10px] uppercase text-text-muted tracking-[2px] px-2 mb-2">Management</span>

                    {NAV_LINKS.map(link => {
                        const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all ${isActive ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30 font-bold' : 'text-text-secondary hover:text-text hover:bg-background'}`}
                            >
                                {link.icon}
                                <span className="font-inter text-[15px]">{link.name}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-border flex flex-col gap-2">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded text-text-secondary hover:text-text hover:bg-background transition-all">
                        <ExternalLink size={20} />
                        <span className="font-inter text-[14px]">View Live Site</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded text-system-error hover:bg-system-error/10 transition-all font-inter text-[14px] text-left">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" />
            )}

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen pt-16 lg:pt-0 overflow-x-hidden">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    );
}
