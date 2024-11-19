import { Howl } from 'howler';
import { useCallback, useEffect, useState } from 'react';

const SOUNDS = {
  move: new Howl({ src: ['/sounds/move.mp3'] }),
  capture: new Howl({ src: ['/sounds/capture.mp3'] }),
  check: new Howl({ src: ['/sounds/check.mp3'] }),
  gameStart: new Howl({ src: ['/sounds/game-start.mp3'] }),
  victory: new Howl({ src: ['/sounds/victory.mp3'] }),
  buttonClick: new Howl({ src: ['/sounds/click.mp3'] }),
  ambient: new Howl({
    src: ['/sounds/ambient.mp3'],
    loop: true,
    volume: 0.3
  })
};

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => 
    localStorage.getItem('soundMuted') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted.toString());
    Object.values(SOUNDS).forEach(sound => {
      sound.mute(isMuted);
    });
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((soundName: keyof typeof SOUNDS) => {
    if (!isMuted && SOUNDS[soundName]) {
      SOUNDS[soundName].play();
    }
  }, [isMuted]);

  const stopSound = useCallback((soundName: keyof typeof SOUNDS) => {
    if (SOUNDS[soundName]) {
      SOUNDS[soundName].stop();
    }
  }, []);

  return {
    isMuted,
    toggleMute,
    playSound,
    stopSound
  };
}