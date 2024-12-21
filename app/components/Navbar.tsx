'use client';
import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { RiHome6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import { IoMenuOutline } from 'react-icons/io5';
import { useUserStore } from '@/stores';
import Link from 'next/link';

function Navbar() {
    const { username, img } = useUserStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-brand-green500 text-white p-4">
            <div className="flex justify-between items-center mx-4">
                <span className="font-castoro italic text-xl">a Board</span>
                <div className="hidden md:flex space-x-4 items-center">
                    {username ? (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{username}</span>
                            <img
                                src={img}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="bg-base-success px-4 py-2 rounded-lg font-ibm font-semibold text-sm hover:bg-brand-green300">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
                <button
                    className="block md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <IoMenuOutline className="h-7 w-7" />
                </button>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        <div
                            className={`fixed top-0 right-0 h-full w-[70%] bg-brand-green500 transform translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg rounded-tl-3xl rounded-bl-xl`}
                        >
                            <button
                                className="absolute top-5 left-5"
                                onClick={() => setIsOpen(false)}
                            >
                                <IoIosArrowRoundForward className="h-8 w-8" />
                            </button>
                            <div className="mt-20 flex flex-col  space-y-6 px-6">
                                <a href="#" className="flex items-center">
                                    <RiHome6Line className="h-6 w-6" />
                                    <span className="ml-3">Home</span>
                                </a>
                                <a href="#" className="flex items-center">
                                    <LiaEdit className="h-6 w-6" />
                                    <span className="ml-3">Our Blog</span>
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
