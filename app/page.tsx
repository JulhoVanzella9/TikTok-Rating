"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";

type Step = "rate1" | "rate2" | "roulette" | "vsl";

interface RatingOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const ratingOptions: RatingOption[] = [
  {
    id: "viral",
    label: "VIRAL",
    description: '"It\'s going to blow up!"',
    icon: "🚀",
    bgColor: "bg-gradient-to-r from-green-900/60 to-green-800/40",
    borderColor: "border-green-500/30",
  },
  {
    id: "top",
    label: "TOP",
    description: '"Quality content"',
    icon: "🔥",
    bgColor: "bg-gradient-to-r from-orange-900/60 to-orange-800/40",
    borderColor: "border-orange-500/30",
  },
  {
    id: "notbad",
    label: "NOT BAD",
    description: '"It has potential"',
    icon: "👀",
    bgColor: "bg-gradient-to-r from-yellow-900/60 to-yellow-800/40",
    borderColor: "border-yellow-500/30",
  },
  {
    id: "meh",
    label: "MEH",
    description: '"Not convinced..."',
    icon: "😬",
    bgColor: "bg-gradient-to-r from-gray-800/60 to-gray-700/40",
    borderColor: "border-gray-500/30",
  },
  {
    id: "danger",
    label: "DANGER",
    description: '"This won\'t end well..."',
    icon: "⚠️",
    bgColor: "bg-gradient-to-r from-amber-900/60 to-amber-800/40",
    borderColor: "border-amber-500/30",
  },
  {
    id: "flop",
    label: "FLOP",
    description: '"Doesn\'t work at all"',
    icon: "💩",
    bgColor: "bg-gradient-to-r from-red-900/60 to-red-800/40",
    borderColor: "border-red-500/30",
  },
];

const fakeUsers = [
  { name: "Valentina F.", location: "Phoenix", amount: 14.42 },
  { name: "Lucas M.", location: "Miami", amount: 12.80 },
  { name: "Sofia R.", location: "Los Angeles", amount: 18.25 },
  { name: "Gabriel S.", location: "New York", amount: 15.60 },
  { name: "Isabella C.", location: "Chicago", amount: 11.90 },
  { name: "Miguel A.", location: "Houston", amount: 16.75 },
  { name: "Camila P.", location: "Dallas", amount: 13.45 },
  { name: "Matheus L.", location: "Austin", amount: 19.30 },
];

export default function Home() {
  const [step, setStep] = useState<Step>("rate1");
  const [balance, setBalance] = useState(42.5);
  const [timer, setTimer] = useState(300);
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(fakeUsers[0]);
  const [rouletteSpins, setRouletteSpins] = useState(0);
  const [rouletteResult, setRouletteResult] = useState<"2x" | "3x" | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [videosRated, setVideosRated] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  // Timer countdown
  useEffect(() => {
    if (step === "rate1" || step === "rate2") {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Random user popup
  useEffect(() => {
    if (step === "rate1" || step === "rate2") {
      const showPopup = () => {
        const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        setCurrentUser(randomUser);
        setShowUserPopup(true);
        
        // Play notification sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
        
        setTimeout(() => setShowUserPopup(false), 3000);
      };

      const interval = setInterval(showPopup, 8000);
      setTimeout(showPopup, 3000);
      
      return () => clearInterval(interval);
    }
  }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff0050", "#00f2ea", "#fffc00", "#ff6b6b", "#4ecdc4"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff0050", "#00f2ea", "#fffc00", "#ff6b6b", "#4ecdc4"],
      });
    }, 250);
  }, []);

  const handleRate = useCallback(() => {
    const amount = parseFloat((Math.random() * 5 + 10).toFixed(2));
    setRewardAmount(amount);
    setBalance((prev) => parseFloat((prev + amount).toFixed(2)));
    setShowReward(true);
    setVideosRated((prev) => prev + 1);
    
    // Play success sound
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current.play().catch(() => {});
    }
    
    triggerConfetti();

    setTimeout(() => {
      setShowReward(false);
      if (step === "rate1") {
        setStep("rate2");
      } else if (step === "rate2") {
        setStep("roulette");
      }
    }, 2500);
  }, [step, triggerConfetti]);

  const spinRoulette = useCallback(() => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setRouletteResult(null);

    // Add random rotation (multiple full spins + final position)
    const spins = 5 + Math.random() * 3;
    const newRotation = wheelRotation + spins * 360;
    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      if (rouletteSpins === 0) {
        // First spin: Almost! 2x
        setRouletteResult("2x");
        setRouletteSpins(1);
      } else {
        // Second spin: 3x winner!
        setRouletteResult("3x");
        setRouletteSpins(2);
        triggerConfetti();
        if (successAudioRef.current) {
          successAudioRef.current.currentTime = 0;
          successAudioRef.current.play().catch(() => {});
        }
      }
    }, 4000);
  }, [isSpinning, rouletteSpins, wheelRotation, triggerConfetti]);

  const goToVSL = () => {
    setStep("vsl");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Hidden audio elements */}
      <audio ref={audioRef} preload="auto">
        <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={successAudioRef} preload="auto">
        <source src="https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3" type="audio/mpeg" />
      </audio>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[#ff0050] font-bold text-sm tracking-wide">SUPER VIP</span>
        </div>
        <div className="flex items-center gap-2 bg-[#161616] px-4 py-2 rounded-full border border-[#00f2ea]/30">
          <svg className="w-5 h-5 text-[#00f2ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-[#00f2ea] font-bold">${balance.toFixed(2)}</span>
        </div>
      </header>

      {/* User Popup */}
      {showUserPopup && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-[#161616] to-[#1a1a1a] rounded-xl p-3 flex items-center gap-3 border border-white/10 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff0050] to-[#00f2ea] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{currentUser.name}</p>
              <p className="text-gray-400 text-xs">{currentUser.location}</p>
            </div>
            <div className="bg-[#00f2ea]/20 px-3 py-1 rounded-full">
              <span className="text-[#00f2ea] font-bold text-sm">$ +{currentUser.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in">
          <div className="bg-[#161616] rounded-2xl p-8 mx-4 text-center border-2 border-[#ff0050] max-w-sm w-full animate-slide-up">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff0050] to-[#ff6b6b] flex items-center justify-center">
              <span className="text-4xl">💰</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              🎉 Well done! Reward unlocked!
            </h2>
            <p className="text-gray-400 mb-2">You earned:</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-[#ff0050] to-[#00f2ea] bg-clip-text text-transparent mb-2">
              +${rewardAmount.toFixed(2)}
            </p>
            <p className="text-gray-400 mb-4">for evaluating this video</p>
            <p className="text-white">Keep evaluating to earn more! 🚀</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {(step === "rate1" || step === "rate2") && (
          <RatingScreen
            timer={timer}
            formatTime={formatTime}
            onRate={handleRate}
            videoNumber={step === "rate1" ? 1 : 2}
          />
        )}

        {step === "roulette" && (
          <RouletteScreen
            balance={balance}
            isSpinning={isSpinning}
            wheelRotation={wheelRotation}
            rouletteResult={rouletteResult}
            rouletteSpins={rouletteSpins}
            onSpin={spinRoulette}
            onContinue={goToVSL}
          />
        )}

        {step === "vsl" && <VSLScreen balance={balance * 3} />}
      </div>
    </main>
  );
}

function RatingScreen({
  timer,
  formatTime,
  onRate,
  videoNumber,
}: {
  timer: number;
  formatTime: (s: number) => string;
  onRate: () => void;
  videoNumber: number;
}) {
  const [watchTimer, setWatchTimer] = useState(3);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    setWatchTimer(3);
    setCanRate(false);
    
    const interval = setInterval(() => {
      setWatchTimer((prev) => {
        if (prev <= 1) {
          setCanRate(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [videoNumber]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Timer Bar */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#ff0050]/20 to-transparent">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Time remaining</span>
          <span className="text-[#ff0050] font-mono font-bold">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative flex-1 bg-[#0a0a0a] flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop')`,
          }}
        >
          {/* Watch timer overlay */}
          {!canRate && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#333"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={276.46}
                      strokeDashoffset={276.46 * (1 - watchTimer / 3)}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff0050" />
                        <stop offset="100%" stopColor="#00f2ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
                    {watchTimer}
                  </span>
                </div>
                <p className="text-white font-medium">Watch before rating</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rating Options */}
      <div className="p-4 bg-[#0a0a0a]">
        <p className="text-center text-gray-400 mb-4 text-sm">
          {canRate ? "Choose your reaction:" : "Watch the video to rate"}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ratingOptions.map((option) => (
            <button
              key={option.id}
              onClick={onRate}
              disabled={!canRate}
              className={`${option.bgColor} ${option.borderColor} border rounded-xl p-4 text-left transition-all duration-200 ${
                canRate
                  ? "hover:scale-105 hover:brightness-110 active:scale-95"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{option.icon}</span>
                <span className="font-bold text-white">{option.label}</span>
              </div>
              <p className="text-xs text-gray-300">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RouletteScreen({
  balance,
  isSpinning,
  wheelRotation,
  rouletteResult,
  rouletteSpins,
  onSpin,
  onContinue,
}: {
  balance: number;
  isSpinning: boolean;
  wheelRotation: number;
  rouletteResult: "2x" | "3x" | null;
  rouletteSpins: number;
  onSpin: () => void;
  onContinue: () => void;
}) {
  const [onlineUsers] = useState(Math.floor(Math.random() * 500) + 2500);

  return (
    <div className="flex-1 flex flex-col p-4">
      {/* Info Card */}
      <div className="bg-gradient-to-r from-[#161616] to-[#1a1a1a] rounded-2xl p-4 mb-6 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#ff0050] to-[#00f2ea] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              💵 Multiply your balance!
            </h2>
            <p className="text-gray-400 text-sm">
              Spin the wheel and triple your earnings before withdrawing!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{onlineUsers.toLocaleString()} online</span>
          </div>
          <div className="flex items-center gap-2 text-[#ff0050]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Only 20 spots today</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {rouletteResult && (
        <div
          className={`rounded-2xl p-4 mb-6 border-2 ${
            rouletteResult === "3x"
              ? "bg-[#ff0050]/20 border-[#ff0050]"
              : "bg-red-900/20 border-red-500/50"
          }`}
        >
          {rouletteResult === "2x" ? (
            <div className="text-center">
              <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <span className="text-red-500">✕</span> Almost! Only 2x this time
              </p>
              <p className="text-red-400 text-sm">But don&apos;t give up...</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
                🎉 You got the 3x multiplier!
              </p>
              <p className="text-2xl font-bold text-[#00f2ea] mt-2">
                Your balance will be TRIPLED!
              </p>
              <p className="text-gray-400 text-sm mt-1">Click below to continue</p>
            </div>
          )}
        </div>
      )}

      {/* Roulette Wheel */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff0050]/30 to-[#00f2ea]/30 rounded-full blur-3xl scale-110" />
          
          {/* Wheel */}
          <div
            className="relative w-64 h-64 rounded-full transition-transform"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              transitionDuration: isSpinning ? "4s" : "0s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 0.99)",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Wheel segments */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const nextAngle = ((i + 1) * 45 * Math.PI) / 180;
                const x1 = 100 + 90 * Math.cos(angle);
                const y1 = 100 + 90 * Math.sin(angle);
                const x2 = 100 + 90 * Math.cos(nextAngle);
                const y2 = 100 + 90 * Math.sin(nextAngle);
                const isRed = i % 2 === 0;
                
                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill={isRed ? "#ff0050" : "#00f2ea"}
                    />
                    <text
                      x={100 + 60 * Math.cos(angle + (22.5 * Math.PI) / 180)}
                      y={100 + 60 * Math.sin(angle + (22.5 * Math.PI) / 180)}
                      fill="white"
                      fontWeight="bold"
                      fontSize="16"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {isRed ? "3x" : "2x"}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="25" fill="#1a1a1a" stroke="#333" strokeWidth="3" />
              <text x="100" y="105" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">
                🎰
              </text>
            </svg>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        {rouletteSpins < 2 ? (
          <button
            onClick={onSpin}
            disabled={isSpinning}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
              isSpinning
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#ff0050] to-[#ff6b6b] hover:brightness-110 animate-pulse-glow"
            }`}
          >
            {isSpinning ? "Spinning..." : rouletteSpins === 0 ? "SPIN TO MULTIPLY! 🎰" : "TRY AGAIN! 🎰"}
          </button>
        ) : (
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#00f2ea] to-[#4ecdc4] hover:brightness-110 animate-pulse-glow text-black"
          >
            TRIPLE & CONTINUE 🚀
          </button>
        )}
      </div>
    </div>
  );
}

function VSLScreen({ balance }: { balance: number }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff0050] to-[#00f2ea] flex items-center justify-center mb-6">
        <span className="text-5xl">🎉</span>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">Congratulations!</h1>
      <p className="text-gray-400 mb-6">Your final balance is:</p>
      
      <div className="bg-[#161616] rounded-2xl p-6 border border-[#00f2ea]/30 mb-8">
        <p className="text-5xl font-bold bg-gradient-to-r from-[#00f2ea] to-[#4ecdc4] bg-clip-text text-transparent">
          ${balance.toFixed(2)}
        </p>
      </div>

      <p className="text-gray-400 mb-8 max-w-sm">
        Watch the video below to learn how to withdraw your earnings and start making money today!
      </p>

      {/* Video placeholder */}
      <div className="w-full max-w-md aspect-video bg-[#161616] rounded-2xl flex items-center justify-center border border-white/10 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#ff0050] flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-gray-400">Click to play VSL</p>
        </div>
      </div>

      <button className="w-full max-w-md py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#ff0050] to-[#ff6b6b] hover:brightness-110 animate-pulse-glow">
        WITHDRAW NOW 💸
      </button>
    </div>
  );
}
