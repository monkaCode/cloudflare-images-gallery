import type { Metadata } from "next";
import './globals.css';
import {Providers} from "./providers";
import {Toaster} from "@/components/sonner";
import {Navbar} from "@/components/globalnav/navbar";
import { UserProvider } from "./providers/UserProvider";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
                    <UserProvider>
                        {children}
                        <Toaster />
                    </UserProvider>
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
