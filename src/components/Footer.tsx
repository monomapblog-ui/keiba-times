const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/15">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-500">
        <p>&copy; {year} 競馬予想メディア</p>
      </div>
    </footer>
  );
}
