// ============================================================================
// BALATRO SCORE CALCULATOR - TYPE DEFINITIONS
// ============================================================================

// Card Suits
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

// Card Ranks (2-10, J, Q, K, A)
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

// Card Enhancements
export type Enhancement =
  | 'none'
  | 'bonus'      // +30 Chips
  | 'mult'       // +4 Mult
  | 'wild'       // Can be any suit
  | 'glass'      // x2 Mult, 1 in 4 chance to destroy
  | 'steel'      // x1.5 Mult while in hand
  | 'stone'      // +50 Chips, no rank or suit
  | 'gold'       // $3 if in hand at end of round
  | 'lucky';     // 1 in 5 chance for +20 Mult, 1 in 15 for $20

// Card Editions
export type Edition =
  | 'none'
  | 'foil'       // +50 Chips
  | 'holographic' // +10 Mult
  | 'polychrome'; // x1.5 Mult

// Card Seals
export type Seal =
  | 'none'
  | 'gold'    // Earn $3 when played and scored
  | 'red'     // Retrigger card
  | 'blue'    // Creates Planet card in end of round
  | 'purple'; // Creates Tarot card when discarded

// Playing Card Interface
export interface Card {
  id: string;
  rank: Rank;
  suit: Suit;
  enhancement: Enhancement;
  edition: Edition;
  seal: Seal;
  isScoring: boolean; // Whether this card contributes to the hand
}

// Poker Hand Types
export type PokerHandType =
  | 'high_card'
  | 'pair'
  | 'two_pair'
  | 'three_of_a_kind'
  | 'straight'
  | 'flush'
  | 'full_house'
  | 'four_of_a_kind'
  | 'straight_flush'
  | 'royal_flush'
  | 'five_of_a_kind'
  | 'flush_house'
  | 'flush_five';

// Base values for each poker hand type (before leveling)
export interface HandBaseValues {
  chips: number;
  mult: number;
  name: string;
}

// Joker Effect Types
export type JokerEffectType =
  | 'additive_chips'      // +X Chips
  | 'additive_mult'       // +X Mult
  | 'multiplicative_mult' // xX Mult
  | 'conditional';        // Complex conditional effects

// Joker Trigger Conditions
export type JokerTrigger =
  | 'always'              // Always active
  | 'on_scored'           // When cards are scored
  | 'per_card'            // Per scoring card
  | 'per_suit'            // Per card of specific suit
  | 'per_rank'            // Per card of specific rank
  | 'per_discard'         // Based on remaining discards
  | 'hand_played'         // Based on hand type played
  | 'held_in_hand'        // Based on cards held in hand
  | 'economy';            // Based on money/economy

// Joker Effect Definition
export interface JokerEffect {
  type: JokerEffectType;
  trigger: JokerTrigger;
  value: number;
  condition?: {
    suits?: Suit[];
    ranks?: Rank[];
    handTypes?: PokerHandType[];
    minCards?: number;
    maxCards?: number;
    perCard?: boolean;
  };
}

// Joker Rarity
export type JokerRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

// Joker Interface
export interface Joker {
  id: string;
  name: string;
  description: string;
  rarity: JokerRarity;
  effects: JokerEffect[];
  edition: Edition;
  isActive: boolean;
  // For jokers with variable state
  counter?: number;
}

// Score Breakdown for display
export interface ScoreBreakdown {
  baseChips: number;
  baseMult: number;
  cardChips: number;
  cardMult: number;
  jokerChips: number;
  jokerMult: number;
  jokerXMult: number;
  finalChips: number;
  finalMult: number;
  totalScore: number;
  steps: ScoreStep[];
}

// Individual scoring step for detailed breakdown
export interface ScoreStep {
  source: string;
  type: 'chips' | 'mult' | 'xmult';
  value: number;
  runningChips: number;
  runningMult: number;
}

// Game State for Calculator
export interface CalculatorState {
  jokers: Joker[];
  playedCards: Card[];
  heldCards: Card[];
  selectedHandType: PokerHandType;
  handLevel: number;
  remainingDiscards: number;
  money: number;
}

// Rank chip values
export const RANK_CHIPS: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': 11,
};

// Base hand values (level 1)
export const HAND_BASE_VALUES: Record<PokerHandType, HandBaseValues> = {
  high_card: { chips: 5, mult: 1, name: 'High Card' },
  pair: { chips: 10, mult: 2, name: 'Pair' },
  two_pair: { chips: 20, mult: 2, name: 'Two Pair' },
  three_of_a_kind: { chips: 30, mult: 3, name: 'Three of a Kind' },
  straight: { chips: 30, mult: 4, name: 'Straight' },
  flush: { chips: 35, mult: 4, name: 'Flush' },
  full_house: { chips: 40, mult: 4, name: 'Full House' },
  four_of_a_kind: { chips: 60, mult: 7, name: 'Four of a Kind' },
  straight_flush: { chips: 100, mult: 8, name: 'Straight Flush' },
  royal_flush: { chips: 100, mult: 8, name: 'Royal Flush' },
  five_of_a_kind: { chips: 120, mult: 12, name: 'Five of a Kind' },
  flush_house: { chips: 140, mult: 14, name: 'Flush House' },
  flush_five: { chips: 160, mult: 16, name: 'Flush Five' },
};

// Hand level multipliers for chips and mult
export const HAND_LEVEL_BONUS: Record<PokerHandType, { chips: number; mult: number }> = {
  high_card: { chips: 10, mult: 1 },
  pair: { chips: 15, mult: 1 },
  two_pair: { chips: 20, mult: 1 },
  three_of_a_kind: { chips: 20, mult: 2 },
  straight: { chips: 30, mult: 3 },
  flush: { chips: 15, mult: 2 },
  full_house: { chips: 25, mult: 2 },
  four_of_a_kind: { chips: 30, mult: 3 },
  straight_flush: { chips: 40, mult: 4 },
  royal_flush: { chips: 40, mult: 4 },
  five_of_a_kind: { chips: 35, mult: 3 },
  flush_house: { chips: 40, mult: 4 },
  flush_five: { chips: 40, mult: 3 },
};

// Enhancement effects
export const ENHANCEMENT_EFFECTS: Record<Enhancement, { chips: number; mult: number; xMult: number }> = {
  none: { chips: 0, mult: 0, xMult: 1 },
  bonus: { chips: 30, mult: 0, xMult: 1 },
  mult: { chips: 0, mult: 4, xMult: 1 },
  wild: { chips: 0, mult: 0, xMult: 1 },
  glass: { chips: 0, mult: 0, xMult: 2 },
  steel: { chips: 0, mult: 0, xMult: 1.5 },
  stone: { chips: 50, mult: 0, xMult: 1 },
  gold: { chips: 0, mult: 0, xMult: 1 },
  lucky: { chips: 0, mult: 0, xMult: 1 }, // Random effect, handled separately
};

// Edition effects
export const EDITION_EFFECTS: Record<Edition, { chips: number; mult: number; xMult: number }> = {
  none: { chips: 0, mult: 0, xMult: 1 },
  foil: { chips: 50, mult: 0, xMult: 1 },
  holographic: { chips: 0, mult: 10, xMult: 1 },
  polychrome: { chips: 0, mult: 0, xMult: 1.5 },
};

// Suit symbols for display
export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663',
  spades: '\u2660',
};

// Suit colors
export const SUIT_COLORS: Record<Suit, string> = {
  hearts: '#FE5F55',
  diamonds: '#4DA6FF',
  clubs: '#59CD90',
  spades: '#474747',
};
