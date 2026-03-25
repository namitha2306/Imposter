import wordDataRaw from '../data/words.json';
import type { WordGroup, Player, Difficulty } from '../types';

const wordData: { words: WordGroup[] } = wordDataRaw;

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
  difficulty: Difficulty
): Player[] {
  // 1. Pick a random word group
  const groupIndex = Math.floor(Math.random() * wordData.words.length);
  const group = wordData.words[groupIndex];

  // 2. Pick the main word and an imposter word based on difficulty
  const mainWord = group.main;
  const imposterWordsList = group[difficulty];
  const imposterWord = imposterWordsList[Math.floor(Math.random() * imposterWordsList.length)];

  // 3. Create players array with assigned roles
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

  // 4. Shuffle the players
  const shuffled = shuffleArray(players);
  
  // 5. Re-assign generic names to hide original insert order optionally, 
  // though just keeping the shuffled array and assigning name based on new index is better.
  return shuffled.map((p, index) => ({
    ...p,
    id: `player-${index + 1}`,
    name: `Player ${index + 1}`,
  }));
}
