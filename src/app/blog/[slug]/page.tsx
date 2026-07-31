import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-heading text-6xl font-bold text-primary">404</h1>
      <Link href="/" className="text-muted hover:text-foreground">
        Back to homepage
      </Link>
    </main>
  );
}