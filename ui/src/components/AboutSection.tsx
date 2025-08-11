import { useIsMobile } from '@/hooks/use-mobile';
import TechScroller, { TechItem as ScrollerItem } from './TechScroller';
// no React hooks needed here besides useIsMobile

type Category =
  | 'Programming Languages'
  | 'Databases'
  | 'CI/CD & Cloud'
  | 'Frameworks'
  | 'Frontend'
  | 'Build Tools'
  | 'Misc';

type TechItem = { src: string; label: string; category: Category };

const CATEGORY_ORDER: Category[] = [
  'Programming Languages',
  'Databases',
  'CI/CD & Cloud',
  'Frameworks',
  'Frontend',
  'Build Tools'
];

const TECH_ITEMS: TechItem[] = [
  // Programming Languages
  { src: '/tech_icons/java.png', label: 'Java', category: 'Programming Languages' },
  { src: '/tech_icons/python.png', label: 'Python', category: 'Programming Languages' },
  { src: '/tech_icons/js.png', label: 'JavaScript', category: 'Programming Languages' },
  { src: '/tech_icons/c_sharp.png', label: 'C#', category: 'Programming Languages' },
  { src: '/tech_icons/c++.png', label: 'C++', category: 'Programming Languages' },  
  { src: '/tech_icons/sql.png', label: 'SQL', category: 'Programming Languages' },
  
  // Frameworks
  { src: '/tech_icons/spring.png', label: 'Spring', category: 'Frameworks' },
  { src: '/tech_icons/cucumber.png', label: 'Cucumber', category: 'Frameworks' },
  { src: '/tech_icons/git.png', label: 'Git', category: 'Frameworks' },
  { src: '/tech_icons/kafka.png', label: 'Kafka', category: 'Frameworks' },

  // Frontend
  { src: '/tech_icons/react.png', label: 'React', category: 'Frontend' },
  { src: '/tech_icons/css.png', label: 'CSS', category: 'Frontend' },
  { src: '/tech_icons/html.png', label: 'HTML', category: 'Frontend' },


  // Databases
  { src: '/tech_icons/mysql.png', label: 'MySQL', category: 'Databases' },
  { src: '/tech_icons/postgres.png', label: 'PostgreSQL', category: 'Databases' },

  // CI/CD & Cloud
  { src: '/tech_icons/jenkins.png', label: 'Jenkins', category: 'CI/CD & Cloud' },
  { src: '/tech_icons/aws.png', label: 'AWS', category: 'CI/CD & Cloud' },
  { src: '/tech_icons/docker.png', label: 'Docker', category: 'CI/CD & Cloud' },
  { src: '/tech_icons/k8s.png', label: 'Kubernetes', category: 'CI/CD & Cloud' },
  { src: '/tech_icons/sonar.png', label: 'SonarQube', category: 'CI/CD & Cloud' },

  
  // Build Tools
  { src: '/tech_icons/maven.png', label: 'Maven', category: 'Build Tools' },
  { src: '/tech_icons/gradle.png', label: 'Gradle', category: 'Build Tools' },

  
];

// Achievements shown under Character Stats (mobile & desktop)
const ACHIEVEMENTS: { icon: string; title: string; description: string }[] = [
  {
    icon: '🧭',
    title: 'XP Level',
    description: '5+ Years of coding adventures and system building.'
  },
  {
    icon: '🔋',
    title: 'Energy',
    description: 'Thrives under high-pressure deadlines while maintaining quality.'
  },
  {
    icon: '🏆',
    title: 'Boss Battle Wins',
    description: 'Overcame critical production issues and project roadblocks.'
  },
  {
    icon: '🧩',
    title: 'Refactor Mastery',
    description: 'Transforms legacy code into efficient, scalable systems.'
  },
  {
    icon: '🤝',
    title: 'Multiplayer Skills',
    description: 'Strong collaborator across cross-functional teams.'
  },
  {
    icon: '🚀',
    title: 'Learning Agility',
    description: 'Quickly adapts to new tools, frameworks, and challenges.'
  }
];

// map local type to scroller’s item type for props safety
const toScrollerItems = (items: TechItem[]): ScrollerItem[] =>
  items.map((i) => ({ ...i }));

const AboutSection = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="px-3 pt-3 pb-6 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="font-arcade text-xl text-primary mb-2">PLAYER PROFILE</h2>
          <p className="font-mono text-xs text-secondary">Character stats and background story</p>
        </div>

        <div className="max-w-md mx-auto grid grid-cols-1 gap-5">
          {/* Avatar Section */}
          <div className="text-center space-y-3">
            <div className="w-32 h-32 mx-auto bg-arcade-console border-2 border-primary rounded-lg flex items-center justify-center relative overflow-hidden">
              <img src="/retro_head_shot.png" alt="A professional headshot" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-arcade text-base text-foreground">AAYUSH SHRESTHA</h3>
              <p className="font-arcade text-[11px] text-secondary">Software Developer</p>
              <p className="font-arcade text-[11px] text-muted-foreground">Canada</p>
              <div className="mt-2 font-mono text-[11px] text-secondary animate-pulse">Available for opportunities<span className="animate-blink">...</span></div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-arcade text-sm text-primary mb-2 flex items-center gap-2">
              <span>📋</span> MISSION BRIEFING
            </h4>
            <p className="font-mono text-xs text-foreground leading-relaxed">
              Experienced Software Developer with 5+ years building scalable backend systems, microservices, and RESTful APIs using Java & Python. Skilled with Kafka, Docker/Kubernetes, AWS and SQL databases. Strong foundation in Agile, TDD and CI/CD.
            </p>
          </div>

          {/* Special Abilities (moved above Character Stats) */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-arcade text-sm text-primary mb-3 flex items-center gap-2">
              <span>🎮</span> SPECIAL ABILITIES
            </h4>
            <TechScroller
              items={toScrollerItems(TECH_ITEMS)}
              sortMode="input"
              tile="sm"
              scrollStep={260}
            />
          </div>

          {/* Character Stats (moved below Special Abilities) */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-arcade text-sm text-primary mb-3 flex items-center gap-2">
              <span>⚡</span> CHARACTER STATS
            </h4>
            {/* Achievements: arcade-style badges instead of progress bars */}
            <ul className="grid grid-cols-1 gap-3">
              {ACHIEVEMENTS.map((a) => (
                <li key={a.title} className="flex items-start gap-3 bg-arcade-console/40 border border-border rounded-md p-3">
                  <div className="text-lg leading-none select-none">{a.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-arcade text-[11px] text-primary tracking-wide">{a.title.toUpperCase()}</span>
                      </div>
                    <p className="font-mono text-[11px] text-foreground mt-1 leading-relaxed">{a.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div className="px-5 pt-6 pb-10 animate-fade-in">
      <div className="text-center mb-12">
          <h2 className="font-arcade text-2xl text-primary mb-4">PLAYER PROFILE</h2>
          <p className="font-mono text-sm text-secondary">
            Character stats and background story
          </p>
        </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <div className="text-center space-y-4">
          <div className="w-48 h-48 mx-auto bg-arcade-console border-4 border-primary rounded-lg flex items-center justify-center relative overflow-hidden">
            <img src="/retro_head_shot.png" alt="A professional headshot" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
          <div className="space-y-2">
            <h3 className="font-arcade text-lg text-foreground">AAYUSH SHRESTHA</h3>
            <p className="font-arcade text-xs text-secondary">Software Developer</p>
            <p className="font-arcade text-xs text-muted-foreground">Canada</p>
            <div className="mt-3 font-mono text-xs text-secondary animate-pulse">
              Available for opportunities<span className="animate-blink">...</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          {/* Professional Summary */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h4 className="font-arcade text-md text-primary mb-4 flex items-center gap-2">
              <span>📋</span> MISSION BRIEFING
            </h4>
            <p className="font-mono text-sm text-foreground leading-relaxed">
              Experienced Software Developer with 5+ years of expertise in building scalable backend systems, microservices, and RESTful APIs using Java (Spring Boot) and Python. Skilled in Apache Kafka for high-performance messaging, containerization with Docker/Kubernetes, and AWS cloud deployment. Proficient in SQL databases (PostgreSQL, MySQL) with a strong foundation in Agile methodologies, TDD, and CI/CD automation.
            </p>
          </div>

          {/* Special Abilities (moved above Character Stats) */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h4 className="font-arcade text-md text-primary mb-4 flex items-center gap-2">
              <span>🎮</span> SPECIAL ABILITIES
            </h4>
            <TechScroller
              items={toScrollerItems(TECH_ITEMS)}
              sortMode="input"
              tile="md"
              scrollStep={330}
            />
          </div>

          {/* Character Stats */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h4 className="font-arcade text-md text-primary mb-4 flex items-center gap-2">
              <span>⚡</span> CHARACTER STATS
            </h4>
            {/* Achievements: arcade-style badges instead of progress bars */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((a) => (
                <li key={a.title} className="flex items-start gap-3 bg-arcade-console/40 border border-border rounded-md p-4">
                  <div className="text-xl leading-none select-none">{a.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-arcade text-[12px] text-primary tracking-wide">{a.title.toUpperCase()}</span>
                    </div>
                    <p className="font-mono text-xs text-foreground mt-1 leading-relaxed">{a.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;