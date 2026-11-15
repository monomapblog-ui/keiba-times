import { FaHorse } from "react-icons/fa";

export default function LoadingHorse({ label = "読み込み中" }: { label?: string }) {
  return (
    <div className="loading-horse flex flex-col items-center justify-center gap-4 py-20">
      <div className="loading-horse__stage">
        <div className="loading-horse__lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <FaHorse className="loading-horse__icon" aria-hidden="true" />
      </div>
      <p className="text-xs font-bold text-neutral-500">{label}</p>

      <style>{`
        .loading-horse__stage {
          position: relative;
          width: 96px;
          height: 72px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .loading-horse__icon {
          width: 64px;
          height: 64px;
          color: #171717;
          animation: loading-horse-gallop 0.5s ease-in-out infinite;
          transform-origin: 50% 100%;
        }
        .loading-horse__lines {
          position: absolute;
          left: 0;
          top: 18px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .loading-horse__lines span {
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 1px;
          background: currentColor;
          color: #171717;
          animation: loading-horse-dust 0.5s linear infinite;
        }
        .loading-horse__lines span:nth-child(2) {
          width: 14px;
          animation-delay: 0.1s;
        }
        .loading-horse__lines span:nth-child(3) {
          width: 10px;
          animation-delay: 0.2s;
        }
        @keyframes loading-horse-gallop {
          0%, 100% { transform: translateY(0) rotate(0deg) scaleX(1); }
          30% { transform: translateY(-7px) rotate(-3deg) scaleX(0.97); }
          60% { transform: translateY(0) rotate(1deg) scaleX(1.02); }
        }
        @keyframes loading-horse-dust {
          0% { opacity: 0; transform: translateX(10px); }
          40% { opacity: 0.5; }
          100% { opacity: 0; transform: translateX(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-horse__icon,
          .loading-horse__lines span {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
