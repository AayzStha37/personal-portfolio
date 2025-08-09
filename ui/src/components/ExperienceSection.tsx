import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: 'GEM Lab, Dalhousie University',
    title: 'Application Developer',
    startDate: 'Oct 2022',
    endDate: 'Oct 2024',
    location: 'Halifax, Canada',
    description: 'Led backend development for accessible VR city simulation for visually impaired users, combining real-time data handling, spatial interaction logic, and research-driven design.',
    achievements: [
      'Engineered C# APIs for Unity VR client with AWS Lambda + S3 to serve dynamic game data in real time.',
      'Designed backend features enabling spatial audio and haptics, ensuring low-latency feedback for accessibility.',
      'Streamed interaction data via Kafka for robust telemetry and experimental logging.',
      'Co-authored CHI’25 research paper on accessible VR, backed by user evaluations with 20 participants.'
    ],
    technologies: ['C#', 'Unity', 'Virtual Reality', 'Python', 'AWS', 'Kafka', 'React', 'Figma']
  },
  {
    id: 2,
    company: 'AMDOCS Development Center',
    title: 'Software Developer',
    startDate: 'Jan 2021',
    endDate: 'Aug 2022',
    location: 'Gurgaon, India',
    description: 'Developed cloud-native microservices and DevOps pipelines using Java, Spring Boot, Docker/Kubernetes, and AWS to improve deployment and system performance.',
    achievements: [
      'Improved API performance by 40% through DTO projection and SonarQube-standardized repository design.',
      'Configured SSO login with Azure AD (SAML), reducing login-related support issues from 50+ to <15/month.',
      'Automated Jenkins CI/CD with Docker image versioning and AWS ECR/Kubernetes integration, halving build times.',
      'Promoted TDD with JUnit, achieving 85% coverage and reducing code smells from 200+ to under 50.'
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Jenkins']
  },
  {
    id: 3,
    company: 'AMDOCS Development Center',
    title: 'Software Engineering Associate',
    startDate: 'July 2019',
    endDate: 'Dec 2020',
    location: 'Gurgaon, India',
    description: 'Contributed to the development of enterprise-grade OSS microservices for Telstra, integrating Kafka and REST APIs with Spring Boot, while enhancing testing frameworks and security.',
    achievements: [
      'Built 20+ optimized microservice endpoints connecting Apache Kafka to REST APIs, reducing latency by 10ms.',
      'Created automated test frameworks with Cucumber, achieving 75% coverage and halving manual unit test time.',
      'Implemented Kubernetes Ingress-layer security integrated with Spring Security to block unauthorized controller access.',
      'Modernized TMF REST APIs by developing TMF 641 wrappers to support end-to-end order lifecycle orchestration.'
    ],
    technologies: ['Java', 'Spring Boot', 'Junits', 'MySQL', 'Cucumber', 'React','Kafka']
  }
];


const ExperienceSection = () => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const toggleStage = (stageId: number) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  // Mobile View
  if (isMobile) {
    return (
      <div className="p-3">
        <div className="text-center mb-6">
          <h2 className="font-arcade text-xl text-primary mb-2">CAREER MODE</h2>
          <p className="font-mono text-xs text-secondary">
            Professional quest stages
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="flex flex-row relative min-h-[90px] mb-6">
              {/* Timeline column */}
              <div className="relative flex flex-col items-center w-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-secondary rounded-full z-0"></div>
                {/* Stage number circle */}
                <div className="relative z-10 mt-6 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                  <span className="font-arcade text-xs text-primary-foreground">{experiences.length - idx}</span>
                </div>
              </div>
              {/* Experience card column */}
              <div className="flex-1 ml-2">
                <div className="bg-card rounded-lg border border-border shadow-md">
                  <button
                    className="w-full flex items-center justify-between p-4 focus:outline-none"
                    onClick={() => toggleStage(exp.id)}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="font-arcade text-xs text-primary mb-1">
                        {exp.title}
                      </span>
                      <span className="font-mono text-xs text-foreground font-semibold">
                        {exp.company}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {exp.startDate} - {exp.endDate} • {exp.location}
                      </span>
                    </div>
                    <span className="ml-2 text-secondary">
                      {expandedStage === exp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {expandedStage === exp.id && (
                    <div className="px-4 pb-4">
                      <p className="font-mono text-xs text-foreground mb-2 mt-2">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-secondary/20 text-secondary rounded text-[10px] font-mono border border-secondary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="bg-arcade-screen p-3 rounded border border-secondary/30 mt-2">
                        <h5 className="font-arcade text-xs text-secondary mb-2 flex items-center gap-2">
                          <span>🎯</span> OBJECTIVES
                        </h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="font-mono text-xs text-foreground">{ach}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Career Stats - Mobile */}
        <div className="mt-8 bg-card p-4 rounded-lg border border-border">
          <h4 className="font-arcade text-base text-primary mb-4 text-center">CAREER STATISTICS</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-xl font-arcade text-secondary mb-1">5+</div>
              <div className="font-mono text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-arcade text-secondary mb-1">25+</div>
              <div className="font-mono text-xs text-muted-foreground">REST APIs Engineered</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-arcade text-secondary mb-1">1384</div>
              <div className="font-mono text-xs text-muted-foreground">Coffee-Fueled Commits</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-arcade text-secondary mb-1">999+</div>
              <div className="font-mono text-xs text-muted-foreground">“Works on My Machine” Incidents</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-xl font-arcade text-secondary mb-1">15+</div>
              <div className="font-mono text-xs text-muted-foreground">Regretful Friday Deployments</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop View 
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="font-arcade text-2xl text-primary mb-4">CAREER MODE</h2>
        <p className="font-mono text-sm text-secondary">
          Journey through my professional quest stages
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-secondary rounded-full"></div>
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative mb-8 last:mb-0">
              <div className="absolute left-4 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10">
                <span className="font-arcade text-xs text-primary-foreground">{experiences.length - index}</span>
              </div>
              <div className="ml-20">
                <div className="bg-card p-6 rounded-lg border-2 border-border hover:border-secondary transition-all duration-300 cursor-pointer group" onClick={() => toggleStage(exp.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-primary" size={20} />
                        <h3 className="font-arcade text-sm text-primary">STAGE {experiences.length - index}: {exp.title}</h3>
                      </div>
                      <h4 className="font-arcade text-xs text-foreground font-semibold mb-2">{exp.company}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span className="font-mono">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span className="font-mono">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-secondary hover:text-primary transition-colors duration-200">
                      {expandedStage === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  <p className="font-mono text-sm text-foreground leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-mono border border-secondary/30">{tech}</span>
                    ))}
                  </div>
                </div>
                {expandedStage === exp.id && (
                  <div className="mt-4 bg-arcade-screen p-6 rounded-lg border border-secondary/30 animate-accordion-down">
                    <h5 className="font-arcade text-md text-secondary mb-4 flex items-center gap-2"><span>🎯</span> MISSION OBJECTIVES COMPLETED</h5>
                    <div className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-3 p-3 bg-card rounded border border-border/50 hover:border-secondary/50 transition-colors duration-200">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="font-arcade text-xs text-primary-foreground">✓</span>
                          </div>
                          <p className="font-mono text-sm text-foreground leading-relaxed">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-card p-6 rounded-lg border border-border">
          <h4 className="font-arcade text-lg text-primary mb-6 text-center">CAREER STATISTICS</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            <div className="text-center">
              <div className="text-3xl font-arcade text-secondary mb-2">5+</div>
              <div className="font-mono text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-arcade text-secondary mb-2">25+</div>
              <div className="font-mono text-sm text-muted-foreground">REST APIs Engineered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-arcade text-secondary mb-2">1384</div>
              <div className="font-mono text-sm text-muted-foreground">Coffee-Fueled Commits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-arcade text-secondary mb-2">999+</div>
              <div className="font-mono text-sm text-muted-foreground">“Works on My Machine” Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-arcade text-secondary mb-2">15+</div>
              <div className="font-mono text-sm text-muted-foreground">Regretful Friday Deployments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;