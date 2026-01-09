// ============================================================================
// BALATRO CALCULATOR - AUTHENTIC THEME CONSTANTS
// ============================================================================

import { Suit, Enhancement, Edition, JokerRarity } from '@/types/balatro';

// Balatro's authentic color palette
export const BALATRO_COLORS = {
  // Backgrounds - Deep purple/blue gradient feel
  backgroundDark: '#0f0f1a',
  backgroundMid: '#1a1a2e',
  backgroundLight: '#252542',

  // Surface colors
  surface: '#16213e',
  surfaceLight: '#1f3460',
  surfaceDark: '#0d1528',

  // Primary accent colors
  chipBlue: '#00d4ff',
  multRed: '#ff6b6b',
  xMultOrange: '#ffa726',
  goldAccent: '#ffd700',

  // Card colors
  cardFace: '#f5f5dc',        // Cream/ivory card face
  cardFaceAlt: '#fffef5',     // Slightly brighter variant
  cardBorder: '#1a1a2e',
  cardShadow: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  text: '#ffffff',
  textLight: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textDark: '#1a1a2e',

  // UI elements
  border: '#3d3d5c',
  borderLight: '#4a4a6a',

  // Glow colors
  glowBlue: 'rgba(0, 212, 255, 0.6)',
  glowRed: 'rgba(255, 107, 107, 0.6)',
  glowGold: 'rgba(255, 215, 0, 0.6)',
  glowWhite: 'rgba(255, 255, 255, 0.4)',

  // CRT effect
  scanline: 'rgba(0, 0, 0, 0.08)',
};

// Balatro's suit colors (unique to the game)
export const SUIT_COLORS: Record<Suit, string> = {
  hearts: '#ff6b6b',     // Red
  diamonds: '#4da6ff',   // Blue (Balatro signature)
  clubs: '#7bc96f',      // Green
  spades: '#a0a0b0',     // Gray/Silver
};

// Suit symbols
export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663',
  spades: '\u2660',
};

// Rarity colors for jokers
export const RARITY_COLORS: Record<JokerRarity, { primary: string; glow: string }> = {
  common: {
    primary: '#8b8b9e',
    glow: 'rgba(139, 139, 158, 0.4)'
  },
  uncommon: {
    primary: '#59cd90',
    glow: 'rgba(89, 205, 144, 0.4)'
  },
  rare: {
    primary: '#4da6ff',
    glow: 'rgba(77, 166, 255, 0.4)'
  },
  legendary: {
    primary: '#ffd700',
    glow: 'rgba(255, 215, 0, 0.5)'
  },
};

// Enhancement colors
export const ENHANCEMENT_COLORS: Record<Enhancement, { bg: string; text: string; border: string }> = {
  none: { bg: 'transparent', text: '#ffffff', border: 'transparent' },
  bonus: { bg: '#4169e1', text: '#ffffff', border: '#6b8cff' },      // Blue chips
  mult: { bg: '#ff6b6b', text: '#ffffff', border: '#ff9999' },       // Red mult
  wild: { bg: '#9b59b6', text: '#ffffff', border: '#bb79d6' },       // Purple wild
  glass: { bg: '#87ceeb', text: '#1a1a2e', border: '#b0e0f0' },      // Light blue glass
  steel: { bg: '#c0c0c0', text: '#1a1a2e', border: '#e0e0e0' },      // Silver steel
  stone: { bg: '#708090', text: '#ffffff', border: '#90a0b0' },      // Gray stone
  gold: { bg: '#ffd700', text: '#1a1a2e', border: '#ffed4a' },       // Gold
  lucky: { bg: '#32cd32', text: '#ffffff', border: '#50ff50' },      // Green lucky
};

// Edition visual styles
export const EDITION_STYLES: Record<Edition, { colors: string[]; glow: string }> = {
  none: {
    colors: [],
    glow: 'transparent'
  },
  foil: {
    colors: ['#87ceeb', '#ffffff', '#87ceeb'],
    glow: 'rgba(135, 206, 235, 0.5)'
  },
  holographic: {
    colors: ['#ff6b6b', '#ffa726', '#ffd700', '#7bc96f', '#4da6ff', '#9b59b6'],
    glow: 'rgba(255, 255, 255, 0.4)'
  },
  polychrome: {
    colors: ['#ff6b6b', '#4da6ff', '#7bc96f', '#ffd700'],
    glow: 'rgba(255, 215, 0, 0.4)'
  },
};

// Card dimensions
export const CARD_DIMENSIONS = {
  playing: {
    width: 75,
    height: 105,
    borderRadius: 6,
  },
  joker: {
    width: 110,
    height: 150,
    borderRadius: 8,
  },
};

// Typography (will use system fonts until custom fonts are added)
export const TYPOGRAPHY = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    letterSpacing: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontSize: 11,
    fontWeight: 'normal' as const,
  },
  cardRank: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  cardRankLarge: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
};

// Shadow presets
export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  }),
};
