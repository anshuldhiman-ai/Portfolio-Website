import { useState, useEffect } from 'react';

export function useTerminalPosition(terminalId: string = 'terminal') {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Basic centering based on current window size and scroll position
    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Terminal is 700x420, so center it
    const x = Math.max(0, (vWidth - 700) / 2);
    // Position it in the middle of the currently visible screen
    const y = Math.max(20, (vHeight - 420) / 2); 

    setPosition({ x, y });
  }, []); // Only calculate once when opened

  return position;
}
