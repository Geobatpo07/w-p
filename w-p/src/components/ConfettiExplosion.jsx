import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiExplosion({ duration = 2500, colors, particleCount = 10 }) {
  useEffect(() => {
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors || ["#ff3366", "#ff99cc", "#ffccff", "#ffd700"],
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors || ["#ff3366", "#ff99cc", "#ffccff", "#ffd700"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [duration, colors, particleCount]);

  return null;
}
