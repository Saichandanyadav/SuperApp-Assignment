'use client';

import { useState, useEffect, useRef } from 'react';

export default function TimerWidget() {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  
  const [inputH, setInputH] = useState<number>(0);
  const [inputM, setInputM] = useState<number>(0);
  const [inputS, setInputS] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, secondsLeft]);

  const setTimerValue = () => {
    const totalSecs = inputH * 3600 + inputM * 60 + inputS;
    setTotalDuration(totalSecs);
    setSecondsLeft(totalSecs);
  };

  const handleStartToggle = () => {
    if (!isActive && secondsLeft === 0) {
      const totalSecs = inputH * 3600 + inputM * 60 + inputS;
      if (totalSecs > 0) {
        setTotalDuration(totalSecs);
        setSecondsLeft(totalSecs);
        setIsActive(true);
      }
    } else if (secondsLeft > 0) {
      setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(0);
    setTotalDuration(0);
    setInputH(0);
    setInputM(0);
    setInputS(0);
  };

  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSecs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const percentageLeft = totalDuration > 0 ? (secondsLeft / totalDuration) * 100 : 0;
  const strokeDashoffset = totalDuration > 0 ? 339.29 - (339.29 * percentageLeft) / 100 : 339.29;

  return (
    <div className="bg-[#1E2343] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 select-none">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            className="stroke-blue-500/20 fill-none"
            strokeWidth="5"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            className="stroke-purple-500 fill-none transition-all duration-1000 ease-linear"
            strokeWidth="5"
            strokeDasharray="339.29"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-2xl font-mono tracking-wider text-white">{formatTime(secondsLeft)}</span>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Hours</label>
            <input type="number" min="0" max="23" value={inputH} onChange={e => setInputH(Number(e.target.value))} className="w-full bg-zinc-800 rounded p-2 text-center text-xl text-white focus:outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Minutes</label>
            <input type="number" min="0" max="59" value={inputM} onChange={e => setInputM(Number(e.target.value))} className="w-full bg-zinc-800 rounded p-2 text-center text-xl text-white focus:outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Seconds</label>
            <input type="number" min="0" max="59" value={inputS} onChange={e => setInputS(Number(e.target.value))} className="w-full bg-zinc-800 rounded p-2 text-center text-xl text-white focus:outline-none" />
          </div>
        </div>

        <button onClick={setTimerValue} className="w-full py-1.5 bg-zinc-700/50 hover:bg-zinc-700 text-xs uppercase tracking-widest rounded transition-colors text-zinc-300">
          Set Parameters
        </button>

        <div className="flex gap-2">
          <button 
            onClick={handleStartToggle} 
            className={`flex-1 py-3 font-bold rounded-full transition-colors text-white ${isActive ? 'bg-amber-600 hover:bg-amber-500' : 'bg-green-600 hover:bg-green-500'}`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={handleReset} 
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 font-bold rounded-full transition-colors text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}