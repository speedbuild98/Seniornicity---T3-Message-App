
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center justify-center bg-gradient-to-b from-primary to-black text-white gap-5">
      {children}
    </main>
  )
}
