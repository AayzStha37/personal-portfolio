import { useIsMobile } from '@/hooks/use-mobile';

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

          {/* Character Stats */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-arcade text-sm text-primary mb-3 flex items-center gap-2">
              <span>⚡</span> CHARACTER STATS
            </h4>

            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">Experience</span>
                    <span className="font-mono text-[11px] text-secondary">5+ Years</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">Frontend</span>
                    <span className="font-mono text-[11px] text-secondary">Expert</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">Backend</span>
                    <span className="font-mono text-[11px] text-secondary">Advanced</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">Database</span>
                    <span className="font-mono text-[11px] text-secondary">Advanced</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">DevOps</span>
                    <span className="font-mono text-[11px] text-secondary">Intermediate</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] text-foreground">Problem Solving</span>
                    <span className="font-mono text-[11px] text-secondary">Expert</span>
                  </div>
                  <div className="w-full bg-arcade-screen rounded-full h-1.5 border border-secondary/30">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Interests */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-arcade text-sm text-primary mb-3 flex items-center gap-2">
              <span>🎮</span> SPECIAL ABILITIES
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                <div className="text-xl mb-1">🚀</div>
                <div className="font-mono text-[11px] text-foreground">Quick Learner</div>
              </div>
              <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                <div className="text-xl mb-1">🧩</div>
                <div className="font-mono text-[11px] text-foreground">Problem Solver</div>
              </div>
              <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                <div className="text-xl mb-1">👥</div>
                <div className="font-mono text-[11px] text-foreground">Team Player</div>
              </div>
              <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                <div className="text-xl mb-1">💡</div>
                <div className="font-mono text-[11px] text-foreground">Innovator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">      
        <div className="text-center mb-12">
          <h2 className="font-arcade text-2xl text-primary mb-4">PLAYER PROFILE</h2>
          <p className="font-mono text-sm text-secondary">
            Character stats and background story
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-arcade-console border-4 border-primary rounded-lg 
                           flex items-center justify-center relative overflow-hidden">
              <img 
                src="/retro_head_shot.png" 
                alt="A professional headshot" 
                className="w-full h-full object-cover" 
              />
              
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

          {/* Profile Info */}
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

            {/* Character Stats */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-arcade text-md text-primary mb-4 flex items-center gap-2">
                <span>⚡</span> CHARACTER STATS
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">Experience</span>
                      <span className="font-mono text-xs text-secondary">5+ Years</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">Frontend</span>
                      <span className="font-mono text-xs text-secondary">Expert</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">Backend</span>
                      <span className="font-mono text-xs text-secondary">Advanced</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">Database</span>
                      <span className="font-mono text-xs text-secondary">Advanced</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">DevOps</span>
                      <span className="font-mono text-xs text-secondary">Intermediate</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-foreground">Problem Solving</span>
                      <span className="font-mono text-xs text-secondary">Expert</span>
                    </div>
                    <div className="w-full bg-arcade-screen rounded-full h-2 border border-secondary/30">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Interests */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-arcade text-md text-primary mb-4 flex items-center gap-2">
                <span>🎮</span> SPECIAL ABILITIES
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-mono text-xs text-foreground">Quick Learner</div>
                </div>
                
                <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                  <div className="text-2xl mb-2">🧩</div>
                  <div className="font-mono text-xs text-foreground">Problem Solver</div>
                </div>
                
                <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-mono text-xs text-foreground">Team Player</div>
                </div>
                
                <div className="text-center p-3 bg-arcade-screen rounded border border-secondary/30">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="font-mono text-xs text-foreground">Innovator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default AboutSection;