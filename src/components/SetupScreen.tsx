import { useState, useEffect } from 'react';
import type { Difficulty, WordGroup } from '../types';
import { getAllWords } from '../utils/gameLogic';

interface SetupScreenProps {
  onStartGame: (players: number, imposters: number, difficulty: Difficulty, categories: string[]) => void;
  onOpenCustomWords: () => void;
}

export default function SetupScreen({ onStartGame, onOpenCustomWords }: SetupScreenProps) {
  const [players, setPlayers] = useState<number | ''>(4);
  const [imposters, setImposters] = useState<number | ''>(1);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  // Load dynamic categories including localStorage
  useEffect(() => {
    const allWords = getAllWords();
    const uniqueCats = Array.from(new Set(allWords.map((w: WordGroup) => w.category))) as string[];
    setAvailableCategories(uniqueCats);
    // Select all by default the first time it loads
    setSelectedCategories(uniqueCats);
  }, []);

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
    <div className="screen" style={{ position: 'relative' }}>
      <h1 className="title">Kawaii<br />Imposter<br />Game</h1>

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
        <div className="categories-container" style={{ marginBottom: '16px' }}>
          {availableCategories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className="category-pill"
              style={{
                background: selectedCategories.includes(cat) ? 'var(--primary)' : 'var(--surface)',
                color: selectedCategories.includes(cat) ? 'white' : 'var(--text-main)',
                border: `2px solid var(--primary)`,
                boxShadow: selectedCategories.includes(cat) ? '0 4px 0 var(--primary-dark)' : '0 4px 0 var(--secondary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onOpenCustomWords}
          style={{ background: 'transparent', border: '2px dashed var(--primary)', color: 'var(--primary-dark)', padding: '12px' }}
        >
          ➕ Inside-Joke Deck
        </button>
      </div>

      {showError && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          zIndex: 2000, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', padding: '24px'
        }}>
          <div className="animate-pop" style={{
            background: 'var(--surface)', border: 'none',
            padding: '32px 24px', borderRadius: '32px', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%'
          }}>
            <h2 style={{ color: 'var(--primary-dark)', marginBottom: '16px', fontSize: '32px' }}>Oops! 🙈</h2>
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '12px', color: 'var(--text-main)' }}>
              {pCount < 3 ? 'You need at least 3 players to play!' : `Max Imposters for ${pCount} players is ${maxImposters}.`}
            </p>
            <button type="button" className="btn-secondary" onClick={() => setShowError(false)} style={{marginTop: '20px'}}>
              Got it! 🌸
            </button>
          </div>
        </div>
      )}

      {/* spacer to prevent fixed button overlap on all devices */}
      <div style={{ height: '140px', width: '100%', flexShrink: 0 }} />

      <button className="btn-primary" onClick={handleStart}>
        Start Game 🌸
      </button>
    </div>
  );
}
