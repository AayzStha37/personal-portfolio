import { useState, useEffect, useCallback, useRef } from 'react';
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
  }, [direction, food, isGameOver, isPaused, currentSkill, generateFood, playSound]);

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

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Skills List */}
      <div className="lg:w-64">
        <div className="game-ui p-4">
          <h3 className="font-arcade text-lg text-primary mb-4 text-center">SKILL TREE</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
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

      {/* Game Board */}
      <div className="flex-1">
        <div className="text-center mb-4">
          <h2 className="font-arcade text-xl text-primary mb-2 text-center">SKILLS GAME</h2>
          <div className="flex justify-center gap-4 font-mono text-sm">
            <span>Score: <span className="text-secondary">{score}</span></span>
            <span>Skills: <span className="text-secondary">{collectedSkills.length}</span></span>
          </div>
          {!isGameStarted && !isGameOver && (
            <button
              onClick={startGame}
              className="arcade-button px-6 py-3 font-arcade text-sm mt-2 text-white"
            >
              START GAME
            </button>
          )}
        </div>

        <div 
          ref={gameAreaRef}
          className="snake-game mx-auto relative"
          style={{
            width: `${GRID_SIZE * 20}px`,
            height: `${GRID_SIZE * 20}px`,
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '1px'
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

        {/* Controls */}
        <div className="text-center mt-4 font-mono text-xs text-muted-foreground">
          {isMobile ? 'Use the D-pad controls' : 'Use WASD or Arrow keys to move, SPACE to pause'}
        </div>

        {/* Mobile Controls */}
        {isMobile && (
          <div className="mobile-controls">
            <div></div>
            <button className="mobile-btn" onClick={() => handleMobileControl('UP')}>
              ↑
            </button>
            <div></div>
            <button className="mobile-btn" onClick={() => handleMobileControl('LEFT')}>
              ←
            </button>
            <button className="mobile-btn" onClick={() => setIsPaused(!isPaused)}>
              ⏸
            </button>
            <button className="mobile-btn" onClick={() => handleMobileControl('RIGHT')}>
              →
            </button>
            <div></div>
            <button className="mobile-btn" onClick={() => handleMobileControl('DOWN')}>
              ↓
            </button>
            <div></div>
          </div>
        )}
      </div>

      {/* Skill Info Panel */}
      <div className="lg:w-80">
        <div className="game-ui p-6">
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

          {collectedSkills.length > 0 && (
            <div className="mt-6">
              <h4 className="font-arcade text-sm text-primary mb-3">COLLECTED SKILLS</h4>
              <div className="grid grid-cols-4 gap-2">
                {collectedSkills
  .filter(
    (skill, index, self) =>
      index === self.findIndex((s) => s.name === skill.name)
  )
  .map((skill, index) => (
    <div 
      key={index}
      className="text-center p-2 bg-arcade-screen rounded border border-border"
      title={skill.name}
    >
      <div className="text-lg">{skill.icon}</div>
      <div className="font-mono text-xs text-muted-foreground truncate">
        {skill.name}
      </div>
    </div>
))}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;