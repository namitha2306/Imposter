import { useState } from 'react';
import type { Difficulty } from '../types';

interface SetupScreenProps {
  onStartGame: (players: number, imposters: number, difficulty: Difficulty) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [players, setPlayers] = useState(4);
  const [imposters, setImposters] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleStart = () => {
    onStartGame(players, imposters, difficulty);
  };

  // Adjust imposter max based on player count
  const maxImposters = players - 1;
  const safeImposters = Math.min(imposters, maxImposters);

  return (
    <div className="card animate-pop">
      <div className="sticker sticker-1">⛩️</div>
      <div className="sticker sticker-2">🍵</div>
      <div className="sticker sticker-3">🎎</div>
      <h1 className="title animate-bounce">Kawaii<br/>Imposter<br/>Game</h1>
      
      <div className="input-group">
        <label>Number of Players</label>
        <input 
          type="number" 
          min={3} 
          max={12} 
          value={players} 
          onChange={(e) => {
            const p = parseInt(e.target.value) || 3;
            setPlayers(p);
            if (imposters >= p) setImposters(p - 1);
          }} 
        />
      </div>

      <div className="input-group">
        <label>Number of Imposters</label>
        <input 
          type="number" 
          min={1} 
          max={maxImposters} 
          value={safeImposters} 
          onChange={(e) => setImposters(parseInt(e.target.value) || 1)} 
        />
      </div>

      <div className="input-group">
        <label>Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
          <option value="easy">Easy ( Loosely related )</option>
          <option value="medium">Medium ( Somewhat related )</option>
          <option value="hard">Hard ( Very similar )</option>
        </select>
      </div>

      <button className="btn-primary" onClick={handleStart} style={{ marginTop: '16px' }}>
        Start Game 🌸
      </button>
    </div>
  );
}
