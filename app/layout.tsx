import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'FocusFlow - Productivity Dashboard & Focus Sessions',
  description: 'Modern productivity dashboard for students, developers, and builders to manage tasks and focused work sessions.',
  openGraph: {
    title: 'FocusFlow - Productivity Dashboard & Focus Sessions',
    description: 'Modern productivity dashboard for students, developers, and builders to manage tasks and focused work sessions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusFlow - Productivity Dashboard & Focus Sessions',
    description: 'Modern productivity dashboard for students, developers, and builders to manage tasks and focused work sessions.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
