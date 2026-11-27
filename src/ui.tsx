import { useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export const ease = [0.76, 0, 0.24, 1] as const;

/** Masked line-by-line headline reveal (overflow-hidden + translateY, staggered). */
export function Lines({ lines, className = "", delay = 0, as: Tag = "h2" }: { lines: string[]; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  return (
    <Tag ref={ref} className={`display ${className}`} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" initial={{ y: rm ? 0 : "112%" }} animate={seen ? { y: 0 } : undefined}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Photo slot with scroll parallax. Pass `src` to use a real photo; otherwise shows an editable placeholder. */
export function Photo({ label, src, speed = 12, tone = "#2a2a2a", className = "" }: { label: string; src?: string; speed?: number; tone?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const s = rm ? 0 : speed;
  const y = useTransform(scrollYProgress, [0, 1], [`${-s}%`, `${s}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], rm ? [1, 1, 1] : [1.18, 1.08, 1.18]);
  return (
    <div ref={ref} className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`} style={{ background: tone }}>
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        {src ? <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" /> : (
          <div className="flex h-full w-full items-end p-4" style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.07) 0 12px,transparent 12px 24px)" }}>
            <span className="bg-sun px-2 py-1 text-xs font-semibold text-ink">PHOTO SLOT: {label}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
