'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const [navWidth, setNavWidth] = useState(400);

    const menuItems = [
        { href: "/home", text: "Home" },
        { href: "/listings", text: "Listings" },
        { href: "/location", text: "Location" },
        { href: "/features", text: "Features" },

    ];

    useEffect(() => {
        const calculateWidth = () => {
            if (!linksRef.current) return;

            let totalWidth = 0;
            const items = linksRef.current.children;

            for (let i = 0; i < items.length; i++) {
                const item = items[i] as HTMLElement;
                totalWidth += item.offsetWidth;
            }

            const gapsWidth = (items.length - 1) * 24;
            const padding = 100;

            const newWidth = totalWidth + gapsWidth + padding;
            setNavWidth(Math.max(newWidth, 300));
        };

        calculateWidth();
        const resizeObserver = new ResizeObserver(calculateWidth);

        if (linksRef.current) {
            resizeObserver.observe(linksRef.current);
            Array.from(linksRef.current.children).forEach(child => {
                resizeObserver.observe(child);
            });
        }

        return () => resizeObserver.disconnect();
    }, [menuItems]);

    return (
        <header className="fixed top-0 z-50 w-full bg-transparent">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 relative z-10">
                <div className="flex-1">
                    <Link href="/">
                        <span className="text-white text-2xl font-bold cursor-pointer">HomGwe</span>
                    </Link>
                </div>

                <nav className="relative flex-auto text-center -mt-6 min-w-0">
                    <div className="inline-block relative" ref={navRef} style={{ height: '53px' }}>
                        <svg
                            className="h-[53px] mx-auto block"
                            style={{
                                width: `${navWidth}px`,
                                maxWidth: '100%',
                                minWidth: '300px'
                            }}
                            viewBox="0 0 521 62"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path d="m521 62h-521v-62h521zm-497.92-31.98c5.55 15.9 7.01 18.45 13.52 23.54 4.4 3.44 4.4 3.44 224.43 3.19 220.02-0.25 220.02-0.25 225.55-4.75 5.52-4.5 5.52-4.5 11.06-20.39 4.84-13.87 6.13-16.54 14.86-26.26l-504.87 0.15 5.2 5.02c4.86 4.71 5.52 5.96 10.25 19.5" fill="rgba(0,0,0,0)" />
                            <path d="m23.08 30.02c-4.73-13.54-5.39-14.79-10.25-19.5l-5.2-5.02 504.87-0.15c-8.73 9.72-10.02 12.39-14.86 26.26-5.54 15.89-5.54 15.89-11.06 20.39-5.53 4.5-5.53 4.5-225.55 4.75-220.03 0.25-220.03 0.25-224.43-3.19-6.51-5.09-7.97-7.64-13.52-23.54" fill="rgba(252,252,252,0.988235)" />
                        </svg>

                        <ul
                            ref={linksRef}
                            className="absolute inset-0 flex justify-center items-center space-x-6 list-none m-0 p-0"
                        >
                            {menuItems.map((item, index) => (
                                <li key={index} className="px-2 whitespace-nowrap">
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 text-sm md:text-base font-medium hover:text-black"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="flex-1 flex justify-end items-center gap-2">
                    <button className="bg-black/50 border border-white text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-full h-[32px] md:h-[40px] w-[70px] md:w-[90px] whitespace-nowrap">
                        Sign Up
                    </button>
                    <button className="bg-white border border-black text-black text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-full h-[32px] md:h-[40px] w-[70px] md:w-[90px] whitespace-nowrap">
                        Log In
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;