import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProposalCard({ onAccept }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = (isMobile = false) => {
    const offset = isMobile ? 40 : 150; // plus petit mouvement sur mobile
    setNoPos({
      x: (Math.random() - 0.5) * offset,
      y: (Math.random() - 0.5) * offset,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="card card-romantic shadow-lg border-0 p-4 p-md-5 w-100 text-center"
      style={{ maxWidth: "600px" }}
    >
      {/* Icône cœur animé */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <Heart className="mx-auto text-glow w-16 h-16 sm:w-20 sm:h-20" />
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="fw-bold mt-4 text-dark"
      >
        💍 Mon amour…
      </motion.h1>

      {/* Texte introductif */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="lead text-muted mt-3"
      >
        Depuis le jour où nos chemins se sont croisés,
        ma vie a pris un sens nouveau.
        Aujourd’hui, une seule question brûle mes lèvres…
      </motion.p>

      {/* Question principale */}
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1.1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="fs-3 fw-semibold mt-4 text-glow"
      >
        Veux-tu m’épouser ? ❤️
      </motion.p>

      {/* Boutons */}
      <div className="d-flex justify-content-center gap-3 mt-4 position-relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onAccept}
          className="btn btn-romantic px-4 py-2 sm:px-5 sm:py-3"
        >
          Oui 💖
        </motion.button>

        <motion.button
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            position: "relative",
          }}
          onMouseEnter={() => moveNoButton(false)} // Desktop : fuite au hover
          onTouchStart={() => moveNoButton(true)} // Mobile : fuite au toucher
          onClick={() => alert("Pas possible 😭 Tu ne peux pas dire non !")}
          className="btn btn-secondary px-4 py-2 sm:px-5 sm:py-3"
        >
          Non 😢
        </motion.button>
      </div>
    </motion.div>
  );
}
