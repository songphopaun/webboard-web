'use client';
import React from 'react';
import { RiHome6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex flex-col w-64 min-h-screen ">
            <div className="flex flex-col h-full">
                <div className="flex flex-col space-y-1 p-4">
                    <Link
                        href="/"
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                            pathname === '/' || pathname.startsWith('/post')
                                ? 'text-brand-green500 font-semibold '
                                : 'text-gray-700 '
                        }`}
                    >
                        <RiHome6Line
                            className={`h-6 w-6 ${
                                pathname === '/' || pathname.startsWith('/post')
                                    ? 'font-bold'
                                    : ''
                            }`}
                        />
                        <span className="ml-3">Home</span>
                    </Link>

                    <Link
                        href="/our-blog"
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                            pathname === '/our-blog'
                                ? 'text-brand-green500 font-semibold '
                                : 'text-gray-700 '
                        }`}
                    >
                        <LiaEdit
                            className={`h-6 w-6 ${
                                pathname === '/our-blog' ? 'font-bold' : ''
                            }`}
                        />
                        <span className="ml-3">Our Blog</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
