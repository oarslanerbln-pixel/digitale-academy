// Web Audio API helper for synthetic UI sound generation
// Using singletons to avoid creating thousands of AudioContexts

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Soft piano/glass chime for hovers
export const playTick = () => {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine'; // Sine gives a pure, glass-like tone
    // Steady pitch (C6 note approx) instead of a dropping laser sound
    osc.frequency.setValueAtTime(1046.50, ctx.currentTime); 

    // Soft envelope with a longer trail like a piano string or glass
    gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.01); // Gentle attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15); // Smooth fade out

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // Silently fail if audio doesn't work (e.g. strict browser policies without interact)
  }
};

// Helper to synthesize a more realistic "piano/bell" note
const playPianoNote = (ctx: AudioContext, frequency: number, time: number, duration: number, maxVol: number = 0.5) => {
    // Fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = frequency;

    // Harmonic 1 (adds string-like brightness)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = frequency * 2;
    
    // Harmonic 2
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = frequency * 3;

    const gainNode = ctx.createGain();
    
    // Piano envelope: hard attack, exponential decay body
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(maxVol, time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

    const mix1 = ctx.createGain(); mix1.gain.value = 1.0;
    const mix2 = ctx.createGain(); mix2.gain.value = 0.15; 
    const mix3 = ctx.createGain(); mix3.gain.value = 0.05;

    osc1.connect(mix1); mix1.connect(gainNode);
    osc2.connect(mix2); mix2.connect(gainNode);
    osc3.connect(mix3); mix3.connect(gainNode);

    gainNode.connect(ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc3.start(time);

    osc1.stop(time + duration);
    osc2.stop(time + duration);
    osc3.stop(time + duration);
};

// Soft "plug/pop" sound — gentle button-open feel
export const playClick = () => {
    try {
        const ctx = initAudio();
        if (!ctx) return;
        const now = ctx.currentTime;
        
        // Single soft sine tone (G4) with rounded attack
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(392, now); // G4
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.12); // gentle pitch drop = "plug" feel
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.015); // quick but soft attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25); // short smooth decay
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    } catch (e) {
    }
};

// Cinematic Grand Piano Opening Chord (C minor 9)
export const playWhoosh = () => {
    try {
        const ctx = initAudio();
        if (!ctx) return;
        const now = ctx.currentTime;
        
        // A huge cinematic C minor 9 chord, layered very deep to very high
        // C2, G2, D3, D#3, G3, A#3, D4
        playPianoNote(ctx, 65.41, now, 4.0, 0.3);   // C2 (Deep bass)
        playPianoNote(ctx, 98.00, now, 4.0, 0.2);   // G2
        playPianoNote(ctx, 146.83, now, 4.5, 0.15); // D3
        playPianoNote(ctx, 155.56, now, 4.5, 0.15); // D#3 (Minor third)
        playPianoNote(ctx, 196.00, now, 5.0, 0.1);  // G3
        playPianoNote(ctx, 233.08, now, 5.0, 0.1);  // A#3 (Minor 7th)
        playPianoNote(ctx, 293.66, now + 0.1, 5.0, 0.05); // D4 (Rolled slightly late for effect)

        // Add a gentle ambient noise sweep to support the grand piano hit
        const bufferSize = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(50, now);
        filter.frequency.exponentialRampToValueAtTime(1000, now + 1.0);
        filter.frequency.exponentialRampToValueAtTime(50, now + 3.0);
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.5);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
        
        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSource.start(now);
        noiseSource.stop(now + 3.0);
    } catch (e) {
    }
}

// Premium, soft, low-frequency exit/close sound
export const playClose = () => {
    try {
        const ctx = initAudio();
        if (!ctx) return;
        const now = ctx.currentTime;
        
        // Deep, resolving soft chord (C3, E3, G3)
        playPianoNote(ctx, 130.81, now, 1.5, 0.1); 
        playPianoNote(ctx, 164.81, now, 1.5, 0.08); 
        playPianoNote(ctx, 196.00, now, 1.5, 0.05); 
        
        // Gentle "whoosh out" noise
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(40, now + 0.8);
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.04, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        
        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSource.start(now);
        noiseSource.stop(now + 1.2);
    } catch (e) {
    }
}
