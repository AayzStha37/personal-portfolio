import { useState, useEffect, useCallback, useRef } from 'react';
import type React from 'react';
import { useSound } from './SoundManager';
import ArcadeFrame from './ArcadeFrame';

// Skills data structure
const mySkills = [
  { 
    name: 'Java', 
    icon: '☕', 
    description: 'Expert in Java with Spring Boot framework, building scalable backend systems and microservices with 5+ years of experience.' 
  },
  { 
    name: 'Python', 
    icon: '🐍', 
    description: 'Proficient in Python development with experience in backend systems, API development, and automation scripting.' 
  },
  { 
    name: 'Spring Boot', 
    icon: '🍃', 
    description: 'Advanced experience with Spring ecosystem including Spring MVC, Data JPA, and building RESTful microservices.' 
  },
  { 
    name: 'JavaScript', 
    icon: '💛', 
    description: 'Strong JavaScript skills with modern ES6+ features, used for both frontend and backend development.' 
  },
  { 
    name: 'SQL', 
    icon: '🗄️', 
    description: 'Expert in SQL databases including PostgreSQL and MySQL, with strong knowledge of database design and optimization.' 
  },
  { 
    name: 'AWS', 
    icon: '☁️', 
    description: 'Experienced with AWS cloud services including EC2, S3, Lambda, and containerization with Docker/Kubernetes.' 
  },
  { 
    name: 'Docker', 
    icon: '🐳', 
    description: 'Proficient in containerization with Docker and orchestration with Kubernetes for scalable deployments.' 
  },
  { 
    name: 'Apache Kafka', 
    icon: '🔄', 
    description: 'Experienced in building high-performance messaging systems and event streaming with Apache Kafka.' 
  },
  { 
    name: 'Git', 
    icon: '📋', 
    description: 'Expert in version control with Git, including CI/CD pipelines with Jenkins and GitHub Actions.' 
  },
  { 
    name: 'REST APIs', 
    icon: '🌐', 
    description: 'Extensive experience designing and implementing RESTful APIs with proper authentication and documentation.' 
  },
  { 
    name: 'TDD', 
    icon: '🧪', 
    description: 'Strong advocate for Test-Driven Development using JUnit, achieving 85%+ test coverage in production systems.' 
  },
  { 
    name: 'Agile', 
    icon: '🏃', 
    description: 'Experienced in Agile methodologies including Scrum and sprint planning, with expertise in JIRA for project management.' 
  }
];

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

// Mobile grid baseline (kept at 20x20)
const GRID_SIZE = 20;
const GRID_BREADTH = 50;
const GRID_LENGTH = 20;
const GAME_SPEED = 200;

interface SnakeGameProps {
  isMobile?: boolean;
}

const SnakeGame = ({ isMobile = false }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [currentSkill, setCurrentSkill] = useState(mySkills[0]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [collectedSkills, setCollectedSkills] = useState<typeof mySkills>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // desktop container
  const screenRectRef = useRef<SVGRectElement>(null); // svg screen rect
  const { playSound } = useSound();

  // Dynamic cell size for responsive board
  const CELL_SIZE = isMobile ? 16 : 20;

  // Container dimensions (desktop rectangular 50x20, mobile 20x20)
  const GRID_COLS = isMobile ? GRID_SIZE : GRID_BREADTH; // container width (columns)
  const GRID_ROWS = isMobile ? GRID_SIZE : GRID_LENGTH;  // container height (rows)

  // Playable board dimensions (square n x n centered inside container on desktop)
  // For desktop, use 20x20 (GRID_LENGTH) centered within the 50x20 container.
  const PLAY_SIZE = isMobile ? GRID_SIZE : GRID_LENGTH;
  const PLAY_COLS = PLAY_SIZE;
  const PLAY_ROWS = PLAY_SIZE;

  // SVG viewbox and screen-rect definitions for precise alignment (desktop)
  const VB_W = 900;
  const VB_H = 500;
  const SCREEN_RECT = { x: 280, y: 60, w: 340, h: 380 };
  const GRID_GAP = 1; // px gap between cells for desktop board

  // Container pixel dimensions
  const containerWidthPx = GRID_COLS * CELL_SIZE;
  const containerHeightPx = GRID_ROWS * CELL_SIZE;

  // Map SVG coordinates to container pixels with preserveAspectRatio="xMidYMid meet"
  const scale = Math.min(containerWidthPx / VB_W, containerHeightPx / VB_H);
  const contentWidthPx = VB_W * scale;
  const contentHeightPx = VB_H * scale;
  const offsetX = (containerWidthPx - contentWidthPx) / 2;
  const offsetY = (containerHeightPx - contentHeightPx) / 2;
  const screenXpx = offsetX + SCREEN_RECT.x * scale;
  const screenYpx = offsetY + SCREEN_RECT.y * scale;
  const screenWpx = SCREEN_RECT.w * scale;
  const screenHpx = SCREEN_RECT.h * scale;
  // Board fits within screen rect, keep square
  const desiredBoardSizePx = Math.floor(Math.min(screenWpx, screenHpx));
  const innerCellSizePx = Math.max(1, Math.floor((desiredBoardSizePx - GRID_GAP * (PLAY_COLS - 1)) / PLAY_COLS));
  const actualBoardSizePx = innerCellSizePx * PLAY_COLS + GRID_GAP * (PLAY_COLS - 1); // include gaps
  const boardLeftPx = Math.round(screenXpx + (screenWpx - actualBoardSizePx) / 2);
  const boardTopPx = Math.round(screenYpx + (screenHpx - actualBoardSizePx) / 2);

  // Live layout from DOM (desktop): recomputed on resize/zoom to keep board aligned with SVG screen
  const [boardLayout, setBoardLayout] = useState(() => ({
    left: boardLeftPx,
    top: boardTopPx,
    size: actualBoardSizePx,
    cell: innerCellSizePx,
  }));

  useEffect(() => {
    if (isMobile) return; // mobile layout doesn't use SVG screen mapping

    const compute = () => {
      const cont = containerRef.current;
      const screen = screenRectRef.current;
      if (!cont || !screen) return;
      const contRect = cont.getBoundingClientRect();
      const sRect = screen.getBoundingClientRect();
  const maxSquare = Math.floor(Math.min(sRect.width, sRect.height));
  const cell = Math.max(1, Math.floor((maxSquare - GRID_GAP * (PLAY_COLS - 1)) / PLAY_COLS));
  const size = cell * PLAY_COLS + GRID_GAP * (PLAY_COLS - 1);
      const left = Math.round(sRect.left - contRect.left + (sRect.width - size) / 2);
      const top = Math.round(sRect.top - contRect.top + (sRect.height - size) / 2);
      setBoardLayout({ left, top, size, cell });
    };

    // initial compute after paint
    const raf = requestAnimationFrame(compute);

    // respond to container resize
    let ro: ResizeObserver | undefined;
    if ('ResizeObserver' in window && containerRef.current) {
      ro = new ResizeObserver(() => compute());
      ro.observe(containerRef.current);
    }
    // respond to window resize / zoom
    window.addEventListener('resize', compute);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
      ro?.disconnect();
    };
  }, [isMobile, PLAY_COLS]);

  // Touch swipe state for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * PLAY_COLS),
      y: Math.floor(Math.random() * PLAY_ROWS)
    };
    const randomSkill = mySkills[Math.floor(Math.random() * mySkills.length)];
    setFood(newFood);
    setCurrentSkill(randomSkill);
  }, [PLAY_COLS, PLAY_ROWS]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setIsGameOver(false);
    setIsPaused(false);
    setIsGameStarted(false);
    setScore(0);
    setCollectedSkills([]);
    generateFood();
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsPaused(false);
    playSound('menu-confirm');
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused || !isGameStarted) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

  // Check wall collision (against playable board bounds)
  if (head.x < 0 || head.x >= PLAY_COLS || head.y < 0 || head.y >= PLAY_ROWS) {
        setIsGameOver(true);
        playSound('submit-form-error');
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        playSound('submit-form-error');
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        playSound('item-collect');
        setScore(prev => prev + 10);
        setCollectedSkills(prev => [...prev, currentSkill]);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, isGameStarted, currentSkill, generateFood, playSound, PLAY_COLS, PLAY_ROWS]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (isGameOver) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case ' ':
        setIsPaused(!isPaused);
        break;
    }
  }, [direction, isGameOver, isPaused]);

  const handleMobileControl = useCallback((newDirection: Direction) => {
    if (isGameOver) return;
    
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  }, [direction, isGameOver]);

  // Touch handlers for swipe controls
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches?.[0];
    if (!t) return;
    setTouchStart({ x: t.clientX, y: t.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Prevent page scroll while swiping on the game board
    e.preventDefault();
    if (!touchStart || isGameOver || !isGameStarted) return;
    const t = e.touches?.[0];
    if (!t) return;

    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    const threshold = 30;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > threshold) handleMobileControl(dx > 0 ? 'RIGHT' : 'LEFT');
    } else {
      if (Math.abs(dy) > threshold) handleMobileControl(dy > 0 ? 'DOWN' : 'UP');
    }
    setTouchStart(null);
  };

  // Mobile touch listeners 
  useEffect(() => {
    if (!isMobile) return;
    const el = gameAreaRef.current;
    if (!el) return;

    let start: { x: number; y: number } | null = null;
    const onStart = (e: TouchEvent) => {
      const t = e.touches?.[0];
      if (!t) return;
      start = { x: t.clientX, y: t.clientY };
    };
    const onMove = (e: TouchEvent) => {
      if (!start || isGameOver || !isGameStarted) return;
      const t = e.touches?.[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const threshold = 30;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > threshold) {
          handleMobileControl(dx > 0 ? 'RIGHT' : 'LEFT');
          start = null;
        }
      } else {
        if (Math.abs(dy) > threshold) {
          handleMobileControl(dy > 0 ? 'DOWN' : 'UP');
          start = null;
        }
      }
      e.preventDefault();
    };
    const onEnd = () => {
      start = null;
    };

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onStart as EventListener);
      el.removeEventListener('touchmove', onMove as EventListener);
      el.removeEventListener('touchend', onEnd as EventListener);
    };
  }, [isMobile, isGameOver, isGameStarted, handleMobileControl]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    generateFood();
  }, [generateFood]);

  const latestSkill = collectedSkills[collectedSkills.length - 1];

  // Header button state machine
  const headerButtonLabel = isGameOver
    ? 'PLAY AGAIN'
    : !isGameStarted
    ? 'START GAME'
    : isPaused
    ? 'RESUME'
    : 'PAUSE';

  const handleHeaderButtonClick = () => {
    if (isGameOver) {
      resetGame();
      return;
    }
    if (!isGameStarted) {
      startGame();
      return;
    }
    setIsPaused((p) => !p);
    playSound('menu-confirm');
  };

  // Mobile-first layout
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 p-3 w-full">
        {/* Header: Title + Stats + Start/Pause/Resume */}
        <div className="text-center">
          <h2 className="font-arcade text-xl text-primary mb-2">SKILLS GAME</h2>
          <div className="flex justify-center gap-4 font-mono text-xs">
            <span>Score: <span className="text-secondary">{score}</span></span>
            <span>Skills: <span className="text-secondary">{collectedSkills.length}</span></span>
          </div>
          <button onClick={handleHeaderButtonClick} className="arcade-button px-5 py-2 font-arcade text-sm mt-3 text-white">
            {headerButtonLabel}
          </button>
        </div>

        {/* Game Board */}
        <div className="flex flex-col items-center justify-center">
          <div
            ref={gameAreaRef}
            className="snake-game mx-auto relative"
            style={{
              width: `${PLAY_COLS * CELL_SIZE}px`,
              height: `${PLAY_ROWS * CELL_SIZE}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(${PLAY_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${PLAY_ROWS}, 1fr)`,
              gap: '1px',
              background: 'var(--card)',
              borderRadius: 8,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
              position: 'relative',
              touchAction: 'none',
              overscrollBehavior: 'contain',
            }}
          >
            {/* Snake segments */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className="snake-segment"
                style={{
                  gridColumn: segment.x + 1,
                  gridRow: segment.y + 1,
                  backgroundColor: index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
                }}
              />
            ))}

            {/* Food */}
            <div
              className="snake-food flex items-center justify-center text-lg"
              style={{
                gridColumn: food.x + 1,
                gridRow: food.y + 1
              }}
            >
              {currentSkill.icon}
            </div>

            {/* Game Over Overlay */}
            {isGameOver && (
              <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center" style={{ pointerEvents: 'none' }}>
                <h3 className="font-arcade text-2xl text-primary mb-4 text-center text-red-600">GAME OVER</h3>
              </div>
            )}

            {/* Pause Overlay */}
            {isPaused && !isGameOver && isGameStarted && (
              <div className="absolute inset-0 bg-background/90 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                <h3 className="font-arcade text-xl text-secondary text-center">PAUSED</h3>
              </div>
            )}

            {/* Game Not Started Overlay */}
            {!isGameStarted && !isGameOver && (
              <div className="absolute inset-0 bg-background/90 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                <h3 className="font-arcade text-sm text-secondary text-center">PRESS START TO BEGIN</h3>
              </div>
            )}
          </div>

          {/* Controls hint */}
          <div className="text-center mt-3 font-mono text-xs text-muted-foreground">
            Swipe to move
          </div>
        </div>

        {/* Below: Skill Info and Collected Skills side-by-side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Skill Info */}
          <div className="game-ui p-3">
            <h3 className="font-arcade text-base text-primary mb-2 text-center">SKILL INFO</h3>
            {latestSkill ? (
              <div className="space-y-2 text-center">
                <div className="text-3xl">{latestSkill.icon}</div>
                <h4 className="font-arcade text-sm text-secondary">{latestSkill.name}</h4>
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  {latestSkill.description}
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <div className="text-3xl">{currentSkill.icon}</div>
                <h4 className="font-arcade text-sm text-secondary">{currentSkill.name}</h4>
                <p className="font-mono text-xs text-muted-foreground">Collect skills by eating the food items!</p>
              </div>
            )}
          </div>

          {/* Collected Skills */}
          <div className="game-ui p-3">
            <h3 className="font-arcade text-base text-primary mb-2 text-center">COLLECTED</h3>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {collectedSkills.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground font-mono text-xs opacity-60">
                  None yet.
                </div>
              ) : (
                collectedSkills
                  .filter((skill, idx, self) => idx === self.findIndex((s) => s.name === skill.name))
                  .map((skill, index) => (
                    <div
                      key={index}
                      className="h-16 flex flex-col items-center justify-center text-center p-2 bg-arcade-screen rounded-md border border-border"
                      title={skill.name}
                    >
                      <div className="text-lg">{skill.icon}</div>
                      <div className="font-mono text-[10px] text-muted-foreground truncate">{skill.name}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop / larger screens layout 
  return (
    <div className="p-4 w-full">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        {/* Header spanning both columns */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="text-center">
            <h2 className="font-arcade text-xl text-primary mb-2 text-center">SKILLS GAME</h2>
            <div className="flex justify-center gap-4 font-mono text-sm">
              <span>Score: <span className="text-secondary">{score}</span></span>
              <span>Skills: <span className="text-secondary">{collectedSkills.length}</span></span>
            </div>
            <button onClick={handleHeaderButtonClick} className="arcade-button px-6 py-3 font-arcade text-sm mt-2 text-white">{headerButtonLabel}</button>
            <div className="mt-2 font-mono text-xs text-muted-foreground">Use WASD or Arrow keys to move, SPACE to pause</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div ref={containerRef} className="relative" style={{ width: `${containerWidthPx}px`, height: `${containerHeightPx}px` }}>
            {/* Decorative SVG background as a component */}
            <ArcadeFrame className="absolute inset-0" ref={screenRectRef} />

            {/* Centered square playable board */}
            <div
              ref={gameAreaRef}
              className="snake-game absolute"
              style={{
                width: `${boardLayout.size}px`,
                height: `${boardLayout.size}px`,
                top: `${boardLayout.top}px`,
                left: `${boardLayout.left}px`,
                display: 'grid',
                gridTemplateColumns: `repeat(${PLAY_COLS}, ${boardLayout.cell}px)`,
                gridTemplateRows: `repeat(${PLAY_ROWS}, ${boardLayout.cell}px)`,
                gap: `${GRID_GAP}px`,
                background: 'var(--card)',
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'
              }}
            >
              {/* Snake segments */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="snake-segment"
                  style={{
                    gridColumn: segment.x + 1,
                    gridRow: segment.y + 1,
                    backgroundColor: index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
                  }}
                />
              ))}

              {/* Food */}
              <div
                className="snake-food flex items-center justify-center text-lg"
                style={{
                  gridColumn: food.x + 1,
                  gridRow: food.y + 1
                }}
              >
                {currentSkill.icon}
              </div>

              {/* Game Over Overlay  */}
              {isGameOver && (
                <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
                  <h3 className="font-arcade text-2xl text-primary mb-4 text-center text-red-600">GAME OVER</h3>
                </div>
              )}

              {/* Pause Overlay */}
              {isPaused && !isGameOver && isGameStarted && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                  <h3 className="font-arcade text-xl text-secondary text-center">PAUSED</h3>
                </div>
              )}

              {/* Game Not Started Overlay */}
              {!isGameStarted && !isGameOver && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                  <h3 className="font-arcade text-sm text-secondary text-center">PRESS START TO BEGIN</h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skill Tree*/}
        <aside className="hidden lg:block">
          <div className="game-ui p-4 h-full" style={{ height: `${GRID_ROWS * CELL_SIZE}px` }}>
            <div className="flex h-full flex-col">
              <h3 className="font-arcade text-lg text-primary mb-4 text-center">SKILL TREE</h3>
              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2">
                {mySkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded border transition-all ${
                      collectedSkills.some(s => s.name === skill.name)
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-card border-border text-muted-foreground'
                    }`}
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-mono text-xs">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Skill Info panel */}
          <div className="game-ui p-6 h-80 flex flex-col">
            <h3 className="font-arcade text-lg text-primary mb-4 text-center">SKILL INFO</h3>
            {latestSkill ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{latestSkill.icon}</div>
                  <h4 className="font-arcade text-md text-secondary">{latestSkill.name}</h4>
                </div>
                <p className="font-mono text-sm text-foreground leading-relaxed">
                  {latestSkill.description}
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">{currentSkill.icon}</div>
                <h4 className="font-arcade text-md text-secondary">{currentSkill.name}</h4>
                <p className="font-mono text-sm text-muted-foreground">
                  Collect skills by eating the food items!
                </p>
              </div>
            )}
          </div>

          {/* Collected Skills panel */}
          <div className="game-ui p-6 h-80 flex flex-col">
            <h3 className="font-arcade text-lg text-primary mb-4 text-center">COLLECTED SKILLS</h3>
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar grid grid-cols-3 gap-3 content-start items-start auto-rows-min pr-1">
              {collectedSkills.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground font-mono text-sm opacity-60">
                  No skills collected yet.
                </div>
              ) : (
                collectedSkills
                  .filter((skill, index, self) => index === self.findIndex((s) => s.name === skill.name))
                  .map((skill, index) => (
                    <div
                      key={index}
                      className="h-20 flex flex-col items-center justify-center p-3 bg-arcade-screen rounded-md border border-border hover:bg-arcade-screen/80 transition-colors"
                      title={skill.name}
                    >
                      <div className="text-lg">{skill.icon}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate">{skill.name}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;