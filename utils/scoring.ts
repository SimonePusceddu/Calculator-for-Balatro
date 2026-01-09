// ============================================================================
// BALATRO SCORE CALCULATOR - SCORING ENGINE
// ============================================================================
// Order of operations:
// 1. Base Score from poker hand (chips + mult)
// 2. Card enhancements applied (played cards first, then held cards)
// 3. Jokers iterate left to right: +Chips -> +Mult -> xMult
// ============================================================================

import {
  Card,
  Joker,
  PokerHandType,
  ScoreBreakdown,
  ScoreStep,
  HAND_BASE_VALUES,
  HAND_LEVEL_BONUS,
  RANK_CHIPS,
  ENHANCEMENT_EFFECTS,
  EDITION_EFFECTS,
  Suit,
  Rank,
} from '@/types/balatro';

export interface ScoringContext {
  playedCards: Card[];
  heldCards: Card[];
  jokers: Joker[];
  selectedHandType: PokerHandType;
  handLevel: number;
  remainingDiscards: number;
  money: number;
}

// Main scoring function that calculates the complete breakdown
export function calculateScore(context: ScoringContext): ScoreBreakdown {
  const {
    playedCards,
    heldCards,
    jokers,
    selectedHandType,
    handLevel,
    remainingDiscards,
    money,
  } = context;

  const steps: ScoreStep[] = [];
  const scoringCards = playedCards.filter(card => card.isScoring);
  const activeJokers = jokers.filter(j => j.isActive);

  // ============================================================================
  // STEP 1: BASE SCORE FROM POKER HAND
  // ============================================================================
  const baseValues = HAND_BASE_VALUES[selectedHandType];
  const levelBonus = HAND_LEVEL_BONUS[selectedHandType];

  const baseChips = baseValues.chips + (levelBonus.chips * (handLevel - 1));
  const baseMult = baseValues.mult + (levelBonus.mult * (handLevel - 1));

  let runningChips = baseChips;
  let runningMult = baseMult;

  steps.push({
    source: `${baseValues.name} (Lvl ${handLevel})`,
    type: 'chips',
    value: baseChips,
    runningChips,
    runningMult,
  });

  // ============================================================================
  // STEP 2: ADD CHIPS FROM SCORING CARDS (Rank values)
  // ============================================================================
  let cardChips = 0;
  let cardMult = 0;

  for (const card of scoringCards) {
    // Stone cards don't have rank chips
    if (card.enhancement !== 'stone') {
      const rankChip = RANK_CHIPS[card.rank];
      cardChips += rankChip;
      runningChips += rankChip;

      steps.push({
        source: `${card.rank} card`,
        type: 'chips',
        value: rankChip,
        runningChips,
        runningMult,
      });
    }
  }

  // ============================================================================
  // STEP 3: CARD ENHANCEMENTS (Played cards)
  // ============================================================================
  for (const card of scoringCards) {
    const enhancement = ENHANCEMENT_EFFECTS[card.enhancement];
    const edition = EDITION_EFFECTS[card.edition];

    // Enhancement chips
    if (enhancement.chips > 0) {
      cardChips += enhancement.chips;
      runningChips += enhancement.chips;
      steps.push({
        source: `${card.rank} ${card.enhancement}`,
        type: 'chips',
        value: enhancement.chips,
        runningChips,
        runningMult,
      });
    }

    // Edition chips (foil)
    if (edition.chips > 0) {
      cardChips += edition.chips;
      runningChips += edition.chips;
      steps.push({
        source: `${card.rank} ${card.edition}`,
        type: 'chips',
        value: edition.chips,
        runningChips,
        runningMult,
      });
    }

    // Enhancement mult
    if (enhancement.mult > 0) {
      cardMult += enhancement.mult;
      runningMult += enhancement.mult;
      steps.push({
        source: `${card.rank} ${card.enhancement}`,
        type: 'mult',
        value: enhancement.mult,
        runningChips,
        runningMult,
      });
    }

    // Edition mult (holographic)
    if (edition.mult > 0) {
      cardMult += edition.mult;
      runningMult += edition.mult;
      steps.push({
        source: `${card.rank} ${card.edition}`,
        type: 'mult',
        value: edition.mult,
        runningChips,
        runningMult,
      });
    }

    // Enhancement xMult (glass)
    if (enhancement.xMult > 1) {
      runningMult *= enhancement.xMult;
      steps.push({
        source: `${card.rank} ${card.enhancement}`,
        type: 'xmult',
        value: enhancement.xMult,
        runningChips,
        runningMult,
      });
    }

    // Edition xMult (polychrome)
    if (edition.xMult > 1) {
      runningMult *= edition.xMult;
      steps.push({
        source: `${card.rank} ${card.edition}`,
        type: 'xmult',
        value: edition.xMult,
        runningChips,
        runningMult,
      });
    }
  }

  // ============================================================================
  // STEP 4: HELD CARD EFFECTS (Steel cards in hand)
  // ============================================================================
  for (const card of heldCards) {
    if (card.enhancement === 'steel') {
      runningMult *= ENHANCEMENT_EFFECTS.steel.xMult;
      steps.push({
        source: `${card.rank} Steel (held)`,
        type: 'xmult',
        value: ENHANCEMENT_EFFECTS.steel.xMult,
        runningChips,
        runningMult,
      });
    }
  }

  // ============================================================================
  // STEP 5: JOKER EFFECTS (Left to Right)
  // ============================================================================
  let jokerChips = 0;
  let jokerMult = 0;
  let jokerXMult = 1;

  for (const joker of activeJokers) {
    for (const effect of joker.effects) {
      const effectResult = evaluateJokerEffect(
        joker,
        effect,
        scoringCards,
        heldCards,
        selectedHandType,
        remainingDiscards,
        money,
        activeJokers.length
      );

      if (effectResult.chips > 0) {
        jokerChips += effectResult.chips;
        runningChips += effectResult.chips;
        steps.push({
          source: joker.name,
          type: 'chips',
          value: effectResult.chips,
          runningChips,
          runningMult,
        });
      }

      if (effectResult.mult > 0) {
        jokerMult += effectResult.mult;
        runningMult += effectResult.mult;
        steps.push({
          source: joker.name,
          type: 'mult',
          value: effectResult.mult,
          runningChips,
          runningMult,
        });
      }

      if (effectResult.xMult > 1) {
        jokerXMult *= effectResult.xMult;
        runningMult *= effectResult.xMult;
        steps.push({
          source: joker.name,
          type: 'xmult',
          value: effectResult.xMult,
          runningChips,
          runningMult,
        });
      }
    }

    // Joker edition effects
    const jokerEdition = EDITION_EFFECTS[joker.edition];
    if (jokerEdition.chips > 0) {
      jokerChips += jokerEdition.chips;
      runningChips += jokerEdition.chips;
      steps.push({
        source: `${joker.name} (${joker.edition})`,
        type: 'chips',
        value: jokerEdition.chips,
        runningChips,
        runningMult,
      });
    }
    if (jokerEdition.mult > 0) {
      jokerMult += jokerEdition.mult;
      runningMult += jokerEdition.mult;
      steps.push({
        source: `${joker.name} (${joker.edition})`,
        type: 'mult',
        value: jokerEdition.mult,
        runningChips,
        runningMult,
      });
    }
    if (jokerEdition.xMult > 1) {
      jokerXMult *= jokerEdition.xMult;
      runningMult *= jokerEdition.xMult;
      steps.push({
        source: `${joker.name} (${joker.edition})`,
        type: 'xmult',
        value: jokerEdition.xMult,
        runningChips,
        runningMult,
      });
    }
  }

  // ============================================================================
  // FINAL CALCULATION
  // ============================================================================
  const totalScore = Math.floor(runningChips * runningMult);

  return {
    baseChips,
    baseMult,
    cardChips,
    cardMult,
    jokerChips,
    jokerMult,
    jokerXMult,
    finalChips: Math.floor(runningChips),
    finalMult: Math.round(runningMult * 100) / 100,
    totalScore,
    steps,
  };
}

// Evaluate a single joker effect
function evaluateJokerEffect(
  joker: Joker,
  effect: Joker['effects'][0],
  scoringCards: Card[],
  heldCards: Card[],
  handType: PokerHandType,
  remainingDiscards: number,
  money: number,
  jokerCount: number
): { chips: number; mult: number; xMult: number } {
  let chips = 0;
  let mult = 0;
  let xMult = 1;

  const condition = effect.condition;

  switch (effect.trigger) {
    case 'always':
      // Special case for Abstract Joker (per joker)
      if (joker.id.startsWith('abstract_joker')) {
        if (effect.type === 'additive_mult') {
          mult = effect.value * jokerCount;
        }
      } else if (joker.counter !== undefined && effect.type === 'additive_chips') {
        // Square Joker and similar
        chips = joker.counter;
      } else if (joker.counter !== undefined && effect.type === 'multiplicative_mult') {
        // Hologram, Vampire, etc.
        xMult = joker.counter;
      } else {
        if (effect.type === 'additive_chips') chips = effect.value;
        if (effect.type === 'additive_mult') mult = effect.value;
        if (effect.type === 'multiplicative_mult') xMult = effect.value;
      }
      break;

    case 'hand_played':
      if (condition?.handTypes?.includes(handType)) {
        if (effect.type === 'additive_chips') chips = effect.value;
        if (effect.type === 'additive_mult') mult = effect.value;
        if (effect.type === 'multiplicative_mult') xMult = effect.value;
      }
      break;

    case 'per_suit':
      if (condition?.suits && condition.perCard) {
        const matchingCards = scoringCards.filter(card =>
          condition.suits!.includes(card.suit)
        );
        const count = matchingCards.length;
        if (effect.type === 'additive_chips') chips = effect.value * count;
        if (effect.type === 'additive_mult') mult = effect.value * count;
        if (effect.type === 'multiplicative_mult' && count > 0) {
          xMult = Math.pow(effect.value, count);
        }
      }
      break;

    case 'per_rank':
      if (condition?.ranks && condition.perCard) {
        const matchingCards = scoringCards.filter(card =>
          condition.ranks!.includes(card.rank)
        );
        const count = matchingCards.length;
        if (effect.type === 'additive_chips') chips = effect.value * count;
        if (effect.type === 'additive_mult') mult = effect.value * count;
        if (effect.type === 'multiplicative_mult' && count > 0) {
          xMult = Math.pow(effect.value, count);
        }
      }
      break;

    case 'per_discard':
      if (condition?.maxCards === 0) {
        // Mystic Summit - only when 0 discards remaining
        if (remainingDiscards === 0) {
          if (effect.type === 'additive_mult') mult = effect.value;
        }
      } else {
        // Banner - per remaining discard
        if (effect.type === 'additive_chips') {
          chips = effect.value * remainingDiscards;
        }
      }
      break;

    case 'on_scored':
      if (condition?.maxCards !== undefined) {
        // Half Joker - 3 or fewer cards
        if (scoringCards.length <= condition.maxCards) {
          if (effect.type === 'additive_mult') mult = effect.value;
        }
      }
      break;

    case 'held_in_hand':
      if (condition?.ranks && condition.perCard) {
        // Baron - Kings held in hand
        const matchingHeld = heldCards.filter(card =>
          condition.ranks!.includes(card.rank)
        );
        const count = matchingHeld.length;
        if (effect.type === 'multiplicative_mult' && count > 0) {
          xMult = Math.pow(effect.value, count);
        }
      } else if (condition?.suits) {
        // Blackboard - all held cards must be specific suits
        const allMatch = heldCards.length > 0 && heldCards.every(card =>
          condition.suits!.includes(card.suit)
        );
        if (allMatch && effect.type === 'multiplicative_mult') {
          xMult = effect.value;
        }
      }
      break;

    case 'economy':
      // Bull - $2 chips per dollar
      if (effect.type === 'additive_chips') {
        chips = effect.value * money;
      }
      break;
  }

  return { chips, mult, xMult };
}

// Helper to count cards by suit
export function countCardsBySuit(cards: Card[]): Record<Suit, number> {
  return cards.reduce(
    (acc, card) => {
      acc[card.suit]++;
      return acc;
    },
    { hearts: 0, diamonds: 0, clubs: 0, spades: 0 } as Record<Suit, number>
  );
}

// Helper to count cards by rank
export function countCardsByRank(cards: Card[]): Record<Rank, number> {
  const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return cards.reduce(
    (acc, card) => {
      acc[card.rank]++;
      return acc;
    },
    Object.fromEntries(ranks.map(r => [r, 0])) as Record<Rank, number>
  );
}

// Format large numbers for display
export function formatScore(score: number): string {
  if (score >= 1e15) {
    return `${(score / 1e15).toFixed(2)}Q`;
  } else if (score >= 1e12) {
    return `${(score / 1e12).toFixed(2)}T`;
  } else if (score >= 1e9) {
    return `${(score / 1e9).toFixed(2)}B`;
  } else if (score >= 1e6) {
    return `${(score / 1e6).toFixed(2)}M`;
  } else if (score >= 1e3) {
    return score.toLocaleString();
  }
  return score.toString();
}
