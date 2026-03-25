export type Difficulty = 'easy' | 'medium' | 'hard';

export type Role = 'civilian' | 'imposter';

export interface Player {
  id: string;
  name: string;
  role: Role;
  word: string;
}

export type GamePhase = 'setup' | 'assigning' | 'discussion' | 'voting' | 'result';

export interface WordGroup {
  main: string;
  easy: string[];
  medium: string[];
  hard: string[];
}
