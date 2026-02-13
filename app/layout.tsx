// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "AniLog",
  description: "Anime log",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
