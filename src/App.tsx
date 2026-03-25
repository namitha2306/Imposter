import { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import CustomWordScreen from './components/CustomWordScreen';
import PlayerPassScreen from './components/PlayerPassScreen';
import DiscussionScreen from './components/DiscussionScreen';
import VotingScreen from './components/VotingScreen';
import ResultScreen from './components/ResultScreen';
import { generateGameData } from './utils/gameLogic';
import type { GamePhase, Player, Difficulty } from './types';

function App() {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [votes, setVotes] = useState<Record<string, string>>({});

  const handleStartGame = (playerCount: number, imposterCount: number, difficulty: Difficulty, categories: string[]) => {
    const gameData = generateGameData(playerCount, imposterCount, difficulty, categories);
    setPlayers(gameData);
    setPhase('assigning');
  };

  const handleFinishAssigning = () => {
    setPhase('discussion');
  };

  const handleProceedToVoting = () => {
    setPhase('voting');
  };

  const handleVoteComplete = (finalVotes: Record<string, string>) => {
    setVotes(finalVotes);
    setPhase('result');
  };

  const handlePlayAgain = () => {
    setPlayers([]);
    setVotes({});
    setPhase('setup');
  };

  const handleQuit = () => {
    if (window.confirm("Are you sure you want to quit the current game? 🌸")) {
      handlePlayAgain();
    }
  };

  return (
    <div className="app-container">
      {phase === 'setup' && (
        <SetupScreen 
          onStartGame={handleStartGame} 
          onOpenCustomWords={() => setPhase('custom-words')}
        />
      )}
      
      {phase === 'custom-words' && (
        <CustomWordScreen onClose={() => setPhase('setup')} />
      )}
      
      {phase === 'assigning' && (
        <PlayerPassScreen players={players} onFinishAssigning={handleFinishAssigning} onQuit={handleQuit} />
      )}

      {phase === 'discussion' && (
        <DiscussionScreen onProceed={handleProceedToVoting} onQuit={handleQuit} />
      )}

      {phase === 'voting' && (
        <VotingScreen players={players} onVoteComplete={handleVoteComplete} onQuit={handleQuit} />
      )}

      {phase === 'result' && (
        <ResultScreen players={players} votes={votes} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
