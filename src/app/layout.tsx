// src/app/layout.tsx
export const metadata = {
  title: "Ida's Kitchen",
  description: "A digital home for the Staussi/DeSouza family.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
