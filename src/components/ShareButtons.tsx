"use client";

import { useEffect, useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable; silently ignore
    }
  };

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const lineHref = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-neutral-500">シェア</span>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xでシェア"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white hover:opacity-80"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={lineHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEでシェア"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#06C755] text-white hover:opacity-80"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2C6.486 2 2 5.589 2 10c0 3.95 3.544 7.26 8.332 7.902.325.07.766.215.878.494.1.253.065.65.032.906l-.142 1.03c-.04.306-.233 1.195 1.047.652 1.28-.544 6.91-4.069 9.428-6.967C22.846 12.656 22 11.33 22 10c0-4.411-4.486-8-10-8zm-3.59 10.413H6.734V8.448a.36.36 0 0 1 .36-.36h.362a.36.36 0 0 1 .36.36v3.246h1.595a.36.36 0 0 1 .36.36v.36a.36.36 0 0 1-.36.36zm1.806 0a.36.36 0 0 1-.36-.36V8.448a.36.36 0 0 1 .72 0v3.605a.36.36 0 0 1-.36.36zm4.26 0h-.362a.36.36 0 0 1-.287-.144l-1.654-2.25v2.034a.36.36 0 0 1-.72 0V8.448a.36.36 0 0 1 .36-.36h.362a.36.36 0 0 1 .287.144l1.653 2.25V8.448a.36.36 0 0 1 .72 0v3.605a.36.36 0 0 1-.36.36zm3.405-2.883h-1.596v.722h1.596a.36.36 0 0 1 0 .72h-1.596v.721h1.596a.36.36 0 0 1 0 .72h-1.956a.36.36 0 0 1-.36-.36V8.448a.36.36 0 0 1 .36-.36h1.956a.36.36 0 0 1 0 .72z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:border-neutral-400"
      >
        {copied ? "コピーしました" : "リンクをコピー"}
      </button>
    </div>
  );
}
