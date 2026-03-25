import { useState } from 'react';
import type { Player } from '../types';

interface VotingScreenProps {
  players: Player[];
  onVoteComplete: (votes: Record<string, string>) => void;
}

export default function VotingScreen({ players, onVoteComplete }: VotingScreenProps) {
  const [voterIndex, setVoterIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);

  const currentVoter = players[voterIndex];

  const handleVote = () => {
    if (!selectedSuspect) return;

    const newVotes = { ...votes, [currentVoter.id]: selectedSuspect };
    setVotes(newVotes);
    setSelectedSuspect(null);

    if (voterIndex < players.length - 1) {
      setVoterIndex(voterIndex + 1);
    } else {
      onVoteComplete(newVotes);
    }
  };

  return (
    <div className="screen" key={voterIndex}>
      <div className="kawaii-emoji animate-bounce">🤔</div>
      <h2 style={{ margin: '10px 0', textAlign: 'center' }}>{currentVoter.name}'s turn</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', textAlign: 'center' }}>
        Who do you think is the imposter?
      </p>

      <div className="player-list" style={{ paddingBottom: '80px' }}>
        {players.map(p => {
          // Cannot vote for self
          if (p.id === currentVoter.id) return null;
          
          return (
            <button
              key={p.id}
              className={`player-btn ${selectedSuspect === p.id ? 'selected' : ''}`}
              onClick={() => setSelectedSuspect(p.id)}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <button 
        className="btn-primary" 
        onClick={handleVote}
        disabled={!selectedSuspect}
      >
        Confirm Vote 🎯
      </button>
    </div>
  );
}
