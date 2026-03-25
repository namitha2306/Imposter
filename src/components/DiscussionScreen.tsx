import { useState, useEffect } from 'react';

interface DiscussionScreenProps {
  onProceed: () => void;
}

export default function DiscussionScreen({ onProceed }: DiscussionScreenProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000) as unknown as number;
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const addTime = (secs: number) => setTimeLeft(t => t + secs);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card animate-pop">
      <div className="sticker sticker-1">💭</div>
      <div className="sticker sticker-4">🔍</div>
      <div className="kawaii-emoji animate-think">🤔</div>
      <h1 className="title" style={{fontSize: '28px'}}>Discussion Time</h1>
      <p style={{ color: 'var(--text-muted)' }}>Find out who has the different word!</p>
      
      <div className="timer">
        {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button className="btn-secondary" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start Timer'}
        </button>
        <button className="btn-secondary" onClick={() => addTime(30)}>
          +30s
        </button>
      </div>

      <button className="btn-primary" onClick={onProceed}>
        Proceed to Voting 🗳️
      </button>
    </div>
  );
}
