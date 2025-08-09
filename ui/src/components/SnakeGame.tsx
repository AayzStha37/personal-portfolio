import { useState, useEffect, useCallback, useRef } from 'react';
import type React from 'react';
import { useSound } from './SoundManager';

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

const GRID_SIZE = 20;
const GAME_SPEED = 150;

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
  const { playSound } = useSound();

  // Dynamic cell size for responsive board
  const CELL_SIZE = isMobile ? 16 : 20;

  // Touch swipe state for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    const randomSkill = mySkills[Math.floor(Math.random() * mySkills.length)];
    setFood(newFood);
    setCurrentSkill(randomSkill);
  }, []);

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

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsGameOver(true);
        playSound('game-over');
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        playSound('game-over');
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
  }, [direction, food, isGameOver, isPaused, isGameStarted, currentSkill, generateFood, playSound]);

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

  const handleMobileControl = (newDirection: Direction) => {
    if (isGameOver) return;
    
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

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

  // Mobile-first layout
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 p-3 w-full">
        {/* Header: Title + Stats + Start */}
        <div className="text-center">
          <h2 className="font-arcade text-xl text-primary mb-2">SKILLS GAME</h2>
          <div className="flex justify-center gap-4 font-mono text-xs">
            <span>Score: <span className="text-secondary">{score}</span></span>
            <span>Skills: <span className="text-secondary">{collectedSkills.length}</span></span>
          </div>
          {!isGameStarted && !isGameOver && (
            <button onClick={startGame} className="arcade-button px-5 py-2 font-arcade text-sm mt-3 text-white">
              START GAME
            </button>
          )}
        </div>

        {/* Game Board */}
        <div className="flex flex-col items-center justify-center">
          <div
            ref={gameAreaRef}
            className="snake-game mx-auto relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setTouchStart(null)}
            style={{
              width: `${GRID_SIZE * CELL_SIZE}px`,
              height: `${GRID_SIZE * CELL_SIZE}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
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
              <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
                <h3 className="font-arcade text-2xl text-primary mb-4 text-center">GAME OVER</h3>
                <button
                  onClick={resetGame}
                  className="arcade-button px-6 py-3 font-arcade text-sm text-white"
                >
                  PLAY AGAIN
                </button>
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
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto no-scrollbar">
              {collectedSkills.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground font-mono text-xs opacity-60">
                  None yet.
                </div>
              ) : (
                collectedSkills
                  .filter((skill, idx, self) => idx === self.findIndex((s) => s.name === skill.name))
                  .map((skill, index) => (
                    <div key={index} className="text-center p-2 bg-arcade-screen rounded border border-border" title={skill.name}>
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
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Header spanning both columns */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="text-center">
            <h2 className="font-arcade text-xl text-primary mb-2 text-center">SKILLS GAME</h2>
            <div className="flex justify-center gap-4 font-mono text-sm">
              <span>Score: <span className="text-secondary">{score}</span></span>
              <span>Skills: <span className="text-secondary">{collectedSkills.length}</span></span>
            </div>
            {!isGameStarted && !isGameOver && (
              <button onClick={startGame} className="arcade-button px-6 py-3 font-arcade text-sm mt-2 text-white">START GAME</button>
            )}
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div
            ref={gameAreaRef}
            className="snake-game mx-auto relative"
            style={{
              width: `${GRID_SIZE * CELL_SIZE}px`,
              height: `${GRID_SIZE * CELL_SIZE}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              gap: '1px',
              background: 'var(--card)',
              borderRadius: 8,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
              position: 'relative'
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
              <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
                <h3 className="font-arcade text-2xl text-primary mb-4 text-center">GAME OVER</h3>
                <button
                  onClick={resetGame}
                  className="arcade-button px-6 py-3 font-arcade text-sm text-white"
                >
                  PLAY AGAIN
                </button>
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

        {/* Skill Tree*/}
        <aside className="hidden lg:block">
          <div className="game-ui p-4 h-full" style={{ height: `${GRID_SIZE * CELL_SIZE}px` }}>
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

        <div className="lg:col-span-2 text-center font-mono text-xs text-muted-foreground">Use WASD or Arrow keys to move, SPACE to pause</div>
s
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Skill Info panel */}
          <div className="game-ui p-6 h-full">
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
          <div className="game-ui p-6 h-full">
            <h3 className="font-arcade text-lg text-primary mb-4 text-center">COLLECTED SKILLS</h3>
            <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto no-scrollbar">
              {collectedSkills.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground font-mono text-sm opacity-60">
                  No skills collected yet.
                </div>
              ) : (
                collectedSkills
                  .filter((skill, index, self) => index === self.findIndex((s) => s.name === skill.name))
                  .map((skill, index) => (
                    <div key={index} className="text-center p-3 bg-arcade-screen rounded border border-border" title={skill.name}>
                      <div className="text-xl">{skill.icon}</div>
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