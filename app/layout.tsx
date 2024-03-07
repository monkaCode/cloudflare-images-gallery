import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });



// app/layout.tsx
import {Providers} from "./providers";
import {Toaster} from "@/components/sonner";
import {Navbar} from "@/components/globalnav/navbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
            <Navbar title={"Images Gallery"}/>
            <main className="container mx-auto my-auto max-w-7xl pt-16 px-6 flex-grow mb-5">
                {children}
            </main>
            <Toaster />
        </Providers>
        </body>
        </html>
    );
}
export const metadata: Metadata = {
    title: "Images Gallery",
    description: "Cloudflare Images Gallery",
};
