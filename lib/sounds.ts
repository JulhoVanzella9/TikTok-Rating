// Sound utility functions using Web Audio API for generating sounds
export function playSuccessSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create a happy, celebratory sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.type = "sine";
    oscillator2.type = "sine";
    
    // Play a major chord arpeggio
    const now = audioContext.currentTime;
    
    oscillator1.frequency.setValueAtTime(523.25, now); // C5
    oscillator1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    oscillator1.frequency.setValueAtTime(783.99, now + 0.2); // G5
    oscillator1.frequency.setValueAtTime(1046.50, now + 0.3); // C6
    
    oscillator2.frequency.setValueAtTime(261.63, now); // C4
    oscillator2.frequency.setValueAtTime(329.63, now + 0.1); // E4
    oscillator2.frequency.setValueAtTime(392.00, now + 0.2); // G4
    oscillator2.frequency.setValueAtTime(523.25, now + 0.3); // C5
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator1.stop(now + 0.5);
    oscillator2.stop(now + 0.5);
  } catch (e) {
    console.log("Audio not supported");
  }
}

export function playClickSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (e) {
    console.log("Audio not supported");
  }
}

export function playSpinSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = "sawtooth";
    
    const now = audioContext.currentTime;
    
    // Spinning sound effect
    for (let i = 0; i < 20; i++) {
      oscillator.frequency.setValueAtTime(200 + (i * 50), now + (i * 0.1));
    }
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2);
    
    oscillator.start(now);
    oscillator.stop(now + 2);
  } catch (e) {
    console.log("Audio not supported");
  }
}

export function playWinSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const oscillator3 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    oscillator3.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.type = "sine";
    oscillator2.type = "triangle";
    oscillator3.type = "sine";
    
    const now = audioContext.currentTime;
    
    // Fanfare sound
    oscillator1.frequency.setValueAtTime(523.25, now); // C5
    oscillator1.frequency.setValueAtTime(659.25, now + 0.15); // E5
    oscillator1.frequency.setValueAtTime(783.99, now + 0.3); // G5
    oscillator1.frequency.setValueAtTime(1046.50, now + 0.45); // C6
    
    oscillator2.frequency.setValueAtTime(392, now);
    oscillator2.frequency.setValueAtTime(523.25, now + 0.15);
    oscillator2.frequency.setValueAtTime(659.25, now + 0.3);
    oscillator2.frequency.setValueAtTime(783.99, now + 0.45);
    
    oscillator3.frequency.setValueAtTime(261.63, now);
    oscillator3.frequency.setValueAtTime(329.63, now + 0.15);
    oscillator3.frequency.setValueAtTime(392, now + 0.3);
    oscillator3.frequency.setValueAtTime(523.25, now + 0.45);
    
    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.setValueAtTime(0.3, now + 0.45);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator3.start(now);
    oscillator1.stop(now + 0.8);
    oscillator2.stop(now + 0.8);
    oscillator3.stop(now + 0.8);
  } catch (e) {
    console.log("Audio not supported");
  }
}

export function playNotificationSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = "sine";
    
    const now = audioContext.currentTime;
    
    oscillator.frequency.setValueAtTime(880, now);
    oscillator.frequency.setValueAtTime(1100, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  } catch (e) {
    console.log("Audio not supported");
  }
}
