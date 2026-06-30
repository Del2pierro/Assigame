"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRegister } from "../hooks";

// ─── Assets: Carte Togo (base64 PNG) ─────────────────────────────────────────
const TOGO_MAP_B64 =
  "iVBORw0KGgoAAAANSUhEUgAABRQAAAVuCAYAAAAEX7BPAABJCUlEQVR4nO3d65HjRraoUXKijDn04dCHQ0tpBI0oc3h/aHCFRvOxE8hEPrBWhKKlVpFEscCR9M3OzPPz+TwBAAAAAET8p/YFAAAAAAD9EBQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAOF1u12cLr/3uz0u9BunOz6f3DwAAAGBEJcPZ7/1xXvO4yDWtfe7Ia8+fe+u1LJ9vzfWkvP6r6y/1Xn0iKAIAAAAMqpWguPY6csWyeXjbei1bo17t9yIHQREAAABgUDWCYo54F32tFDmvZU1EnB6X4/W3PsdW9lAEAAAAIJvcMXH5XLX3P1yzzDhXTJxef3quWu+FoAgAAABAVimhKxrnpudMjXnzAJf7WnK/fqpa04qWPAMAAAAc2KvYVfKgkW/PvfXxqc/1aeLw0+Mj1xH9Xt5dQ873IicTigAAAADsIrIc+vf+OH87WTnHdUT2Qnx1Ld+uL+Uavk1d5nqt3ARFAAAAALJ4F/uWYSwSybaGtE/Xsgx50UnAHNORqe/Dp6+zhyIAAAAABGwNaa+mDlMfk/P1Sz2mFEERAAAAgGK2hLC1j41MB0YfU/L1c7xmjSlFQREAAACAzVo4yXjLISo1JgBTv7dWphQFRQAAAACKmO9XeHRb34tWYuLpJCgCAAAAUFCpEPYqzqVEu7Vxr8UouHe0/dnzxQAAAAA4jlzLdPeYdEx5/lzf15rnaWHq04QiAAAAAEW0tEx3qYVra+Ea1hAUAQAAACgi1yRdrmXMy7+/5fpePXaPycHa04mnk6AIAAAAQCF7T+D93h/nT6+5XC685fpePTb6fKlRsIWIOGcPRQAAAAC6szYGvnvcp+fLHfTW7JuY8/m2MqEIAAAAQBGtTdbVXJKcc7l1bYIiAAAAAJvlnJKbx7ac+zDudULyt2nH1NOdp2tuJUIKigAAAAAUsyaCTbHt3WPXxsvUkLfGt5g43+cx+t58CqE1TooWFAEAAADI4l3cmqbyUp6r1DRe7euYTxuWOsSlNEERAAAAgKZEAtqnr/l22nNKoMt9+Mv0+jliYo3pxNPpdDo/n00FTgAAAAB28GlPwTWhah7JvgW7T5OM315nzd6Dta6l9uuXIigCAAAAHNi7oLh1v8ESy3TXhs7c15FyLSXfhz32hHzFkmcAAAAA/rI1VOUOXVuWHpe6lugUYc7Xrx0TTydBEQAAAIBCcgSvXEGuxLWkPGeu158i5qeTn0uz5BkAAADgwHLtobjmdT4pOX1X+1pqv/5WgiIAAADAgeVaOvvueV79/rugViucbYmqpfaabC0izgmKAAAAABxKSgScn4Y9f8xeexjW3CvxHUERAAAAAFZqMfiVJigCAAAAAGFOeQYAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMUAQAAAAAwgRFAAAAACBMIXdJCUlEQVR4nO3d65HjRraoUXKijDn04dCHQ0tpBI0oc3h/aHCFRvOxE8hEPrBWhKKlVpFEscCR9M3OzPPz+TwBAAAAAET8p/YFAAAAAAD9EBQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAAIExQBAAAAgDBBEQAAAAA";

// ─── Assets: Drapeau du Togo (SVG inline) ────────────────────────────────────
const FlagSVG = () => (
  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="200" fill="#EDE8DC" />
    <rect y="40" width="300" height="40" fill="#f3c517" />
    <rect y="80" width="300" height="40" fill="#1f6b4a" />
    <rect y="120" width="300" height="40" fill="#f3c517" />
    <rect y="160" width="300" height="40" fill="#1f6b4a" />
    <rect x="0" y="0" width="120" height="120" fill="#c8203a" />
    <path
      d="M60 30 l8 24h25l-20 16 8 24-21-15-21 15 8-24-20-16h25z"
      fill="#EDE8DC"
    />
  </svg>
);

// ─── Icônes SVG inline ────────────────────────────────────────────────────────
const IconUser = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);

const IconMail = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 5h18v14H3z" />
    <path d="M3 6l9 7 9-7" />
  </svg>
);

const IconLock = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const IconEye = ({ crossed }: { crossed?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
    {crossed && <line x1="3" y1="3" x2="21" y2="21" />}
  </svg>
);

const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// ─── Décorations de fond (réutilisées depuis LoginForm) ───────────────────────
const BackgroundDecorations = () => (
  <>
    {/* Drapeaux de fond */}
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        width: 130,
        transform: "rotate(-4deg)",
        opacity: 0.9,
        zIndex: 0,
      }}
    >
      <FlagSVG />
    </div>
    <div
      style={{
        position: "absolute",
        top: 90,
        right: 70,
        width: 120,
        transform: "rotate(5deg)",
        opacity: 0.9,
        zIndex: 0,
      }}
    >
      <FlagSVG />
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 60,
        width: 130,
        transform: "rotate(3deg)",
        opacity: 0.9,
        zIndex: 0,
      }}
    >
      <FlagSVG />
    </div>

    {/* Sac de courses */}
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 90,
        width: 90,
        height: 90,
        transform: "rotate(-6deg)",
        opacity: 0.5,
        color: "#caa86a",
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        width="100%"
        height="100%"
      >
        <path d="M14 22h36l-3 34a4 4 0 01-4 4H21a4 4 0 01-4-4l-3-34z" />
        <path d="M22 22v-4a10 10 0 0120 0v4" />
      </svg>
    </div>

    {/* Caddie */}
    <div
      style={{
        position: "absolute",
        bottom: 140,
        left: 90,
        width: 110,
        height: 110,
        transform: "rotate(4deg)",
        opacity: 0.5,
        color: "#caa86a",
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        width="100%"
        height="100%"
      >
        <path d="M6 8h6l6 30h32l6-20H16" />
        <circle cx="22" cy="50" r="4" />
        <circle cx="42" cy="50" r="4" />
      </svg>
    </div>

    {/* Billets */}
    {(
      [
        { top: 140, right: 110, bottom: undefined, rot: 18 },
        { top: 230, right: 60, bottom: undefined, rot: -10 },
        { top: undefined, right: 120, bottom: 160, rot: 12 },
      ] as Array<{ top?: number; right?: number; bottom?: number; rot: number }>
    ).map((pos, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: pos.top,
          right: pos.right,
          bottom: pos.bottom,
          width: 88,
          height: 58,
          transform: `rotate(${pos.rot}deg)`,
          opacity: 0.5,
          color: "#caa86a",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 90 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          width="100%"
          height="100%"
        >
          <rect x="3" y="3" width="84" height="54" rx="6" />
          <circle cx="45" cy="30" r="14" />
          <text
            x="45"
            y="35"
            fontSize="14"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
          >
            $
          </text>
        </svg>
      </div>
    ))}

    {/* Carte du Togo */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "18%",
        transform: "translate(-50%, -50%)",
        width: 420,
        height: 360,
        overflow: "hidden",
        zIndex: 0,
        opacity: 0.55,
        pointerEvents: "none",
      }}
    >
      <img
        src={`data:image/png;base64,${TOGO_MAP_B64}`}
        alt=""
        style={{ width: "100%", display: "block" }}
      />
    </div>

    {/* Badge drapeau bas-droite */}
    <div
      style={{
        position: "absolute",
        bottom: 36,
        right: 46,
        width: 130,
        zIndex: 1,
      }}
    >
      <div
        style={{
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <FlagSVG />
      </div>
    </div>
  </>
);

// ─── Composant principal ──────────────────────────────────────────────────────
export const RegisterForm: React.FC = () => {
  const {
    handleRegister,
    formError,
    successMessage,
    isSubmitting,
    clearFormState,
  } = useRegister();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Nettoyage de l'état au démontage
  useEffect(() => {
    return () => clearFormState();
  }, [clearFormState]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmError(null);

    // Validation locale : les mots de passe doivent correspondre
    if (motDePasse !== confirmPassword) {
      setConfirmError("Les mots de passe ne correspondent pas.");
      return;
    }

    handleRegister({
      nom,
      prenom,
      email,
      login,
      motDePasse,
      telephone: telephone || undefined,
      adresse: adresse || undefined,
    });
  };

  // ─── Styles partagés ─────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 44px",
    border: "1px solid #d8cfb8",
    borderRadius: 30,
    fontSize: 14,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#fff",
    color: "#444",
    outline: "none",
    boxSizing: "border-box",
  };

  const iconLeftStyle: React.CSSProperties = {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a9a39a",
  };

  const eyeBtnStyle: React.CSSProperties = {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a9a39a",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    display: "flex",
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#F8F5EE",
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 32,
        paddingBottom: 32,
      }}
    >
      <BackgroundDecorations />

      {/* Carte d'inscription */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "#EDE8DC",
          borderRadius: 28,
          padding: "48px 56px 40px",
          width: 520,
          maxWidth: "95vw",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        {/* Bouton retour */}
        <Link
          href="/login"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 20,
            background: '#F8F5EE',
            border: '1px solid #d8cfb8',
            color: '#666',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'Arial, Helvetica, sans-serif',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F0E9D9';
            e.currentTarget.style.borderColor = '#F2700B';
            e.currentTarget.style.color = '#F2700B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8F5EE';
            e.currentTarget.style.borderColor = '#d8cfb8';
            e.currentTarget.style.color = '#666';
          }}
        >
          <IconArrowLeft />
          Retour
        </Link>

        {/* Logo ASSIGAMÉ */}
        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: 1,
            color: "#1a1a1a",
            marginTop: 6,
          }}
        >
          ASSIGAMÉ
        </div>

        {/* Bandelettes couleurs Togo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 8,
            marginBottom: 28,
          }}
        >
          {["#c8203a", "#f3c517", "#1f6b4a", "#F2700B"].map((c, i) => (
            <span
              key={i}
              style={{
                width: 22,
                height: 4,
                borderRadius: 2,
                background: c,
                display: "inline-block",
              }}
            />
          ))}
        </div>

        <h1 style={{ fontSize: 30, margin: "0 0 8px", color: "#1a1a1a" }}>
          Créer un compte
        </h1>
        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#7a7670",
            fontSize: 14,
            marginBottom: 26,
          }}
        >
          Inscrivez-vous pour commencer à vendre
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div
            style={{
              marginBottom: 18,
              padding: "12px 16px",
              background: "#f0fff4",
              border: "1px solid #b2f5cc",
              borderRadius: 12,
              color: "#276749",
              fontSize: 13,
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Message d'erreur API */}
        {formError && (
          <div
            style={{
              marginBottom: 18,
              padding: "12px 16px",
              background: "#fff0f0",
              border: "1px solid #f5c6c6",
              borderRadius: 12,
              color: "#c0392b",
              fontSize: 13,
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
            }}
          >
            {formError}
          </div>
        )}

        {/* Erreur de confirmation de mot de passe */}
        {confirmError && (
          <div
            style={{
              marginBottom: 18,
              padding: "12px 16px",
              background: "#fff0f0",
              border: "1px solid #f5c6c6",
              borderRadius: 12,
              color: "#c0392b",
              fontSize: 13,
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
            }}
          >
            {confirmError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          {/* Grille 2 colonnes pour les champs principaux */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            {/* Nom */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconUser />
              </span>
              <input
                id="register-nom"
                type="text"
                placeholder="Nom"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Prénom */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconUser />
              </span>
              <input
                id="register-prenom"
                type="text"
                placeholder="Prénom"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Grille 2 colonnes pour email et login */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            {/* Email */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconMail />
              </span>
              <input
                id="register-email"
                type="email"
                placeholder="Adresse e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Login (pseudo) */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconUser />
              </span>
              <input
                id="register-login"
                type="text"
                placeholder="Nom d'utilisateur"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Grille 2 colonnes pour les mots de passe */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            {/* Mot de passe */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconLock />
              </span>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                required
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={eyeBtnStyle}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                <IconEye crossed={showPassword} />
              </button>
            </div>

            {/* Confirmer le mot de passe */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <IconLock />
              </span>
              <input
                id="register-confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirmer"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmError) setConfirmError(null);
                }}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                style={eyeBtnStyle}
                aria-label={
                  showConfirm
                    ? "Masquer la confirmation"
                    : "Afficher la confirmation"
                }
              >
                <IconEye crossed={showConfirm} />
              </button>
            </div>
          </div>

          {/* Grille 2 colonnes pour les champs optionnels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            {/* Téléphone (optionnel) */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 5.18 2 2 0 015.05 3h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006.01 6.01l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 17z" />
                </svg>
              </span>
              <input
                id="register-telephone"
                type="tel"
                placeholder="Téléphone (optionnel)"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Adresse (optionnelle) */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <span style={iconLeftStyle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <input
                id="register-adresse"
                type="text"
                placeholder="Adresse (optionnelle)"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Conditions d'utilisation */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 13,
              color: "#444",
              margin: "6px 0 22px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                required
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              J&apos;accepte les conditions d&apos;utilisation
            </label>
          </div>

          {/* Bouton inscription */}
          <button
            id="register-submit"
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              background: isSubmitting ? "#ccc" : "#F2700B",
              color: "#fff",
              border: "none",
              borderRadius: 30,
              padding: 15,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "Arial, Helvetica, sans-serif",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.2s ease",
            }}
          >
            {isSubmitting ? (
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        {/* Lien vers la connexion */}
        <div
          style={{
            marginTop: 22,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 13,
            color: "#444",
          }}
        >
          Vous avez déjà un compte ?{" "}
          <Link
            href="/login"
            style={{
              color: "#F2700B",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Se connecter
          </Link>
        </div>
      </div>

      {/* Animation spin */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
