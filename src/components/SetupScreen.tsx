import { useState } from 'react';
import type { Difficulty } from '../types';

interface SetupScreenProps {
  onStartGame: (players: number, imposters: number, difficulty: Difficulty) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [players, setPlayers] = useState<number | ''>(4);
  const [imposters, setImposters] = useState<number | ''>(1);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const pCount = typeof players === 'number' ? players : 3;
  const maxImposters = Math.max(1, pCount - 1);
  
  const handleStart = () => {
    const finalPlayers = Math.max(3, Math.min(12, pCount));
    let iCount = typeof imposters === 'number' ? imposters : 1;
    // ensure imposters is between 1 and maxImposters
    iCount = Math.max(1, Math.min(iCount, finalPlayers - 1));
    onStartGame(finalPlayers, iCount, difficulty);
  };

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
            const val = e.target.value;
            if (val === '') {
              setPlayers('');
            } else {
              const num = parseInt(val);
              setPlayers(num);
              // Don't auto-correct imposters here aggressively if they are typing
            }
          }} 
        />
      </div>

      <div className="input-group">
        <label>Number of Imposters</label>
        <input 
          type="number" 
          min={1} 
          max={maxImposters} 
          value={imposters} 
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') {
              setImposters('');
            } else {
              setImposters(parseInt(val));
            }
          }} 
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
