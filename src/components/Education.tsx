import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Award, BookOpen, Code } from "lucide-react";

const Education = () => {
  const education = [
    {
      id: "degree",
      title: "Formal Education",
      icon: GraduationCap,
      items: [
        {
          degree: "Master of Science in Computer Science",
          school: "Stanford University",
          period: "2017 - 2019",
          location: "Stanford, CA",
          gpa: "3.8/4.0",
          description: "Specialized in Machine Learning and Software Engineering. Thesis on 'Optimizing Neural Networks for Edge Computing'.",
          coursework: ["Advanced Algorithms", "Machine Learning", "Distributed Systems", "Computer Graphics", "Database Systems"]
        },
        {
          degree: "Bachelor of Science in Software Engineering",
          school: "University of California, Berkeley",
          period: "2013 - 2017",
          location: "Berkeley, CA",
          gpa: "3.7/4.0",
          description: "Graduated Summa Cum Laude. Strong foundation in software development, data structures, and system design.",
          coursework: ["Data Structures", "Software Architecture", "Web Development", "Mobile Computing", "Computer Networks"]
        }
      ]
    },
    {
      id: "certifications",
      title: "Certifications",
      icon: Award,
      items: [
        {
          name: "AWS Solutions Architect Professional",
          issuer: "Amazon Web Services",
          issued: "2023",
          expires: "2026",
          credential: "AWS-SAP-2023-001234",
          description: "Advanced certification demonstrating expertise in designing distributed systems and applications on AWS.",
          skills: ["Cloud Architecture", "Security", "Cost Optimization", "Migration Strategies"]
        },
        {
          name: "Google Cloud Professional Developer",
          issuer: "Google Cloud",
          issued: "2022",
          expires: "2025",
          credential: "GCP-PD-2022-567890",
          description: "Professional-level certification for developing scalable applications on Google Cloud Platform.",
          skills: ["Kubernetes", "Microservices", "CI/CD", "Monitoring"]
        },
        {
          name: "Certified Kubernetes Administrator",
          issuer: "Cloud Native Computing Foundation",
          issued: "2022",
          expires: "2025",
          credential: "CKA-2022-ABCD1234",
          description: "Demonstrates skills in managing Kubernetes clusters and containerized applications.",
          skills: ["Container Orchestration", "Cluster Management", "Troubleshooting", "Security"]
        }
      ]
    },
    {
      id: "courses",
      title: "Online Learning",
      icon: BookOpen,
      items: [
        {
          name: "Advanced React Patterns",
          platform: "Frontend Masters",
          completed: "2023",
          instructor: "Kent C. Dodds",
          description: "Deep dive into advanced React patterns, performance optimization, and modern development practices.",
          topics: ["Hooks", "Context", "Performance", "Testing", "TypeScript"]
        },
        {
          name: "System Design Interview Course",
          platform: "Educative",
          completed: "2023",
          instructor: "System Design Experts",
          description: "Comprehensive course covering system design principles for large-scale applications.",
          topics: ["Scalability", "Load Balancing", "Databases", "Caching", "Microservices"]
        },
        {
          name: "Machine Learning Specialization",
          platform: "Coursera",
          completed: "2022",
          instructor: "Andrew Ng",
          description: "Complete specialization covering machine learning algorithms and their applications.",
          topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning"]
        }
      ]
    },
    {
      id: "skills",
      title: "Technical Skills",
      icon: Code,
      items: [
        {
          category: "Frontend Development",
          skills: [
            { name: "React/Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Vue.js", level: 85 },
            { name: "CSS/SASS", level: 90 },
            { name: "Tailwind CSS", level: 95 }
          ]
        },
        {
          category: "Backend Development",
          skills: [
            { name: "Node.js", level: 90 },
            { name: "Python", level: 85 },
            { name: "Java", level: 80 },
            { name: "PostgreSQL", level: 85 },
            { name: "MongoDB", level: 80 }
          ]
        },
        {
          category: "Cloud & DevOps",
          skills: [
            { name: "AWS", level: 90 },
            { name: "Docker", level: 85 },
            { name: "Kubernetes", level: 80 },
            { name: "CI/CD", level: 85 },
            { name: "Terraform", level: 75 }
          ]
        }
      ]
    }
  ];

  return (
    <section id="education" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Education & Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development throughout my career.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="degree" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-card/50 border border-border">
              {education.map((section) => (
                <TabsTrigger 
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {education.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8">
                {section.id === "skills" ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {section.items.map((skillGroup, index) => (
                      <Card key={index} className="bg-gradient-card border-border/50 glow-purple">
                        <CardHeader>
                          <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {skillGroup.skills.map((skill, skillIndex) => (
                            <div key={skillIndex}>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-gradient-primary h-2 rounded-full glow-purple" 
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {section.items.map((item, index) => (
                      <Card key={index} className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <CardContent className="p-8">
                          {section.id === "degree" ? (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.degree}</h3>
                                  <p className="text-lg font-medium mb-2">{item.school}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>{item.period}</span>
                                    <span>•</span>
                                    <span>{item.location}</span>
                                    <span>•</span>
                                    <span>GPA: {item.gpa}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Relevant Coursework:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.coursework.map((course) => (
                                    <Badge key={course} variant="secondary" className="bg-primary/20 text-primary">
                                      {course}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : section.id === "certifications" ? (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
                                  <p className="text-lg font-medium mb-2">{item.issuer}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>Issued: {item.issued}</span>
                                    <span>•</span>
                                    <span>Expires: {item.expires}</span>
                                    <span>•</span>
                                    <span>ID: {item.credential}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Key Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
                                  <p className="text-lg font-medium mb-2">{item.platform}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>Completed: {item.completed}</span>
                                    <span>•</span>
                                    <span>Instructor: {item.instructor}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Topics Covered:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.topics.map((topic) => (
                                    <Badge key={topic} variant="secondary" className="bg-primary/20 text-primary">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Education;