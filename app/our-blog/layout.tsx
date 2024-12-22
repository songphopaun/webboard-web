import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function PostLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden ">
                <div className="hidden md:flex flex-col w-64 min-h-screen ">
                    <Sidebar />
                </div>
                <main className="flex-1 overflow-auto bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
