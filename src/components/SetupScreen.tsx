import { useState } from 'react';
import type { Difficulty } from '../types';

interface SetupScreenProps {
  onStartGame: (players: number, imposters: number, difficulty: Difficulty, categories: string[]) => void;
}

const ALL_CATEGORIES = ['Food', 'Places', 'Objects', 'Nature', 'Friends'];

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [players, setPlayers] = useState<number | ''>(4);
  const [imposters, setImposters] = useState<number | ''>(1);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(ALL_CATEGORIES);
  const [showError, setShowError] = useState(false);

  const pCount = typeof players === 'number' ? players : 0;
  const iCount = typeof imposters === 'number' ? imposters : 0;

  // Scales up to 100: 3-6 -> 1, 7-12 -> 2, etc. (Default to 1 if pCount < 3)
  const maxImposters = pCount >= 3 ? Math.floor((pCount - 1) / 6) + 1 : 1;
  const isValid = pCount >= 3 && pCount <= 100 && iCount >= 1 && iCount <= maxImposters;
  
  const handleStart = () => {
    if (!isValid) {
      setShowError(true);
      return;
    }
    onStartGame(pCount, iCount, difficulty, selectedCategories);
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length === 1) return; // Prevent unselecting all
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="card animate-pop" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="sticker sticker-1">⛩️</div>
      <div className="sticker sticker-2">🍵</div>
      <div className="sticker sticker-3">🎎</div>
      <h1 className="title animate-bounce">Kawaii<br/>Imposter<br/>Game</h1>
      
      <div className="input-group">
        <label>Number of Players</label>
        <input 
          type="number" 
          min={3} 
          max={100} 
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

      <div className="input-group">
        <label>Categories (カテゴリ)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="category-pill"
              style={{
                background: selectedCategories.includes(cat) ? 'var(--primary)' : 'var(--card-bg)',
                color: selectedCategories.includes(cat) ? 'white' : 'var(--text-main)',
                border: `2px solid var(--primary)`,
                boxShadow: selectedCategories.includes(cat) ? '0 4px 0 var(--primary-dark)' : '0 4px 0 var(--secondary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {showError && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(5px)',
          zIndex: 100, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', padding: '24px'
        }}>
          <div className="animate-pop" style={{
            background: 'var(--card-bg)', border: '4px solid var(--primary)',
            padding: '24px', borderRadius: '24px', textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: 'var(--primary-dark)', marginBottom: '16px', fontSize: '28px' }}>Oops! 🙈</h2>
            <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px', color: 'var(--text-main)' }}>
              {pCount < 3 ? 'You need at least 3 players to play!' : `Max Imposters for ${pCount} players is ${maxImposters}.`}
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
              Please correct the numbers so the game is fair and fun!
            </p>
            <button className="btn-secondary" onClick={() => setShowError(false)}>
              Got it! 🌸
            </button>
          </div>
        </div>
      )}

      <button className="btn-primary" onClick={handleStart} style={{ marginTop: '16px' }}>
        Start Game 🌸
      </button>
    </div>
  );
}
