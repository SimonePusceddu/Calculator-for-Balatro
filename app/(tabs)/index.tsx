// ============================================================================
// BALATRO SCORE CALCULATOR - MAIN COMPONENT
// Authentic Balatro visual style with enhanced card components
// ============================================================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import {
  Card,
  Joker,
  PokerHandType,
  Suit,
  Rank,
  Enhancement,
  Edition,
  HAND_BASE_VALUES,
} from '@/types/balatro';
import { JOKER_CATALOG } from '@/data/jokers';
import { calculateScore, formatScore, ScoringContext } from '@/utils/scoring';

// New enhanced components
import { PlayingCard } from '@/components/cards/PlayingCard';
import { JokerCard } from '@/components/cards/JokerCard';
import { CardSuitSVG } from '@/components/cards/CardSuitSVG';
import { BalatroBackground } from '@/components/effects/BalatroBackground';
import { SubtleScanlines } from '@/components/effects/ScanlineOverlay';
import { GlowWrapper } from '@/components/effects/GlowWrapper';
import { BALATRO_COLORS, RARITY_COLORS } from '@/constants/balatro-theme';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const generateCardId = () => `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const createDefaultCard = (rank: Rank, suit: Suit): Card => ({
  id: generateCardId(),
  rank,
  suit,
  enhancement: 'none',
  edition: 'none',
  seal: 'none',
  isScoring: true,
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BalatroCalculator() {
  // State
  const [jokers, setJokers] = useState<Joker[]>([]);
  const [playedCards, setPlayedCards] = useState<Card[]>([
    createDefaultCard('A', 'spades'),
    createDefaultCard('K', 'spades'),
    createDefaultCard('Q', 'spades'),
    createDefaultCard('J', 'spades'),
    createDefaultCard('10', 'spades'),
  ]);
  const [heldCards, setHeldCards] = useState<Card[]>([]);
  const [selectedHandType, setSelectedHandType] = useState<PokerHandType>('straight_flush');
  const [handLevel, setHandLevel] = useState(1);
  const [remainingDiscards, setRemainingDiscards] = useState(3);
  const [money, setMoney] = useState(4);

  // Modals
  const [jokerModalVisible, setJokerModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [handModalVisible, setHandModalVisible] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
  const [editingCardType, setEditingCardType] = useState<'played' | 'held'>('played');

  // Calculate score
  const scoreBreakdown = useMemo(() => {
    const context: ScoringContext = {
      playedCards,
      heldCards,
      jokers,
      selectedHandType,
      handLevel,
      remainingDiscards,
      money,
    };
    return calculateScore(context);
  }, [playedCards, heldCards, jokers, selectedHandType, handLevel, remainingDiscards, money]);

  // Joker handlers
  const addJoker = useCallback((jokerTemplate: Joker) => {
    if (jokers.length >= 5) return;
    const newJoker: Joker = {
      ...jokerTemplate,
      id: `${jokerTemplate.id}_${Date.now()}`,
    };
    setJokers(prev => [...prev, newJoker]);
    setJokerModalVisible(false);
  }, [jokers.length]);

  const removeJoker = useCallback((index: number) => {
    setJokers(prev => prev.filter((_, i) => i !== index));
  }, []);

  const moveJoker = useCallback((index: number, direction: 'left' | 'right') => {
    setJokers(prev => {
      const newJokers = [...prev];
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newJokers.length) return prev;
      [newJokers[index], newJokers[newIndex]] = [newJokers[newIndex], newJokers[index]];
      return newJokers;
    });
  }, []);

  const cycleJokerEdition = useCallback((index: number) => {
    setJokers(prev => {
      const newJokers = [...prev];
      const editions: Edition[] = ['none', 'foil', 'holographic', 'polychrome'];
      const currentIndex = editions.indexOf(newJokers[index].edition);
      newJokers[index] = {
        ...newJokers[index],
        edition: editions[(currentIndex + 1) % editions.length],
      };
      return newJokers;
    });
  }, []);

  // Card handlers
  const openCardEditor = useCallback((index: number, type: 'played' | 'held') => {
    setEditingCardIndex(index);
    setEditingCardType(type);
    setCardModalVisible(true);
  }, []);

  const updateCard = useCallback((rank: Rank, suit: Suit, enhancement: Enhancement, edition: Edition) => {
    if (editingCardIndex === null) return;

    const updateFn = (prev: Card[]) => {
      const newCards = [...prev];
      newCards[editingCardIndex] = {
        ...newCards[editingCardIndex],
        rank,
        suit,
        enhancement,
        edition,
      };
      return newCards;
    };

    if (editingCardType === 'played') {
      setPlayedCards(updateFn);
    } else {
      setHeldCards(updateFn);
    }
    setCardModalVisible(false);
  }, [editingCardIndex, editingCardType]);

  const addCard = useCallback((type: 'played' | 'held') => {
    const newCard = createDefaultCard('A', 'spades');
    if (type === 'played' && playedCards.length < 5) {
      setPlayedCards(prev => [...prev, newCard]);
    } else if (type === 'held' && heldCards.length < 5) {
      setHeldCards(prev => [...prev, newCard]);
    }
  }, [playedCards.length, heldCards.length]);

  const removeCard = useCallback((index: number, type: 'played' | 'held') => {
    if (type === 'played') {
      setPlayedCards(prev => prev.filter((_, i) => i !== index));
    } else {
      setHeldCards(prev => prev.filter((_, i) => i !== index));
    }
  }, []);

  const toggleCardScoring = useCallback((index: number) => {
    setPlayedCards(prev => {
      const newCards = [...prev];
      newCards[index] = {
        ...newCards[index],
        isScoring: !newCards[index].isScoring,
      };
      return newCards;
    });
  }, []);

  return (
    <BalatroBackground>
      <StatusBar barStyle="light-content" backgroundColor={BALATRO_COLORS.backgroundDark} />

      {/* CRT Scanline Effect */}
      <SubtleScanlines />

      <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BALATRO</Text>
          <Text style={styles.subtitle}>Score Calculator</Text>
        </View>

        {/* Score Display */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreRow}>
              <GlowWrapper color="blue" intensity="medium">
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>CHIPS</Text>
                  <Text style={[styles.scoreValue, styles.chipsValue]}>
                    {formatScore(scoreBreakdown.finalChips)}
                  </Text>
                </View>
              </GlowWrapper>

              <Text style={styles.scoreOperator}>x</Text>

              <GlowWrapper color="red" intensity="medium">
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>MULT</Text>
                  <Text style={[styles.scoreValue, styles.multValue]}>
                    {scoreBreakdown.finalMult.toLocaleString()}
                  </Text>
                </View>
              </GlowWrapper>

              <Text style={styles.scoreOperator}>=</Text>

              <GlowWrapper color="gold" intensity="high">
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>SCORE</Text>
                  <Text style={[styles.scoreValue, styles.totalScoreValue]}>
                    {formatScore(scoreBreakdown.totalScore)}
                  </Text>
                </View>
              </GlowWrapper>
            </View>
          </View>
        </View>

        {/* Hand Type Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Poker Hand</Text>
            <View style={styles.levelControls}>
              <TouchableOpacity
                style={styles.levelBtn}
                onPress={() => setHandLevel(Math.max(1, handLevel - 1))}
              >
                <Text style={styles.levelBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.levelText}>Lvl {handLevel}</Text>
              <TouchableOpacity
                style={styles.levelBtn}
                onPress={() => setHandLevel(Math.min(15, handLevel + 1))}
              >
                <Text style={styles.levelBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.handSelector}
            onPress={() => setHandModalVisible(true)}
          >
            <Text style={styles.handName}>{HAND_BASE_VALUES[selectedHandType].name}</Text>
            <Text style={styles.handStats}>
              <Text style={styles.chipsText}>{scoreBreakdown.baseChips} Chips</Text>
              {' + '}
              <Text style={styles.multText}>{scoreBreakdown.baseMult} Mult</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Joker Rack */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jokers ({jokers.length}/5)</Text>
            {jokers.length < 5 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setJokerModalVisible(true)}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.jokerRack}
            contentContainerStyle={styles.rackContent}
          >
            {jokers.length === 0 ? (
              <TouchableOpacity
                style={styles.emptySlot}
                onPress={() => setJokerModalVisible(true)}
              >
                <Text style={styles.emptySlotText}>Tap to add joker</Text>
              </TouchableOpacity>
            ) : (
              jokers.map((joker, index) => (
                <JokerCard
                  key={joker.id}
                  joker={joker}
                  index={index}
                  totalCount={jokers.length}
                  onRemove={() => removeJoker(index)}
                  onMoveLeft={() => moveJoker(index, 'left')}
                  onMoveRight={() => moveJoker(index, 'right')}
                  onCycleEdition={() => cycleJokerEdition(index)}
                />
              ))
            )}
          </ScrollView>
        </View>

        {/* Played Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Played Cards ({playedCards.length}/5)</Text>
            {playedCards.length < 5 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addCard('played')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardRack}
            contentContainerStyle={styles.rackContent}
          >
            {playedCards.map((card, index) => (
              <View key={card.id} style={styles.cardWrapper}>
                <PlayingCard
                  card={card}
                  onPress={() => openCardEditor(index, 'played')}
                  onRemove={() => removeCard(index, 'played')}
                  onToggleScoring={() => toggleCardScoring(index)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Held Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Held in Hand ({heldCards.length}/5)</Text>
            {heldCards.length < 5 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addCard('held')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
          {heldCards.length === 0 ? (
            <TouchableOpacity
              style={styles.emptyCardSlot}
              onPress={() => addCard('held')}
            >
              <Text style={styles.emptySlotText}>Tap to add held card</Text>
            </TouchableOpacity>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cardRack}
              contentContainerStyle={styles.rackContent}
            >
              {heldCards.map((card, index) => (
                <View key={card.id} style={styles.cardWrapper}>
                  <PlayingCard
                    card={card}
                    onPress={() => openCardEditor(index, 'held')}
                    onRemove={() => removeCard(index, 'held')}
                    isHeld
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Game State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game State</Text>
          <View style={styles.gameStateRow}>
            <View style={styles.gameStateItem}>
              <Text style={styles.gameStateLabel}>Discards</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setRemainingDiscards(Math.max(0, remainingDiscards - 1))}
                >
                  <Text style={styles.counterBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{remainingDiscards}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setRemainingDiscards(Math.min(10, remainingDiscards + 1))}
                >
                  <Text style={styles.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.gameStateItem}>
              <Text style={styles.gameStateLabel}>Money</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setMoney(Math.max(0, money - 1))}
                >
                  <Text style={styles.counterBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.counterValue, styles.moneyValue]}>${money}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setMoney(money + 1)}
                >
                  <Text style={styles.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Score Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score Breakdown</Text>
          <View style={styles.breakdownCard}>
            {scoreBreakdown.steps.map((step, index) => (
              <View key={index} style={styles.breakdownRow}>
                <Text style={styles.breakdownSource}>{step.source}</Text>
                <Text
                  style={[
                    styles.breakdownValue,
                    step.type === 'chips' && styles.chipsText,
                    step.type === 'mult' && styles.multText,
                    step.type === 'xmult' && styles.xmultText,
                  ]}
                >
                  {step.type === 'chips' && `+${step.value}`}
                  {step.type === 'mult' && `+${step.value}`}
                  {step.type === 'xmult' && `x${step.value}`}
                </Text>
                <Text style={styles.breakdownRunning}>
                  <Text style={styles.chipsText}>{Math.floor(step.runningChips)}</Text>
                  {' x '}
                  <Text style={styles.multText}>{Math.round(step.runningMult * 100) / 100}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer} />
      </ScrollView>

      {/* Modals */}
      <Modal
        visible={jokerModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setJokerModalVisible(false)}
      >
        <JokerSelectionModal
          onSelect={addJoker}
          onClose={() => setJokerModalVisible(false)}
        />
      </Modal>

      <Modal
        visible={cardModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCardModalVisible(false)}
      >
        <CardEditorModal
          card={
            editingCardIndex !== null
              ? (editingCardType === 'played' ? playedCards : heldCards)[editingCardIndex]
              : null
          }
          onSave={updateCard}
          onClose={() => setCardModalVisible(false)}
        />
      </Modal>

      <Modal
        visible={handModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setHandModalVisible(false)}
      >
        <HandSelectionModal
          selectedHand={selectedHandType}
          onSelect={(hand) => {
            setSelectedHandType(hand);
            setHandModalVisible(false);
          }}
          onClose={() => setHandModalVisible(false)}
        />
      </Modal>
    </BalatroBackground>
  );
}

// ============================================================================
// JOKER SELECTION MODAL
// ============================================================================
interface JokerSelectionModalProps {
  onSelect: (joker: Joker) => void;
  onClose: () => void;
}

function JokerSelectionModal({ onSelect, onClose }: JokerSelectionModalProps) {
  const filteredJokers = JOKER_CATALOG;

  const groupedJokers = {
    legendary: filteredJokers.filter(j => j.rarity === 'legendary'),
    rare: filteredJokers.filter(j => j.rarity === 'rare'),
    uncommon: filteredJokers.filter(j => j.rarity === 'uncommon'),
    common: filteredJokers.filter(j => j.rarity === 'common'),
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Joker</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalList}>
          {(['legendary', 'rare', 'uncommon', 'common'] as const).map(rarity => (
            groupedJokers[rarity].length > 0 && (
              <View key={rarity}>
                <Text style={[styles.rarityHeader, { color: RARITY_COLORS[rarity].primary }]}>
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </Text>
                {groupedJokers[rarity].map(joker => (
                  <TouchableOpacity
                    key={joker.id}
                    style={styles.listItem}
                    onPress={() => onSelect(joker)}
                  >
                    <Text style={styles.listItemName}>{joker.name}</Text>
                    <Text style={styles.listItemDesc}>{joker.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// ============================================================================
// CARD EDITOR MODAL
// ============================================================================
interface CardEditorModalProps {
  card: Card | null;
  onSave: (rank: Rank, suit: Suit, enhancement: Enhancement, edition: Edition) => void;
  onClose: () => void;
}

function CardEditorModal({ card, onSave, onClose }: CardEditorModalProps) {
  const [rank, setRank] = useState<Rank>(card?.rank || 'A');
  const [suit, setSuit] = useState<Suit>(card?.suit || 'spades');
  const [enhancement, setEnhancement] = useState<Enhancement>(card?.enhancement || 'none');
  const [edition, setEdition] = useState<Edition>(card?.edition || 'none');

  useEffect(() => {
    if (card) {
      setRank(card.rank);
      setSuit(card.suit);
      setEnhancement(card.enhancement);
      setEdition(card.edition);
    }
  }, [card]);

  const ranks: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  const suits: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
  const enhancements: Enhancement[] = ['none', 'bonus', 'mult', 'wild', 'glass', 'steel', 'stone', 'gold', 'lucky'];
  const editions: Edition[] = ['none', 'foil', 'holographic', 'polychrome'];

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit Card</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalClose}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.cardEditorContent}>
          {/* Rank Selection */}
          <Text style={styles.editorLabel}>Rank</Text>
          <View style={styles.optionGrid}>
            {ranks.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.optionBtn, rank === r && styles.optionBtnSelected]}
                onPress={() => setRank(r)}
              >
                <Text style={[styles.optionBtnText, rank === r && styles.optionBtnTextSelected]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Suit Selection */}
          <Text style={styles.editorLabel}>Suit</Text>
          <View style={styles.optionRow}>
            {suits.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.suitBtn, suit === s && styles.suitBtnSelected]}
                onPress={() => setSuit(s)}
              >
                <CardSuitSVG suit={s} size={28} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Enhancement Selection */}
          <Text style={styles.editorLabel}>Enhancement</Text>
          <View style={styles.optionGrid}>
            {enhancements.map(e => (
              <TouchableOpacity
                key={e}
                style={[styles.optionBtn, enhancement === e && styles.optionBtnSelected]}
                onPress={() => setEnhancement(e)}
              >
                <Text style={[styles.optionBtnText, enhancement === e && styles.optionBtnTextSelected]}>
                  {e === 'none' ? 'None' : e.charAt(0).toUpperCase() + e.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Edition Selection */}
          <Text style={styles.editorLabel}>Edition</Text>
          <View style={styles.optionRow}>
            {editions.map(e => (
              <TouchableOpacity
                key={e}
                style={[styles.optionBtn, edition === e && styles.optionBtnSelected]}
                onPress={() => setEdition(e)}
              >
                <Text style={[styles.optionBtnText, edition === e && styles.optionBtnTextSelected]}>
                  {e === 'none' ? 'Base' : e.charAt(0).toUpperCase() + e.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => onSave(rank, suit, enhancement, edition)}
        >
          <Text style={styles.saveButtonText}>Save Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ============================================================================
// HAND SELECTION MODAL
// ============================================================================
interface HandSelectionModalProps {
  selectedHand: PokerHandType;
  onSelect: (hand: PokerHandType) => void;
  onClose: () => void;
}

function HandSelectionModal({ selectedHand, onSelect, onClose }: HandSelectionModalProps) {
  const hands: PokerHandType[] = [
    'flush_five',
    'flush_house',
    'five_of_a_kind',
    'royal_flush',
    'straight_flush',
    'four_of_a_kind',
    'full_house',
    'flush',
    'straight',
    'three_of_a_kind',
    'two_pair',
    'pair',
    'high_card',
  ];

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Hand Type</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalList}>
          {hands.map(hand => {
            const values = HAND_BASE_VALUES[hand];
            return (
              <TouchableOpacity
                key={hand}
                style={[
                  styles.handListItem,
                  selectedHand === hand && styles.handListItemSelected,
                ]}
                onPress={() => onSelect(hand)}
              >
                <Text style={styles.handListName}>{values.name}</Text>
                <Text style={styles.handListStats}>
                  <Text style={styles.chipsText}>{values.chips}</Text>
                  {' x '}
                  <Text style={styles.multText}>{values.mult}</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: BALATRO_COLORS.goldAccent,
    letterSpacing: 4,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: BALATRO_COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 4,
  },
  // Score Section
  scoreSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: BALATRO_COLORS.border,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  scoreItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: BALATRO_COLORS.surfaceDark,
    borderRadius: 8,
    minWidth: 70,
  },
  scoreLabel: {
    fontSize: 10,
    color: BALATRO_COLORS.textSecondary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  chipsValue: {
    color: BALATRO_COLORS.chipBlue,
  },
  multValue: {
    color: BALATRO_COLORS.multRed,
  },
  totalScoreValue: {
    color: BALATRO_COLORS.goldAccent,
    fontSize: 26,
  },
  scoreOperator: {
    fontSize: 20,
    color: BALATRO_COLORS.textSecondary,
    fontWeight: 'bold',
  },
  // Color text styles
  chipsText: {
    color: BALATRO_COLORS.chipBlue,
  },
  multText: {
    color: BALATRO_COLORS.multRed,
  },
  xmultText: {
    color: BALATRO_COLORS.xMultOrange,
  },
  moneyValue: {
    color: BALATRO_COLORS.goldAccent,
  },
  // Sections
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BALATRO_COLORS.text,
    letterSpacing: 1,
  },
  // Level Controls
  levelControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: BALATRO_COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  levelBtnText: {
    color: BALATRO_COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelText: {
    color: BALATRO_COLORS.goldAccent,
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  // Hand Selector
  handSelector: {
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  handName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BALATRO_COLORS.text,
    marginBottom: 4,
  },
  handStats: {
    fontSize: 14,
  },
  // Add Button
  addButton: {
    backgroundColor: BALATRO_COLORS.multRed,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: BALATRO_COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  // Card Racks
  jokerRack: {
    minHeight: 170,
  },
  cardRack: {
    minHeight: 140,
  },
  rackContent: {
    paddingRight: 16,
    paddingVertical: 10,
  },
  cardWrapper: {
    marginRight: 12,
  },
  emptySlot: {
    width: 110,
    height: 150,
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BALATRO_COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCardSlot: {
    height: 120,
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BALATRO_COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlotText: {
    color: BALATRO_COLORS.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  // Game State
  gameStateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  gameStateItem: {
    alignItems: 'center',
  },
  gameStateLabel: {
    fontSize: 11,
    color: BALATRO_COLORS.textSecondary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: BALATRO_COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  counterBtnText: {
    color: BALATRO_COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BALATRO_COLORS.text,
    marginHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  // Breakdown
  breakdownCard: {
    backgroundColor: BALATRO_COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: BALATRO_COLORS.border,
  },
  breakdownSource: {
    flex: 1,
    fontSize: 11,
    color: BALATRO_COLORS.textSecondary,
  },
  breakdownValue: {
    width: 55,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  breakdownRunning: {
    width: 90,
    fontSize: 10,
    textAlign: 'right',
  },
  footer: {
    height: 40,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: BALATRO_COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: BALATRO_COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BALATRO_COLORS.text,
  },
  modalClose: {
    color: BALATRO_COLORS.multRed,
    fontSize: 16,
    fontWeight: '600',
  },
  modalList: {
    padding: 16,
  },
  rarityHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    letterSpacing: 1,
  },
  listItem: {
    backgroundColor: BALATRO_COLORS.surfaceLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  listItemName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: BALATRO_COLORS.text,
    marginBottom: 4,
  },
  listItemDesc: {
    fontSize: 11,
    color: BALATRO_COLORS.textSecondary,
  },
  // Card Editor
  cardEditorContent: {
    padding: 16,
  },
  editorLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: BALATRO_COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: BALATRO_COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  optionBtnSelected: {
    backgroundColor: BALATRO_COLORS.multRed,
    borderColor: BALATRO_COLORS.multRed,
  },
  optionBtnText: {
    color: BALATRO_COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  optionBtnTextSelected: {
    color: BALATRO_COLORS.text,
  },
  suitBtn: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: BALATRO_COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  suitBtnSelected: {
    borderColor: BALATRO_COLORS.goldAccent,
    borderWidth: 2,
  },
  saveButton: {
    backgroundColor: BALATRO_COLORS.multRed,
    margin: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: BALATRO_COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  handListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BALATRO_COLORS.surfaceLight,
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  handListItemSelected: {
    borderColor: BALATRO_COLORS.goldAccent,
    borderWidth: 2,
  },
  handListName: {
    fontSize: 13,
    fontWeight: '600',
    color: BALATRO_COLORS.text,
  },
  handListStats: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
