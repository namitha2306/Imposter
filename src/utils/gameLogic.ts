import wordDataRaw from '../data/words.json';
import type { WordGroup, Player, Difficulty } from '../types';

const wordData: { words: WordGroup[] } = wordDataRaw;

export function getAllWords(): WordGroup[] {
  const baseWords = wordData.words;
  let customWords: WordGroup[] = [];
  try {
    const saved = localStorage.getItem('kawaii_custom_words');
    if (saved) {
      customWords = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse custom words', e);
  }
  return [...baseWords, ...customWords];
}

/** Shuffles an array in place using Fisher-Yates */
export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateGameData(
  playerCount: number,
  imposterCount: number,
  difficulty: Difficulty,
  categories: string[]
): Player[] {
  // 1. Filter word data by selected categories
  const allWords = getAllWords();
  let availableWords = allWords;
  if (categories && categories.length > 0) {
    availableWords = allWords.filter(w => categories.includes(w.category));
  }
  
  // Fallback if no words match (shouldn't happen)
  if (availableWords.length === 0) {
    availableWords = allWords;
  }

  // 2. Pick a random word group
  const groupIndex = Math.floor(Math.random() * availableWords.length);
  const group = availableWords[groupIndex];

  // 3. Pick the main word and an imposter word based on difficulty
  const mainWord = group.main;
  const imposterWordsList = group[difficulty];
  const imposterWord = imposterWordsList[Math.floor(Math.random() * imposterWordsList.length)];

  // 4. Create players array with assigned roles
  const players: Player[] = [];
  
  // Add imposters
  for (let i = 0; i < imposterCount; i++) {
    players.push({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      role: 'imposter',
      word: imposterWord
    });
  }

  // Add civilians
  for (let i = imposterCount; i < playerCount; i++) {
    players.push({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      role: 'civilian',
      word: mainWord
    });
  }

  // 5. Shuffle the players
  const shuffled = shuffleArray(players);
  
  return shuffled.map((p, index) => ({
    ...p,
    id: `player-${index + 1}`,
    name: `Player ${index + 1}`,
  }));
}
