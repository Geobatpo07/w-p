import { useState, useRef, useEffect } from "react";
import ProposalCard from "./components/ProposalCard";
import ConfettiExplosion from "./components/ConfettiExplosion";
import { motion } from "framer-motion";
import { FaHeart, FaPlay, FaPause } from "react-icons/fa";
import song from "./assets/cant-help-falling-in-love.mp3";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0); // 🔥 nouveau
  const audioRef = useRef(null);

  // Lecture musique
  useEffect(() => {
    if (accepted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.warn("Lecture auto bloquée par le navigateur"));
    }
  }, [accepted]);

  // Compte à rebours
  useEffect(() => {
    if (countdown > 0 && !accepted) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowQuestion(true);
    }
  }, [countdown, accepted]);

  // Relance confettis toutes les 10 secondes après le OUI
  useEffect(() => {
    if (accepted) {
      const interval = setInterval(() => {
        setConfettiTrigger((prev) => prev + 1);
      }, 10000); // 10s

      return () => clearInterval(interval);
    }
  }, [accepted]);

  // Bouton Play / Pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Génération des cœurs flottants
  const renderHearts = (count = 20) =>
    [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "110vh", x: Math.random() * window.innerWidth }}
        animate={{
          y: "-10vh",
          x: `+=${Math.random() * 60 - 30}`,
        }}
        transition={{
          duration: Math.random() * 9 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="position-absolute opacity-50"
        style={{
          color: ["#ff3366", "#ff6699", "#ff99cc"][Math.floor(Math.random() * 3)],
        }}
      >
        <FaHeart size={20 + Math.random() * 30} />
      </motion.div>
    ));

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative text-center">
      {/* Musique */}
      <audio ref={audioRef} src={song} loop />

      {/* Cœurs flottants */}
      {renderHearts(window.innerWidth < 768 ? 12 : 20)}

      {/* Confettis → relancés via confettiTrigger */}
      {accepted && <ConfettiExplosion key={confettiTrigger} />}

      {/* Contenu */}
      {!accepted ? (
        showQuestion ? (
          <ProposalCard onAccept={() => setAccepted(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="card card-romantic shadow-lg border-0"
            style={{ maxWidth: "500px" }}
          >
            <div className="card-body p-4 p-md-5">
              <h1 className="fw-bold text-glow mb-3">Une surprise t’attend 💫</h1>
              <p className="lead text-muted">
                Prépare-toi… la question arrive dans…
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="display-3 fw-bold text-danger mt-3"
              >
                {countdown}
              </motion.div>
            </div>
          </motion.div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="card card-romantic shadow-lg border-0"
          style={{ maxWidth: "600px" }}
        >
          <div className="card-body p-4 p-md-5">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
              className="display-4 fw-bold text-glow mb-3"
            >
              Ouiiii ! 💕
            </motion.h1>
            <p className="lead text-dark">
              Merci mon amour… tu viens de faire de moi la personne la plus heureuse au monde. 🥹✨
              Je t'aime au-delà de mille millions pour cent.❤️
              Pyouttt !!!😘😘😘😘😘😘😘😘
            </p>

            {/* Bouton Play / Pause */}
            <button
              onClick={toggleMusic}
              aria-label={isPlaying ? "Mettre en pause la musique" : "Jouer la musique"}
              className="btn btn-romantic mt-4"
            >
              {isPlaying ? (
                <>
                  <FaPause className="me-2" /> Pause
                </>
              ) : (
                <>
                  <FaPlay className="me-2" /> Play
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
