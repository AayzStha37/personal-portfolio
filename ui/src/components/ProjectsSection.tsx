import { ExternalLink, Github } from 'lucide-react';
import { useSound } from './SoundManager';

const projects = [
  {
    rank: 1,
    name: 'VR Accessibility Game',
    year: '2024',
    description: 'A Unity-based VR simulation designed for visually impaired users, enabling spatial audio & haptics-guided city navigation. ',
    liveUrl: 'linkk',
    codeUrl: 'https://github.com/AayzStha37/Outdoor-VR-Navigation-Game-',
    technologies: ['C#', 'Unity', 'Python', 'C++', 'AWS', 'Kafka', 'React', 'Figma']
  },
  {
    rank: 2,
    name: 'Smart NFC Bracelet',
    year: '2023',
    description: 'An IoT-based NFC payment and tracking system designed for smart shopping experiences.',
    codeUrl: 'https://github.com/AayzStha37/SmartNFCBracelet-Based-Shopping',
    technologies: ['Java', 'Android Studio', 'Python', 'HTML', 'CSS']
  },
  {
    rank: 3,
    name: 'Personal Portfolio',
    year: '2025',
    description: 'A dynamic developer portfolio built with React and TypeScript',
    liveUrl: 'linkk',
    codeUrl: 'https://github.com/AayzStha37/personal-portfolio',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite','Java', 'Spring Boot']
  },
  {
    rank: 3,
    name: 'Tic-tac-toe Game',
    year: '2023',
    description: 'A classic Tic-Tac-Toe game developed in Unity with C#, supporting Android deployment. ',
    liveUrl: '',
    codeUrl: 'https://github.com/AayzStha37/TicTacToe',
    technologies: ['C#', 'Unity','Android Studio']
  },
  {
    rank: 4,
    name: 'NeuralVision: AI Image Classifier',
    year: '2019',
    description: 'A lightweight AI image classifier app using pre-trained neural networks.',
    liveUrl: '',
    codeUrl: 'https://github.com/AayzStha37/NeuralVision',
    technologies: ['Java', 'Android Studio', 'Python','Figma']
  },
  {
    rank: 5,
    name: 'Spamshield: SMS Filter App',
    year: '2018',
    description: 'An Android app that detects and filters spam SMS using a Naive Bayes classifier hosted on a Flask server.',
    liveUrl: '',
    codeUrl: 'https://github.com/AayzStha37/SpamShield',
    technologies: ['Java', 'Android Studio', 'Python','Figma']
  }
];


const ProjectsSection = () => {
  const { playSound } = useSound();

  const handleLinkClick = (type: 'live' | 'code') => {
    playSound('menu-confirm');
  };

  return (
    <div className="crt-screen p-6">
      <div className="text-center mb-8">
        <h2 className="font-arcade text-2xl text-primary mb-4">HIGH SCORES</h2>
        <p className="font-mono text-sm text-secondary">
          My best projects ranked by impact and technical complexity
        </p>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-arcade-console rounded-lg border-2 border-primary">
          <div className="col-span-1 font-arcade text-xs text-primary text-center">RANK</div>
          <div className="col-span-4 font-arcade text-xs text-primary text-center">PROJECT NAME</div>
          <div className="col-span-2 font-arcade text-xs text-primary text-center">YEAR</div>
          <div className="col-span-3 font-arcade text-xs text-primary text-center">TECHNOLOGIES</div>
          <div className="col-span-2 font-arcade text-xs text-primary text-center">LINKS</div>
        </div>

        {/* Projects */}
        {projects.map((project) => (
          <div 
            key={project.rank}
            className="grid grid-cols-12 gap-4 p-4 bg-card rounded-lg border border-border 
                 hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 
                 transition-all duration-300 group"
          >
            <div className="col-span-1 flex items-center">
              <span className="font-arcade text-lg text-primary">#{project.rank}</span>
            </div>
            
            <div className="col-span-4 flex flex-col justify-center">
              <h3 className="font-arcade text-sm text-foreground mb-1">
              {project.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed text-justify">
              {project.description}
              </p>
            </div>
            
            <div className="col-span-2 flex items-right justify-center">
              <span className="font-arcade text-xs text-secondary font-normal">
          {project.year}
              </span>
            </div>
            
            <div className="col-span-3 flex flex-col justify-center">
              <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-mono border border-secondary/30"
            >
              {tech}
            </span>
          ))}
              </div>
            </div>
            
            <div className="col-span-2 flex items-center gap-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick('live')}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-2 sm:px-3 bg-primary text-primary-foreground 
                   rounded text-xs font-arcade hover:bg-primary/80 transition-colors duration-200
                   border border-primary hover:shadow-md hover:shadow-primary/30 min-w-0"
              title="View Live Site"
            >
              <ExternalLink size={12} />
              <span className="hidden sm:inline">LIVE</span>
            </a>
          )}
          
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('code')}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 sm:px-3 bg-secondary text-secondary-foreground 
                 rounded text-xs font-arcade hover:bg-secondary/80 transition-colors duration-200
                 border border-secondary hover:shadow-md hover:shadow-secondary/30 min-w-0"
            title="View Source Code"
          >
            <Github size={12} />
            <span className="hidden sm:inline">CODE</span>
          </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="font-mono text-sm text-muted-foreground flex items-center justify-center gap-2">
          More projects available on my&nbsp;
          <a
            href="https://github.com/AayzStha37"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
            title="Visit my GitHub profile"
          >
            GitHub
            <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectsSection;