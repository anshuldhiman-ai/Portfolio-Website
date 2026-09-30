'use client';

import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { useTerminalCommands } from '../hooks/useTerminalCommands';
import { useTerminalPosition } from '../hooks/useTerminalPosition';

interface TerminalProps {
  onCommand?: (command: string, output: string) => void;
  onMinimize?: () => void;
  originX?: number;
  originY?: number;
}

export default function Terminal({ onCommand, onMinimize, originX = typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, originY = typeof window !== 'undefined' ? window.innerHeight - 60 : 800 }: TerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [lines, setLines] = useState<ReactNode[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooted, setIsBooted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { executeCommand } = useTerminalCommands();

  // Smart Maximize dimensions
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const margin = 60;

  // Custom Hook to calculate center position
  const centerPosition = useTerminalPosition();

  // RND state initialized to central position
  const [size, setSize] = useState({ width: 700, height: 420 });
  const [position, setPosition] = useState({
    x: centerPosition.x > 0 ? centerPosition.x : vw - 700 - 40,
    y: centerPosition.y > 0 ? centerPosition.y : vh - 420 - 40
  });

  // Effect to update position when centerPosition evaluates
  useEffect(() => {
    if (centerPosition.x > 0 && centerPosition.y > 0) {
      setPosition({ x: centerPosition.x, y: centerPosition.y });
    }
  }, [centerPosition]);

  const toggleMaximize = () => {
    if (isMaximized) {
      // restore to bottom right
      setSize({ width: 700, height: 420 });
      setPosition({ x: vw - 700 - 40, y: vh - 420 - 40 });
    } else {
      // maximize with margin
      setSize({ width: vw - margin * 2, height: vh - margin * 2 });
      setPosition({ x: margin, y: margin });
    }
    setIsMaximized(!isMaximized);
  };

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  // Boot sequence
  useEffect(() => {
    if (isBooted) return;
    const boot = async () => {
      const bootLines: ReactNode[] = [];
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
      
      bootLines.push(<div key="1">Last login: {timestamp} on ttys001</div>);
      bootLines.push(<div key="2" className="h-4" />);
      setLines([...bootLines]);
      
      await new Promise(r => setTimeout(r, 600));
      
      bootLines.push(<div key="3" className="text-white/60 font-medium">Initializing portfolio...</div>);
      setLines([...bootLines]);
      await new Promise(r => setTimeout(r, 400));
      
      bootLines.push(<div key="4" className="text-white/60 font-medium">Loading AI modules...</div>);
      setLines([...bootLines]);
      await new Promise(r => setTimeout(r, 500));
      
      bootLines.push(<div key="5" className="text-white/60 font-medium pb-4">Boot sequence complete. Welcome.</div>);
      
      // Auto-run neofetch
      bootLines.push(<div key="6">anshul@MacBook-Pro ~ % neofetch</div>);
      bootLines.push(<div key="7" className="h-2" />);
      
      const neofetchStr = `
   ╭─ Anshul Dhiman ─────────────────╮
   │                                  │
   │  Role     AI/ML Engineer         │
   │  Focus    LLMs · Vision · MLOps  │
   │  Class    2029                   │
   │  Status   Building the future    │
   │                                  │
   ╰──────────────────────────────────╯`;
   
      bootLines.push(
        <div key="8" className="whitespace-pre-wrap leading-[1.4]">{neofetchStr}</div>
      );
      bootLines.push(<div key="9" className="h-4" />);
      setLines([...bootLines]);
      
      await new Promise(r => setTimeout(r, 300));
      setIsBooted(true);
    };
    boot();
  }, [isBooted]);

  const focusInput = useCallback(() => {
    if (inputRef.current && isBooted && !isTyping) {
      inputRef.current.focus();
    }
  }, [isBooted, isTyping]);

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    let output = '';
    
    // Quick typing simulation for commands
    for (let i = 0; i < text.length; i++) {
        output += text[i];
        
        // Convert to React node lines on the fly if needed, or just append HTML
        const html = renderAnsi(output);
        setLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = <div key={Date.now()} dangerouslySetInnerHTML={{ __html: html }} />;
            return newLines;
        });
        await new Promise(r => setTimeout(r, Math.random() * 8 + 4)); 
    }
    setIsTyping(false);
  };

  const renderAnsi = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\x1b\[0m/g, '</span>')
      .replace(/\x1b\[1m/g, '<span style="font-weight:600; color:white">')
      .replace(/\x1b\[2m/g, '<span style="opacity:0.5">')
      .replace(/\x1b\[31m/g, '<span style="color:#FF453A">') // macOS Red
      .replace(/\x1b\[32m/g, '<span style="color:#32D74B">') // macOS Green
      .replace(/\x1b\[33m/g, '<span style="color:#FFD60A">') // macOS Yellow
      .replace(/\x1b\[34m/g, '<span style="color:#0A84FF">') // macOS Blue
      .replace(/\x1b\[35m/g, '<span style="color:#BF5AF2">') // macOS Purple
      .replace(/\x1b\[36m/g, '<span style="color:#64D2FF">') // macOS Cyan
      .replace(/\x1b\[90m/g, '<span style="color:rgba(255,255,255,0.4)">');
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    const promptLine = `anshul@MacBook-Pro ~ % ${trimmed}`;

    if (!trimmed) {
      setLines(prev => [...prev, <div key={`empty-${Date.now()}`}>{promptLine}</div>]);
      return;
    }

    if (trimmed === 'clear') {
      setLines([]);
    } else {
      setLines(prev => [...prev, <div key={`cmd-${Date.now()}`}>{promptLine}</div>]);
      
      const rawOutput = executeCommand(trimmed);
      
      if (['whoami', 'skills', 'projects', 'cat about.md'].includes(trimmed)) {
          // Special typed animation for complex commands
          setLines(prev => [...prev, <div key={`out-${Date.now()}`} />]); 
          await simulateTyping(rawOutput);
      } else {
          // Instant output
          const outputHtml = renderAnsi(rawOutput);
          setLines(prev => [...prev, <div key={`out-${Date.now()}`} className="whitespace-pre-wrap break-all" dangerouslySetInnerHTML={{ __html: outputHtml }} />]);
      }
      if (onCommand) onCommand(trimmed, rawOutput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isTyping) return;
      const cmd = currentInput;
      setCurrentInput('');
      setCommandHistory(prev => [...prev, cmd.trim()]);
      setHistoryIndex(-1);
      handleCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        if (historyIndex < commandHistory.length - 1) {
          setHistoryIndex(historyIndex + 1);
          setCurrentInput(commandHistory[historyIndex + 1]);
        } else {
          setHistoryIndex(-1);
          setCurrentInput('');
        }
      }
    }
  };

  if (isClosed) {
    if (onMinimize) {
      setTimeout(() => onMinimize(), 100);
    }
    return null;
  }

  // "Suck in" Animation variants utilizing CSS transform and blur to emulate the Genie Effect without WebGL Mesh Deformation
  // We shrink to the origin button point using a perspective rotation, translation, and scale
  // Because 'RND' uses absolute layout (top/left), x/y transforms must account for the current component position
  const genieVariants = {
    hidden: {
        opacity: 0,
        scale: 0.05,
        x: (originX - position.x) - (size.width / 2),
        y: (originY - position.y) - (size.height / 2),
        rotateX: -20,
        filter: "blur(12px)",
        borderRadius: "40px"
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        borderRadius: "16px",
        transition: { type: "spring", damping: 18, stiffness: 120, mass: 0.8 }
    },
    exit: {
        opacity: 0,
        scale: 0.05,
        x: (originX - position.x) - (size.width / 2),
        y: (originY - position.y) - (size.height / 2),
        rotateX: 30,
        filter: "blur(15px)",
        borderRadius: "40px",
        transition: { type: "spring", damping: 25, stiffness: 200, mass: 0.6 }
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <Rnd
          size={{ width: size.width, height: size.height }}
          position={{ x: position.x, y: position.y }}
          onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
          onResizeStop={(e, dir, ref, delta, pos) => {
            setSize({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
            setPosition(pos);
          }}
          minWidth={400}
          minHeight={300}
          bounds="window"
          dragHandleClassName="macos-drag-handle"
          className="z-50 smooth-transition"
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          style={{ transition: 'none' }} // RND manages positioning without CSS transitions to prevent lag
        >
          {/* Backdrop blur layer for smart maximize */}
          {isMaximized && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 -z-10 backdrop-blur-md bg-black/20"
               style={{ width: '200vw', height: '200vh', left: -500, top: -500 }}
             />
          )}

          <motion.div
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full overflow-hidden macos-shadow bg-[#18181a]/85 backdrop-blur-3xl border border-white/[0.09] flex flex-col relative group"
            style={{
              boxShadow: isMaximized
                 ? '0 0 0 1px rgba(255,255,255,0.05), 0 50px 100px -20px rgba(0,0,0,0.8)'
                 : '0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px -12px rgba(0,0,0,0.8)'
            }}
          >
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* ── macOS Title Bar ── */}
            <div 
              className="macos-drag-handle flex items-center h-[42px] px-4 bg-[#232325]/80 border-b border-black/40 select-none cursor-grab active:cursor-grabbing backdrop-blur-md"
              onDoubleClick={toggleMaximize}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-[8px] z-10 hover:[&>button>svg]:opacity-100">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsClosed(true); }}
                  className="w-[12px] h-[12px] rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center transition-all hover:brightness-110 active:brightness-90"
                  aria-label="Close"
                >
                  <svg className="w-[6px] h-[6px] text-[#4a0002] opacity-0 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 2l8 8M10 2l-8 8" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                  className="w-[12px] h-[12px] rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 flex items-center justify-center transition-all hover:brightness-110 active:brightness-90"
                  aria-label="Minimize"
                >
                  <svg className="w-[6px] h-[6px] text-[#5a3e00] opacity-0 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M2 6h8" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                  className="w-[12px] h-[12px] rounded-full bg-[#27C93F] border border-[#1AAB29]/60 flex items-center justify-center transition-all hover:brightness-110 active:brightness-90"
                  aria-label="Maximize"
                >
                  <svg className="w-[6px] h-[6px] text-[#006500] opacity-0 transition-opacity" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M1 1h4v2H3v2H1V1zM7 1h4v4h-2V3H7V1zM1 7h2v2h2v2H1V7zM9 9v2H7v-2h2zM11 7v4H9V9h2z" />
                  </svg>
                </button>
              </div>

              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[13px] text-white/50 font-medium font-sans tracking-wide">
                  anshul — bash
                </span>
              </div>
            </div>

            {/* ── Terminal Body ── */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-[13.5px] cursor-text smooth-transition"
              style={{ color: '#E4E4E7' }}
              onClick={focusInput}
            >
              <div className="space-y-[2px]">
                {lines}
              </div>

              {/* Active prompt */}
              {isBooted && (
                <div className="flex items-center leading-[1.6] mt-1 relative">
                  <span className="text-[#E4E4E7] shrink-0 font-medium">anshul@MacBook-Pro ~ % </span>
                  <div className="relative flex-1 ml-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => !isTyping && setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none border-none text-[#E4E4E7] caret-transparent font-mono text-[13.5px] leading-[1.6]"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        readOnly={isTyping}
                      />
                      {/* Fake Blinking Cursor for better aesthetics */}
                      <span 
                        className={`absolute left-0 top-0 bottom-0 w-[8px] bg-white/70 block pointer-events-none ${!isTyping ? 'cursor-blink' : 'hidden'}`}
                        style={{ transform: `translateX(${currentInput.length * 8.1}px)` }} // ~8.1px per monospace char
                      />
                  </div>
                </div>
              )}
            </div>
            
            {/* Edge border glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/[0.04] pointer-events-none transition-colors duration-500" />
          </motion.div>
        </Rnd>
      ) : (
        /* Minimized Pill */
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#1e1e20]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl hover:bg-[#2c2c2e]/90 transition-colors"
        >
          <div className="flex gap-1.5 opacity-80">
             <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
             <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
             <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[13px] font-medium text-white/80 font-sans">Terminal</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
