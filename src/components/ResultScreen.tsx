import type { Player } from '../types';

interface ResultScreenProps {
  players: Player[];
  votes: Record<string, string>; // Voter ID -> Voted Player ID
  onPlayAgain: () => void;
}

export default function ResultScreen({ players, votes, onPlayAgain }: ResultScreenProps) {
  // Tally votes determining who got the most votes
  const voteCounts: Record<string, number> = {};
  Object.values(votes).forEach(votedForId => {
    voteCounts[votedForId] = (voteCounts[votedForId] || 0) + 1;
  });

  const maxVotes = Math.max(...Object.values(voteCounts), 0);
  const eliminatedPlayerIds = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

  // Check if any imposter got eliminated
  const imposters = players.filter(p => p.role === 'imposter');
  const impostersEliminated = imposters.some(imp => eliminatedPlayerIds.includes(imp.id));
  
  const civiliansWin = impostersEliminated;
  
  const mainWord = players.find(p => p.role === 'civilian')?.word || '';
  const imposterWord = imposters[0]?.word || '';

  return (
    <div className="card animate-pop">
      {civiliansWin ? (
        <>
          <div className="sticker sticker-1">🎊</div>
          <div className="sticker sticker-2">🏆</div>
        </>
      ) : (
        <>
          <div className="sticker sticker-1" style={{filter: 'hue-rotate(180deg)'}}>👻</div>
          <div className="sticker sticker-3">🔥</div>
        </>
      )}
      <div className={`kawaii-emoji ${civiliansWin ? 'animate-win' : 'animate-imposter'}`}>
        {civiliansWin ? '🎉' : '😈'}
      </div>
      <h1 className="title" style={{ fontSize: '30px' }}>
        {civiliansWin ? 'Civilians Win!' : 'Imposters Win!'}
      </h1>

      <div style={{ background: '#FFF0F5', padding: '16px', borderRadius: '16px', width: '100%', marginBottom: '10px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '4px' }}>Main Word</h3>
        <p style={{ fontWeight: 800, fontSize: '24px' }}>{mainWord}</p>
      </div>

      <div style={{ background: '#F0FFF0', padding: '16px', borderRadius: '16px', width: '100%', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--accent)', marginBottom: '4px' }}>Imposter Word</h3>
        <p style={{ fontWeight: 800, fontSize: '24px' }}>{imposterWord}</p>
      </div>

      <h3 style={{ marginBottom: '10px' }}>The Imposters were:</h3>
      <div className="player-list" style={{ marginBottom: '24px' }}>
        {imposters.map(imp => (
          <div key={imp.id} style={{
            background: 'var(--secondary)', 
            padding: '12px', 
            borderRadius: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>👤</span> {imp.name}
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={onPlayAgain} style={{ width: '100%' }}>
        Play Again 🌸
      </button>
    </div>
  );
}
