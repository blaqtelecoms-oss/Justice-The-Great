import { useEffect, useState } from "react";

// Thin scroll-progress bar pinned to the top of the viewport.
export default function ProgressBar() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[99] bg-landing-blue"
      style={{ width: `${w}%` }}
    />
  );
}