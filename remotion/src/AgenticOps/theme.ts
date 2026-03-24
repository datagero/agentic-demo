import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadDMSerif } from "@remotion/google-fonts/DMSerifDisplay";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["300", "500", "700"],
  subsets: ["latin"],
});
const { fontFamily: serif } = loadDMSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const T = {
  // Light scenes
  cream: "#ebe5dc",
  warmWhite: "#f5f0ea",
  // Dark scenes
  dark: "#111125",
  darkCard: "#1a1a38",
  // Badge / card
  badge: "#1a2a22",
  white: "#ffffff",
  offWhite: "#f8f8fa",
  // Accents
  mint: "#5dd4a0",
  cyan: "#50b8d8",
  purple: "#9070d8",
  coral: "#e06050",
  amber: "#e0a030",
  pink: "#d070a0",
  blue: "#5090e0",
  green: "#2d8a60",
  // Text
  ink: "#1a1a2e",
  muted: "#888898",
  dimLight: "#aaa8b0",
  dimDark: "#505070",
  // Fonts
  sans: inter,
  serif,
};

// Dark badge on light bg (Greg style)
export const darkBadge = (rot = 0) => ({
  backgroundColor: T.badge,
  borderRadius: 20,
  boxShadow: "0 6px 24px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)",
  transform: `rotate(${rot}deg)`,
});

// White card on light bg
export const whiteCard = (rot = 0) => ({
  backgroundColor: T.white,
  borderRadius: 18,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
  transform: `rotate(${rot}deg)`,
});

// Glowing badge on dark bg
export const glowBadge = (color: string, rot = 0) => ({
  backgroundColor: T.darkCard,
  borderRadius: 18,
  border: `1.5px solid ${color}30`,
  boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${color}10`,
  transform: `rotate(${rot}deg)`,
});
