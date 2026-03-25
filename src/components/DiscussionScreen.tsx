import { useState, useEffect } from 'react';

interface DiscussionScreenProps {
  onProceed: () => void;
  onQuit: () => void;
}

export default function DiscussionScreen({ onProceed, onQuit }: DiscussionScreenProps) {
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
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '16px', position: 'absolute', top: '16px', right: '16px' }}>
        <button onClick={onQuit} style={{ background: 'var(--surface)', color: 'var(--text-main)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          ✖
        </button>
      </div>
      <div className="kawaii-emoji animate-think">🤔</div>
      <h1 className="title" style={{fontSize: '32px', textAlign: 'center'}}>Discussion Time</h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Find out who has the different word!</p>
      
      <div className="timer">
        {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', width: '100%' }}>
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
