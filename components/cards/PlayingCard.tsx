// ============================================================================
// PLAYING CARD - Authentic Balatro-style playing card
// ============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Rank } from '@/types/balatro';
import {
  BALATRO_COLORS,
  SUIT_COLORS,
  CARD_DIMENSIONS,
  SHADOWS,
  ENHANCEMENT_COLORS,
} from '@/constants/balatro-theme';
import { CardSuitSVG } from './CardSuitSVG';
import { EnhancementBadge } from './EnhancementBadge';
import { EditionOverlay, EditionGlow } from '@/components/effects/EditionOverlay';

interface PlayingCardProps {
  card: Card;
  onPress?: () => void;
  onRemove?: () => void;
  onToggleScoring?: () => void;
  isHeld?: boolean;
  size?: 'normal' | 'small';
}

export function PlayingCard({
  card,
  onPress,
  onRemove,
  onToggleScoring,
  isHeld = false,
  size = 'normal',
}: PlayingCardProps) {
  const suitColor = SUIT_COLORS[card.suit];
  const isScoring = card.isScoring || isHeld;
  const dims = size === 'small'
    ? { width: 60, height: 84, borderRadius: 5 }
    : CARD_DIMENSIONS.playing;

  const enhancementColor = ENHANCEMENT_COLORS[card.enhancement];
  const hasEnhancement = card.enhancement !== 'none';
  const hasEdition = card.edition !== 'none';

  return (
    <EditionGlow edition={card.edition}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.cardContainer,
          {
            width: dims.width,
            height: dims.height,
            opacity: isScoring ? 1 : 0.5,
          },
        ]}
      >
        {/* Card base with shadow */}
        <View style={[styles.cardShadow, SHADOWS.card, { borderRadius: dims.borderRadius }]}>
          {/* Card border (enhancement color or default) */}
          <View
            style={[
              styles.cardBorder,
              {
                borderRadius: dims.borderRadius,
                borderColor: hasEnhancement ? enhancementColor.border : BALATRO_COLORS.cardBorder,
                borderWidth: hasEnhancement ? 2 : 1,
              },
            ]}
          >
            {/* Card face - cream background */}
            <LinearGradient
              colors={[BALATRO_COLORS.cardFaceAlt, BALATRO_COLORS.cardFace]}
              style={[styles.cardFace, { borderRadius: dims.borderRadius - 1 }]}
            >
              {/* Top-left rank */}
              <View style={styles.cornerTop}>
                <Text style={[styles.cornerRank, { color: suitColor }]}>{card.rank}</Text>
                <CardSuitSVG suit={card.suit} size={12} />
              </View>

              {/* Center suit (large) */}
              <View style={styles.centerSuit}>
                <CardSuitSVG suit={card.suit} size={size === 'small' ? 28 : 36} glow={isScoring} />
              </View>

              {/* Bottom-right rank (inverted) */}
              <View style={styles.cornerBottom}>
                <CardSuitSVG suit={card.suit} size={12} />
                <Text style={[styles.cornerRank, { color: suitColor }]}>{card.rank}</Text>
              </View>

              {/* Enhancement badge */}
              {hasEnhancement && (
                <View style={styles.enhancementBadge}>
                  <EnhancementBadge enhancement={card.enhancement} size="small" />
                </View>
              )}

              {/* Edition overlay effect */}
              {hasEdition && (
                <EditionOverlay
                  edition={card.edition}
                  width={dims.width - 4}
                  height={dims.height - 4}
                  borderRadius={dims.borderRadius - 2}
                />
              )}

              {/* Edition indicator dot */}
              {hasEdition && (
                <View style={styles.editionDot}>
                  <View
                    style={[
                      styles.editionDotInner,
                      card.edition === 'foil' && styles.editionFoil,
                      card.edition === 'holographic' && styles.editionHolo,
                      card.edition === 'polychrome' && styles.editionPoly,
                    ]}
                  />
                </View>
              )}
            </LinearGradient>
          </View>
        </View>

        {/* Remove button */}
        {onRemove && (
          <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
            <Text style={styles.removeBtnText}>x</Text>
          </TouchableOpacity>
        )}

        {/* Scoring toggle (for played cards) */}
        {!isHeld && onToggleScoring && (
          <TouchableOpacity style={styles.scoringToggle} onPress={onToggleScoring}>
            <View style={[styles.scoringIndicator, isScoring && styles.scoringActive]}>
              <Text style={styles.scoringText}>{isScoring ? 'Scoring' : 'Off'}</Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </EditionGlow>
  );
}

// Rank chip values display helper
export function getRankChips(rank: Rank): number {
  const chips: Record<Rank, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11,
  };
  return chips[rank];
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
  },
  cardShadow: {
    flex: 1,
  },
  cardBorder: {
    flex: 1,
    overflow: 'hidden',
  },
  cardFace: {
    flex: 1,
    padding: 4,
  },
  cornerTop: {
    position: 'absolute',
    top: 4,
    left: 5,
    alignItems: 'center',
  },
  cornerBottom: {
    position: 'absolute',
    bottom: 4,
    right: 5,
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  cornerRank: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  centerSuit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enhancementBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
  },
  editionDot: {
    position: 'absolute',
    bottom: 4,
    left: 5,
  },
  editionDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  editionFoil: {
    backgroundColor: '#87ceeb',
  },
  editionHolo: {
    backgroundColor: '#ff69b4',
  },
  editionPoly: {
    backgroundColor: '#ffd700',
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BALATRO_COLORS.multRed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    zIndex: 10,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: -1,
  },
  scoringToggle: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  scoringIndicator: {
    backgroundColor: BALATRO_COLORS.surfaceDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  scoringActive: {
    borderColor: BALATRO_COLORS.chipBlue,
  },
  scoringText: {
    fontSize: 8,
    color: BALATRO_COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default PlayingCard;
