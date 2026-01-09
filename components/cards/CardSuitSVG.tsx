// ============================================================================
// SVG SUIT SYMBOLS - Crisp, scalable card suit icons
// ============================================================================

import React from 'react';
import Svg, { Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Suit } from '@/types/balatro';
import { SUIT_COLORS } from '@/constants/balatro-theme';

interface CardSuitSVGProps {
  suit: Suit;
  size?: number;
  glow?: boolean;
}

export function CardSuitSVG({ suit, size = 40, glow = false }: CardSuitSVGProps) {
  const color = SUIT_COLORS[suit];

  const renderSuit = () => {
    switch (suit) {
      case 'hearts':
        return <HeartSVG size={size} color={color} glow={glow} />;
      case 'diamonds':
        return <DiamondSVG size={size} color={color} glow={glow} />;
      case 'clubs':
        return <ClubSVG size={size} color={color} glow={glow} />;
      case 'spades':
        return <SpadeSVG size={size} color={color} glow={glow} />;
    }
  };

  return renderSuit();
}

// Heart SVG
function HeartSVG({ size, color, glow }: { size: number; color: string; glow: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {glow && (
        <Defs>
          <RadialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
      )}
      {glow && <Path d="M50 88 C20 60 5 40 5 25 C5 10 20 2 35 10 C42 15 47 22 50 30 C53 22 58 15 65 10 C80 2 95 10 95 25 C95 40 80 60 50 88 Z" fill="url(#heartGlow)" transform="scale(1.2) translate(-8, -8)" />}
      <Path
        d="M50 85 C20 58 8 40 8 28 C8 14 20 6 33 12 C42 17 47 24 50 32 C53 24 58 17 67 12 C80 6 92 14 92 28 C92 40 80 58 50 85 Z"
        fill={color}
      />
    </Svg>
  );
}

// Diamond SVG
function DiamondSVG({ size, color, glow }: { size: number; color: string; glow: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {glow && (
        <Defs>
          <RadialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
      )}
      {glow && <Path d="M50 5 L90 50 L50 95 L10 50 Z" fill="url(#diamondGlow)" transform="scale(1.15) translate(-4, -4)" />}
      <Path
        d="M50 8 L88 50 L50 92 L12 50 Z"
        fill={color}
      />
    </Svg>
  );
}

// Club SVG
function ClubSVG({ size, color, glow }: { size: number; color: string; glow: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {glow && (
        <Defs>
          <RadialGradient id="clubGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
      )}
      <G>
        {glow && (
          <>
            <Path d="M50 8 A18 18 0 1 1 50 44 A18 18 0 1 1 50 8" fill="url(#clubGlow)" transform="scale(1.15) translate(-4, -4)" />
          </>
        )}
        {/* Top circle */}
        <Path d="M50 10 A16 16 0 1 1 50 42 A16 16 0 1 1 50 10" fill={color} />
        {/* Left circle */}
        <Path d="M24 35 A16 16 0 1 1 24 67 A16 16 0 1 1 24 35" fill={color} />
        {/* Right circle */}
        <Path d="M76 35 A16 16 0 1 1 76 67 A16 16 0 1 1 76 35" fill={color} />
        {/* Stem */}
        <Path d="M42 55 L42 90 L58 90 L58 55 Q50 65 42 55" fill={color} />
      </G>
    </Svg>
  );
}

// Spade SVG
function SpadeSVG({ size, color, glow }: { size: number; color: string; glow: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {glow && (
        <Defs>
          <RadialGradient id="spadeGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
      )}
      {glow && <Path d="M50 5 C20 35 5 50 5 65 C5 80 20 88 35 80 C42 75 47 68 50 60 C53 68 58 75 65 80 C80 88 95 80 95 65 C95 50 80 35 50 5 Z M42 75 L42 95 L58 95 L58 75 Q50 85 42 75" fill="url(#spadeGlow)" transform="scale(1.15) translate(-4, -4)" />}
      <G>
        {/* Spade body (inverted heart) */}
        <Path
          d="M50 8 C22 38 8 52 8 65 C8 78 20 85 32 78 C40 74 46 67 50 58 C54 67 60 74 68 78 C80 85 92 78 92 65 C92 52 78 38 50 8 Z"
          fill={color}
        />
        {/* Stem */}
        <Path d="M42 70 L42 92 L58 92 L58 70 Q50 80 42 70" fill={color} />
      </G>
    </Svg>
  );
}

export default CardSuitSVG;
