import { useState } from 'react';
import type { Player } from '../types';

interface PlayerPassScreenProps {
  players: Player[];
  onFinishAssigning: () => void;
}

export default function PlayerPassScreen({ players, onFinishAssigning }: PlayerPassScreenProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const handleNext = () => {
    if (showWord) {
      // Hide word and pass to next player
      setShowWord(false);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        onFinishAssigning();
      }
    } else {
      // Reveal word
      setShowWord(true);
    }
  };

  return (
    <div className="screen" key={currentPlayerIndex + (showWord ? 'show' : 'hide')}>
      <div className="kawaii-emoji animate-bounce">
        {showWord ? '👀' : '📱'}
      </div>
      
      {!showWord ? (
        <>
          <h2>Pass the device to</h2>
          <h1 className="title" style={{ fontSize: '32px', margin: '10px 0' }}>{currentPlayer.name}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Make sure no one else is looking!</p>
          <button className="btn-primary" onClick={handleNext} style={{ marginTop: '20px' }}>
            Tap to Reveal Word
          </button>
        </>
      ) : (
        <>
          <h2>Your secret word is:</h2>
          <h1 className="title" style={{ fontSize: '40px', margin: '20px 0', color: 'var(--accent)' }}>
            {currentPlayer.word}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Remember your word, but don't say it out loud!</p>
          <button className="btn-secondary" onClick={handleNext} style={{ marginTop: '20px' }}>
            Hide & Pass ➡️
          </button>
        </>
      )}
    </div>
  );
}
