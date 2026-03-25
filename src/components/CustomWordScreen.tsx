import { useState } from 'react';
import type { WordGroup } from '../types';

interface CustomWordScreenProps {
  onClose: () => void;
}

export default function CustomWordScreen({ onClose }: CustomWordScreenProps) {
  const [category, setCategory] = useState('');
  const [mainWord, setMainWord] = useState('');
  const [easyWord, setEasyWord] = useState('');
  const [mediumWord, setMediumWord] = useState('');
  const [hardWord, setHardWord] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (!category || !mainWord || !easyWord || !mediumWord || !hardWord) {
      alert("Please fill out all fields so the game is fair! 🌸");
      return;
    }

    const newDeck: WordGroup = {
      category: category.trim(),
      main: mainWord.trim(),
      easy: [easyWord.trim()],
      medium: [mediumWord.trim()],
      hard: [hardWord.trim()]
    };

    const existingData = localStorage.getItem('kawaii_custom_words');
    const customWords: WordGroup[] = existingData ? JSON.parse(existingData) : [];
    
    customWords.push(newDeck);
    localStorage.setItem('kawaii_custom_words', JSON.stringify(customWords));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCategory('');
      setMainWord('');
      setEasyWord('');
      setMediumWord('');
      setHardWord('');
    }, 1500);
  };

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: '120px' }}>
      <button 
        onClick={onClose} 
        style={{ 
          background: 'none', border: 'none', fontSize: '32px', 
          alignSelf: 'flex-start', cursor: 'pointer', marginBottom: '16px' 
        }}
      >
        🔙
      </button>

      <h1 className="title" style={{ fontSize: '28px', marginBottom: '8px' }}>Create Inside-Joke</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 'bold' }}>
        Add your own funny words or memories!
      </p>

      <div className="input-group">
        <label>Deck Name / Category</label>
        <input 
          type="text" 
          placeholder="e.g. College Trip 2023" 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <label>Majority Word (Civilians Get This)</label>
        <input 
          type="text" 
          placeholder="e.g. The Blue Hostel" 
          value={mainWord} 
          onChange={e => setMainWord(e.target.value)} 
        />
      </div>

      <div className="result-card" style={{ marginTop: '12px', marginBottom: '24px', padding: '16px' }}>
        <h3 style={{ color: 'var(--primary-dark)', marginBottom: '16px' }}>Imposter Words</h3>
        
        <div className="input-group" style={{ marginBottom: '12px' }}>
          <label style={{ color: 'var(--text-muted)' }}>Easy (Very Obvious Diff)</label>
          <input 
            type="text" 
            placeholder="e.g. Main Library" 
            value={easyWord} 
            onChange={e => setEasyWord(e.target.value)} 
          />
        </div>

        <div className="input-group" style={{ marginBottom: '12px' }}>
          <label style={{ color: 'var(--text-muted)' }}>Medium (Somewhat Similar)</label>
          <input 
            type="text" 
            placeholder="e.g. The Red Hostel" 
            value={mediumWord} 
            onChange={e => setMediumWord(e.target.value)} 
          />
        </div>

        <div className="input-group" style={{ marginBottom: '0' }}>
          <label style={{ color: 'var(--text-muted)' }}>Hard (Extremely Similar)</label>
          <input 
            type="text" 
            placeholder="e.g. Our Hostel Room" 
            value={hardWord} 
            onChange={e => setHardWord(e.target.value)} 
          />
        </div>
      </div>

      {showSuccess && (
        <div style={{ color: 'var(--primary-dark)', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px', fontSize: '18px' }} className="animate-pop">
          Added successfully! 🎉
        </div>
      )}

      <button className="btn-primary" onClick={handleSave}>
        Save Inside-Joke 💾
      </button>
    </div>
  );
}
