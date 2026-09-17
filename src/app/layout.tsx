import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Taskflow — A calmer way to get things done",
  description: "A simple task manager for focused, productive days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster
          position="top-right"
          closeButton
          toastOptions={{
            classNames: {
              toast: "rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10",
              title: "font-semibold text-[#1e2933]",
              success: "border-[#c9dccd]",
              error: "border-red-200",
              closeButton: "border-slate-200 bg-white text-slate-500 hover:text-[#1e2933]",
            },
          }}
        />
      </body>
    </html>
  );
}
