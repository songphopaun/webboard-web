import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <div className="h-screen flex flex-col">
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-4/5 md:w-2/5">
                        <Alert />
                    </div>
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
