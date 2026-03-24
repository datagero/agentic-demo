import { loadFont as loadBitter } from "@remotion/google-fonts/Bitter";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Load fonts
const { fontFamily: bitter } = loadBitter("normal", { weights: ["300", "500", "700"], subsets: ["latin"] });
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "500", "700"], subsets: ["latin"] });

export const T = {
  // Princess Cruises brand
  navy: "#003B6F",
  navyLight: "#004F96",
  gold: "#C4A962",
  goldLight: "#D4BC7A",
  goldDark: "#A8904F",
  // Backgrounds
  white: "#FFFFFF",
  gray: "#F5F5F5",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  // Accents
  green500: "#22C55E",
  green600: "#16A34A",
  red500: "#EF4444",
  amber50: "#FFFBEB",
  amber500: "#F59E0B",
  amber700: "#B45309",
  blue50: "#EFF6FF",
  blue400: "#60A5FA",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  blue700: "#1D4ED8",
  // Text
  text: "#1A1A2E",
  textMuted: "#6B7280",
  // Fonts
  display: bitter,
  sans: inter,
  weight: { light: "300" as const, medium: "500" as const, bold: "700" as const },
};

// Card style helpers
export const cardStyle = (rot = 0) => ({
  background: T.white,
  borderRadius: 16,
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  border: `1px solid ${T.gray100}`,
  overflow: "hidden" as const,
  transform: `rotate(${rot}deg)`,
});

export const navyCard = (rot = 0) => ({
  backgroundColor: T.navy,
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,59,111,0.3)",
  transform: `rotate(${rot}deg)`,
});

export const goldBadge = (rot = 0) => ({
  backgroundColor: T.gold,
  borderRadius: 20,
  color: T.navy,
  fontWeight: T.weight.bold,
  transform: `rotate(${rot}deg)`,
});
