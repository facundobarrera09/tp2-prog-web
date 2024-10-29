import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideNav from "../components/navigation/SideNav";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Instituto",
    description: "Aplicación de administración del Instituto",
};

interface layoutProps { children: React.ReactNode; }

export default function RootLayout({ children }: Readonly<layoutProps>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex row h-screen`}
            >
                <SideNav />
                {children}
            </body>
        </html>
    );
}
