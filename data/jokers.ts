// ============================================================================
// BALATRO SCORE CALCULATOR - JOKER DATA
// ============================================================================

import { Joker } from '@/types/balatro';

// Pre-filled mock data for popular Jokers
export const JOKER_CATALOG: Joker[] = [
  // ===== COMMON JOKERS =====
  {
    id: 'joker',
    name: 'Joker',
    description: '+4 Mult',
    rarity: 'common',
    effects: [
      { type: 'additive_mult', trigger: 'always', value: 4 },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'greedy_joker',
    name: 'Greedy Joker',
    description: '+3 Mult per Diamond card',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_suit',
        value: 3,
        condition: { suits: ['diamonds'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'lusty_joker',
    name: 'Lusty Joker',
    description: '+3 Mult per Heart card',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_suit',
        value: 3,
        condition: { suits: ['hearts'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'wrathful_joker',
    name: 'Wrathful Joker',
    description: '+3 Mult per Spade card',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_suit',
        value: 3,
        condition: { suits: ['spades'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'gluttonous_joker',
    name: 'Gluttonous Joker',
    description: '+3 Mult per Club card',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_suit',
        value: 3,
        condition: { suits: ['clubs'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'jolly_joker',
    name: 'Jolly Joker',
    description: '+8 Mult if hand contains a Pair',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'hand_played',
        value: 8,
        condition: { handTypes: ['pair', 'two_pair', 'full_house', 'three_of_a_kind', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'zany_joker',
    name: 'Zany Joker',
    description: '+12 Mult if hand contains a Three of a Kind',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'hand_played',
        value: 12,
        condition: { handTypes: ['three_of_a_kind', 'full_house', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'mad_joker',
    name: 'Mad Joker',
    description: '+20 Mult if hand contains Two Pair',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'hand_played',
        value: 20,
        condition: { handTypes: ['two_pair', 'full_house'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'crazy_joker',
    name: 'Crazy Joker',
    description: '+12 Mult if hand contains a Straight',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'hand_played',
        value: 12,
        condition: { handTypes: ['straight', 'straight_flush', 'royal_flush'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'droll_joker',
    name: 'Droll Joker',
    description: '+10 Mult if hand contains a Flush',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'hand_played',
        value: 10,
        condition: { handTypes: ['flush', 'straight_flush', 'royal_flush', 'flush_house', 'flush_five'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'sly_joker',
    name: 'Sly Joker',
    description: '+50 Chips if hand contains a Pair',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'hand_played',
        value: 50,
        condition: { handTypes: ['pair', 'two_pair', 'full_house', 'three_of_a_kind', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'wily_joker',
    name: 'Wily Joker',
    description: '+100 Chips if hand contains Three of a Kind',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'hand_played',
        value: 100,
        condition: { handTypes: ['three_of_a_kind', 'full_house', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'clever_joker',
    name: 'Clever Joker',
    description: '+80 Chips if hand contains Two Pair',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'hand_played',
        value: 80,
        condition: { handTypes: ['two_pair', 'full_house'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'devious_joker',
    name: 'Devious Joker',
    description: '+100 Chips if hand contains a Straight',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'hand_played',
        value: 100,
        condition: { handTypes: ['straight', 'straight_flush', 'royal_flush'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'crafty_joker',
    name: 'Crafty Joker',
    description: '+80 Chips if hand contains a Flush',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'hand_played',
        value: 80,
        condition: { handTypes: ['flush', 'straight_flush', 'royal_flush', 'flush_house', 'flush_five'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'half_joker',
    name: 'Half Joker',
    description: '+20 Mult if hand contains 3 or fewer cards',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'on_scored',
        value: 20,
        condition: { maxCards: 3 },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'banner',
    name: 'Banner',
    description: '+30 Chips per remaining discard',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'per_discard',
        value: 30,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'mystic_summit',
    name: 'Mystic Summit',
    description: '+15 Mult when 0 discards remaining',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_discard',
        value: 15,
        condition: { maxCards: 0 },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'raised_fist',
    name: 'Raised Fist',
    description: 'Adds double the rank of lowest card held in hand to Mult',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'held_in_hand',
        value: 0, // Calculated dynamically
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci',
    description: '+8 Mult per Ace, 2, 3, 5, or 8 scored',
    rarity: 'uncommon',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_rank',
        value: 8,
        condition: { ranks: ['A', '2', '3', '5', '8'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'scary_face',
    name: 'Scary Face',
    description: '+30 Chips per Face card scored',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'per_rank',
        value: 30,
        condition: { ranks: ['J', 'Q', 'K'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'even_steven',
    name: 'Even Steven',
    description: '+4 Mult per even ranked card (2, 4, 6, 8, 10)',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'per_rank',
        value: 4,
        condition: { ranks: ['2', '4', '6', '8', '10'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'odd_todd',
    name: 'Odd Todd',
    description: '+31 Chips per odd ranked card (3, 5, 7, 9, A)',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'per_rank',
        value: 31,
        condition: { ranks: ['3', '5', '7', '9', 'A'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: '+20 Chips and +4 Mult per Ace scored',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'per_rank',
        value: 20,
        condition: { ranks: ['A'], perCard: true },
      },
      {
        type: 'additive_mult',
        trigger: 'per_rank',
        value: 4,
        condition: { ranks: ['A'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },

  // ===== UNCOMMON JOKERS =====
  {
    id: 'abstract_joker',
    name: 'Abstract Joker',
    description: '+3 Mult per Joker',
    rarity: 'uncommon',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'always',
        value: 3, // Multiplied by joker count
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'acrobat',
    name: 'Acrobat',
    description: 'x3 Mult on final hand of round',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 3,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'blackboard',
    name: 'Blackboard',
    description: 'x3 Mult if all cards in hand are Spades or Clubs',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'held_in_hand',
        value: 3,
        condition: { suits: ['spades', 'clubs'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'ride_the_bus',
    name: 'Ride the Bus',
    description: '+1 Mult per consecutive hand without a face card. Resets when face card is scored',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'always',
        value: 1,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 0,
  },

  // ===== RARE JOKERS =====
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Copies ability of Joker to the right',
    rarity: 'rare',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },
  {
    id: 'baron',
    name: 'Baron',
    description: 'Each King held in hand gives x1.5 Mult',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'held_in_hand',
        value: 1.5,
        condition: { ranks: ['K'], perCard: true },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'mime',
    name: 'Mime',
    description: 'Retrigger all card held in hand abilities',
    rarity: 'uncommon',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },
  {
    id: 'dusk',
    name: 'Dusk',
    description: 'Retrigger all played cards in final hand of round',
    rarity: 'uncommon',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },
  {
    id: 'hack',
    name: 'Hack',
    description: 'Retrigger each 2, 3, 4, or 5',
    rarity: 'uncommon',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },
  {
    id: 'sock_and_buskin',
    name: 'Sock and Buskin',
    description: 'Retrigger all played Face cards',
    rarity: 'uncommon',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },
  {
    id: 'hanging_chad',
    name: 'Hanging Chad',
    description: 'Retrigger first played card 2 times',
    rarity: 'common',
    effects: [], // Special handling needed
    edition: 'none',
    isActive: true,
  },

  // ===== LEGENDARY JOKERS =====
  {
    id: 'cavendish',
    name: 'Cavendish',
    description: 'x3 Mult',
    rarity: 'legendary',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 3,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'card_sharp',
    name: 'Card Sharp',
    description: 'x3 Mult if hand was already played this round',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 3,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'madness',
    name: 'Madness',
    description: 'x0.5 Mult when Blind is selected. Starts at x1',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 1.0,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 1.0,
  },
  {
    id: 'the_idol',
    name: 'The Idol',
    description: 'Each scored card with a specific suit and rank gives x2 Mult',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'per_card',
        value: 2,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'the_duo',
    name: 'The Duo',
    description: 'x2 Mult if hand contains a Pair',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'hand_played',
        value: 2,
        condition: { handTypes: ['pair', 'two_pair', 'full_house', 'three_of_a_kind', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'the_trio',
    name: 'The Trio',
    description: 'x3 Mult if hand contains Three of a Kind',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'hand_played',
        value: 3,
        condition: { handTypes: ['three_of_a_kind', 'full_house', 'four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'the_family',
    name: 'The Family',
    description: 'x4 Mult if hand contains Four of a Kind',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'hand_played',
        value: 4,
        condition: { handTypes: ['four_of_a_kind', 'five_of_a_kind'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'the_order',
    name: 'The Order',
    description: 'x3 Mult if hand contains a Straight',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'hand_played',
        value: 3,
        condition: { handTypes: ['straight', 'straight_flush', 'royal_flush'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'the_tribe',
    name: 'The Tribe',
    description: 'x2 Mult if hand contains a Flush',
    rarity: 'rare',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'hand_played',
        value: 2,
        condition: { handTypes: ['flush', 'straight_flush', 'royal_flush', 'flush_house', 'flush_five'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'stuntman',
    name: 'Stuntman',
    description: '+250 Chips, -2 hand size',
    rarity: 'uncommon',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'always',
        value: 250,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'steel_joker',
    name: 'Steel Joker',
    description: 'Gives x0.2 Mult per Steel card in full deck',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 1.0, // Base value, incremented by 0.2 per steel card
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 0,
  },
  {
    id: 'bull',
    name: 'Bull',
    description: '+2 Chips per $1 you have',
    rarity: 'uncommon',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'economy',
        value: 2,
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'photograph',
    name: 'Photograph',
    description: 'First played Face card gives x2 Mult when scored',
    rarity: 'common',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'per_rank',
        value: 2,
        condition: { ranks: ['J', 'Q', 'K'] },
      },
    ],
    edition: 'none',
    isActive: true,
  },
  {
    id: 'business_card',
    name: 'Business Card',
    description: 'Played face cards have 1 in 2 chance to give $2',
    rarity: 'common',
    effects: [], // Economy effect, not scoring
    edition: 'none',
    isActive: true,
  },
  {
    id: 'supernova',
    name: 'Supernova',
    description: '+1 Mult per hand played this round',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'always',
        value: 1,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 0,
  },
  {
    id: 'square_joker',
    name: 'Square Joker',
    description: '+4 Chips for every hand played. Starts at 16 chips',
    rarity: 'common',
    effects: [
      {
        type: 'additive_chips',
        trigger: 'always',
        value: 16,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 16,
  },
  {
    id: 'seance',
    name: 'Seance',
    description: 'If hand contains a Straight Flush, create a random Spectral card',
    rarity: 'rare',
    effects: [], // Non-scoring effect
    edition: 'none',
    isActive: true,
  },
  {
    id: 'riff_raff',
    name: 'Riff-raff',
    description: 'When Blind is selected, create 2 Common Jokers',
    rarity: 'common',
    effects: [], // Non-scoring effect
    edition: 'none',
    isActive: true,
  },
  {
    id: 'vampire',
    name: 'Vampire',
    description: 'x0.1 Mult per enhanced card scored, removes card enhancement',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 1.0,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 1.0,
  },
  {
    id: 'shortcut',
    name: 'Shortcut',
    description: 'Allows Straights to be made with gaps of 1 rank',
    rarity: 'common',
    effects: [], // Special handling for hand detection
    edition: 'none',
    isActive: true,
  },
  {
    id: 'hologram',
    name: 'Hologram',
    description: '+0.25 Mult per card added to deck. Starts at x1',
    rarity: 'uncommon',
    effects: [
      {
        type: 'multiplicative_mult',
        trigger: 'always',
        value: 1.0,
      },
    ],
    edition: 'none',
    isActive: true,
    counter: 1.0,
  },
  {
    id: 'vagabond',
    name: 'Vagabond',
    description: 'Create a Tarot card if hand is played with $4 or less',
    rarity: 'uncommon',
    effects: [], // Non-scoring effect
    edition: 'none',
    isActive: true,
  },
  {
    id: 'baron_chips',
    name: 'Misprint',
    description: '+? Mult (0 to 23)',
    rarity: 'common',
    effects: [
      {
        type: 'additive_mult',
        trigger: 'always',
        value: 12, // Average value
      },
    ],
    edition: 'none',
    isActive: true,
  },
];

// Helper to get a fresh copy of a joker
export function createJokerInstance(jokerId: string): Joker | null {
  const template = JOKER_CATALOG.find(j => j.id === jokerId);
  if (!template) return null;
  return {
    ...template,
    id: `${template.id}_${Date.now()}`,
  };
}

// Get jokers by rarity
export function getJokersByRarity(rarity: Joker['rarity']): Joker[] {
  return JOKER_CATALOG.filter(j => j.rarity === rarity);
}
