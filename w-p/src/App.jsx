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
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [heartCount, setHeartCount] = useState(20);
  const [sessionExpired, setSessionExpired] = useState(false);
  const audioRef = useRef(null);

  // Lecture musique après le "Oui"
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
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowQuestion(true);
    }
  }, [countdown, accepted]);

  // Relance confettis toutes les 10s après le "Oui"
  useEffect(() => {
    if (accepted) {
      const interval = setInterval(() => {
        setConfettiTrigger((prev) => prev + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [accepted]);

  // Ajuster le nombre de cœurs
  useEffect(() => {
    const updateHearts = () => {
      setHeartCount(window.innerWidth < 768 ? 12 : 20);
    };
    updateHearts();
    window.addEventListener("resize", updateHearts);
    return () => window.removeEventListener("resize", updateHearts);
  }, []);

  // Play / Pause musique
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
  const renderHearts = () =>
    [...Array(heartCount)].map((_, i) => (
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
          color: ["#ff3366", "#ff6699", "#ff99cc"][
            Math.floor(Math.random() * 3)
          ],
        }}
      >
        <FaHeart size={20 + Math.random() * 30} />
      </motion.div>
    ));

  // 🔥 Gestion de session (expire après 5 minutes d’inactivité)
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSessionExpired(true);
      }, 5 * 60 * 1000); // 5 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  // Si session expirée → afficher un message
  if (sessionExpired) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <h1 className="display-4 text-danger fw-bold">⏳ Session expirée</h1>
        <p className="lead text-muted mt-3">
          La page s’est fermée après une longue inactivité.
          <br /> Recharge la page pour recommencer 💕
        </p>
        <button
          className="btn btn-romantic mt-4"
          onClick={() => window.location.reload()}
        >
          🔄 Recharger
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative text-center">
      {/* Musique */}
      <audio ref={audioRef} src={song} loop />

      {/* Cœurs flottants */}
      {renderHearts()}

      {/* Confettis */}
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
              animate={{ scale: 1.05 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="display-4 fw-bold text-glow mb-3"
            >
              Ouiiii ! 💕
            </motion.h1>
            <p className="lead text-dark">
              Merci mon amour… tu viens de faire de moi la personne la plus
              heureuse au monde. 🥹✨
              <br />Je t&apos;aime au-delà de mille millions pour cent. ❤️
              <br />Pyouttt !!! 😘😘😘😘😘😘😘😘
            </p>

            {/* Bouton Play / Pause */}
            <button
              onClick={toggleMusic}
              aria-label={
                isPlaying ? "Mettre en pause la musique" : "Jouer la musique"
              }
              className="btn btn-romantic mt-4 me-2"
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

            {/* Bouton Répondre par mail */}
            <a
              href="mailto:lgeobatpo98@gmail.com?subject=Ma réponse à ta demande 💍&body=Mon amour, voici ma réponse..."
              className="btn btn-romantic mt-4"
              role="button"
              aria-label="Répondre par mail"
            >
              💌 Répondre par mail
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
