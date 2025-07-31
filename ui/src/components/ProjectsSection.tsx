import { ExternalLink, Github } from 'lucide-react';
import { useSound } from './SoundManager';

const projects = [
  {
    rank: 1,
    name: '[PROJECT_1_TITLE]',
    year: '[PROJECT_1_YEAR]',
    description: '[PROJECT_1_DESCRIPTION]',
    liveUrl: '[PROJECT_1_LIVE_URL]',
    codeUrl: '[PROJECT_1_CODE_URL]',
    technologies: ['[TECH_1]', '[TECH_2]', '[TECH_3]']
  },
  {
    rank: 2,
    name: '[PROJECT_2_TITLE]',
    year: '[PROJECT_2_YEAR]',
    description: '[PROJECT_2_DESCRIPTION]',
    liveUrl: '[PROJECT_2_LIVE_URL]',
    codeUrl: '[PROJECT_2_CODE_URL]',
    technologies: ['[TECH_1]', '[TECH_2]', '[TECH_3]']
  },
  {
    rank: 3,
    name: '[PROJECT_3_TITLE]',
    year: '[PROJECT_3_YEAR]',
    description: '[PROJECT_3_DESCRIPTION]',
    liveUrl: '[PROJECT_3_LIVE_URL]',
    codeUrl: '[PROJECT_3_CODE_URL]',
    technologies: ['[TECH_1]', '[TECH_2]', '[TECH_3]']
  },
  {
    rank: 4,
    name: '[PROJECT_4_TITLE]',
    year: '[PROJECT_4_YEAR]',
    description: '[PROJECT_4_DESCRIPTION]',
    liveUrl: '[PROJECT_4_LIVE_URL]',
    codeUrl: '[PROJECT_4_CODE_URL]',
    technologies: ['[TECH_1]', '[TECH_2]', '[TECH_3]']
  },
  {
    rank: 5,
    name: '[PROJECT_5_TITLE]',
    year: '[PROJECT_5_YEAR]',
    description: '[PROJECT_5_DESCRIPTION]',
    liveUrl: '[PROJECT_5_LIVE_URL]',
    codeUrl: '[PROJECT_5_CODE_URL]',
    technologies: ['[TECH_1]', '[TECH_2]', '[TECH_3]']
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
          <div className="col-span-1 font-arcade text-xs text-primary">RANK</div>
          <div className="col-span-4 font-arcade text-xs text-primary">PROJECT NAME</div>
          <div className="col-span-2 font-arcade text-xs text-primary">YEAR</div>
          <div className="col-span-3 font-arcade text-xs text-primary">TECHNOLOGIES</div>
          <div className="col-span-2 font-arcade text-xs text-primary">LINKS</div>
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
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="col-span-2 flex items-center">
              <span className="font-mono text-sm text-secondary font-semibold">
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
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick('live')}
                className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground 
                           rounded text-xs font-arcade hover:bg-primary/80 transition-colors duration-200
                           border border-primary hover:shadow-md hover:shadow-primary/30"
                title="View Live Site"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">LIVE</span>
              </a>
              
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick('code')}
                className="flex items-center gap-1 px-3 py-2 bg-secondary text-secondary-foreground 
                           rounded text-xs font-arcade hover:bg-secondary/80 transition-colors duration-200
                           border border-secondary hover:shadow-md hover:shadow-secondary/30"
                title="View Source Code"
              >
                <Github size={12} />
                <span className="hidden sm:inline">CODE</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="font-mono text-sm text-muted-foreground">
          More projects available on my GitHub profile
        </p>
      </div>
    </div>
  );
};

export default ProjectsSection;