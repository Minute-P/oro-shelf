import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oro Shelf Dashboard',
  description: 'Dashboard สำหรับแสดงผลข้อมูลตรวจสอบสินค้าโดย AI'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
