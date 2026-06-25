import React, { useState } from "react";

const TOGO_MAP_B64 = "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";

const flagSVG = (
  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="200" fill="#fdf9ef" />
    <rect y="0" width="300" height="40" fill="#c8203a" />
    <rect y="40" width="300" height="40" fill="#f3c517" />
    <rect y="80" width="300" height="40" fill="#1f6b4a" />
    <rect y="120" width="300" height="40" fill="#f3c517" />
    <rect y="160" width="300" height="40" fill="#1f6b4a" />
    <rect x="0" y="0" width="120" height="120" fill="#c8203a" />
    <path
      d="M60 30 l8 24h25l-20 16 8 24-21-15-21 15 8-24-20-16h25z"
      fill="#fdf9ef"
    />
  </svg>
);

export default function AssigameSignup({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("acheteur");

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#f1e6cb",
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background flags, unblurred, reduced size */}
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
        {flagSVG}
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
        {flagSVG}
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
        {flagSVG}
      </div>

      {/* Shopping bag */}
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

      {/* Shopping cart */}
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

      {/* Banknotes */}
      {[
        { top: 140, right: 110, rot: 18 },
        { top: 230, right: 60, rot: -10 },
        { bottom: 160, right: 120, rot: 12 },
      ].map((pos, i) => (
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

      {/* Togo map: left side, bottom part of the image cropped off */}
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
          style={{
            width: "100%",
            display: "block",
          }}
        />
      </div>

      {/* Small flag badge bottom-right */}
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
          {flagSVG}
        </div>
      </div>

      {/* Signup card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "#fdf9ef",
          borderRadius: 28,
          padding: "48px 56px 40px",
          width: 420,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 8,
            marginBottom: 28,
          }}
        >
          {["#c8203a", "#f3c517", "#1f6b4a", "#e07b1d"].map((c, i) => (
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
          Inscrivez-vous pour commencer
        </div>

        {/* Name input */}
        <div style={{ position: "relative", marginBottom: 18, textAlign: "left" }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Nom complet"
            style={{
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
            }}
          />
        </div>

        {/* Email input */}
        <div style={{ position: "relative", marginBottom: 18, textAlign: "left" }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18v14H3z" />
              <path d="M3 6l9 7 9-7" />
            </svg>
          </span>
          <input
            type="email"
            placeholder="Adresse e-mail"
            style={{
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
            }}
          />
        </div>

        {/* Password input */}
        <div style={{ position: "relative", marginBottom: 18, textAlign: "left" }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            style={{
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
            }}
          />
          <span
            onClick={() => setShowPassword((s) => !s)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>

        {/* Confirm password input */}
        <div style={{ position: "relative", marginBottom: 18, textAlign: "left" }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            style={{
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
            }}
          />
          <span
            onClick={() => setShowConfirm((s) => !s)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#a9a39a",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>

        {/* Choix du rôle : Vendeur ou Acheteur */}
        <div style={{ marginBottom: 18, textAlign: "left" }}>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 13,
              color: "#444",
              marginBottom: 10,
            }}
          >
            Je m'inscris en tant que
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { key: "acheteur", label: "Acheteur" },
              { key: "vendeur", label: "Vendeur" },
            ].map((opt) => (
              <label
                key={opt.key}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 0",
                  border:
                    role === opt.key
                      ? "2px solid #e07b1d"
                      : "1px solid #d8cfb8",
                  borderRadius: 30,
                  background: role === opt.key ? "#fdeede" : "#fff",
                  cursor: "pointer",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: 14,
                  color: role === opt.key ? "#e07b1d" : "#444",
                  fontWeight: role === opt.key ? 700 : 400,
                  transition: "all 0.15s ease",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={opt.key}
                  checked={role === opt.key}
                  onChange={() => setRole(opt.key)}
                  style={{ display: "none" }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

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
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <input type="checkbox" /> J'accepte les conditions d'utilisation
          </label>
        </div>

        <button
          style={{
            width: "100%",
            background: "#e07b1d",
            color: "#fff",
            border: "none",
            borderRadius: 30,
            padding: 15,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            cursor: "pointer",
          }}
        >
          S'inscrire
        </button>

        <div
          style={{
            marginTop: 22,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 13,
            color: "#444",
          }}
        >
          Vous avez déjà un compte ?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("login");
            }}
            style={{ color: "#e07b1d", textDecoration: "none", fontWeight: 600 }}
          >
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
}
