export const metadata = {
  title: 'PAI — Learn AI',
  description: 'Your personal AI learning buddy',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
