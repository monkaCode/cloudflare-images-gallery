import type { Metadata } from "next";
import './globals.css';

import {Providers} from "./providers";
import {Toaster} from "@/components/sonner";
import {Navbar} from "@/components/globalnav/navbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
                    <Navbar title={"Valolytics Images"} icon={"https://imagedelivery.net/WUSOKAY-iA_QQPngCXgUJg/e30fb45b-1f85-4cae-5b52-9c733d0c8f00/w=40"}/>
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
    title: "Valolytics Images",
    description: "Valolytics Images Gallery",
    icons: {
        icon: "/valolytics_64.png",
        apple: "/valolytics_64.png",
        shortcut: "/valolytics_64.png",
    },
};
