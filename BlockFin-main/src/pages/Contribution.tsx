
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, GitBranch, Users, MessageSquare, Star, Box, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Contribution = () => {
  const technologies = [
    { name: "React", description: "Frontend development", icon: Code },
    { name: "TypeScript", description: "Type-safe JavaScript", icon: Code },
    { name: "Solidity", description: "Smart contract development", icon: Code },
    { name: "Rust", description: "Blockchain core development", icon: Code },
    { name: "Python", description: "AI and data analysis", icon: Code },
    { name: "PostgreSQL", description: "Database solutions", icon: Box }
  ];

  const contributors = [
    { name: "Alex Johnson", role: "Core Developer", contributions: 324, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=1" },
    { name: "Sophia Chen", role: "UX Designer", contributions: 178, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=2" },
    { name: "Marcus Kim", role: "Smart Contract Engineer", contributions: 256, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=3" },
    { name: "Olivia Parker", role: "Security Researcher", contributions: 143, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=4" }
  ];

  const projects = [
    { name: "BlockFin Core", description: "Main blockchain infrastructure", stars: 1243, forks: 340, issues: 45 },
    { name: "BlockFin UI", description: "React component library", stars: 876, forks: 235, issues: 32 },
    { name: "Smart Contract Library", description: "Solidity contract templates", stars: 654, forks: 178, issues: 23 },
    { name: "AI Trading Agents", description: "Machine learning models for trading", stars: 432, forks: 115, issues: 18 }
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Open Source Contribution</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Join our community of developers building the future of blockchain financial services
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Contribute?</h2>
          <p className="text-muted-foreground mb-4">
            BlockFin is built on the principles of open collaboration and transparency. We believe that by working together with the community, we can create better, more robust solutions for the blockchain financial ecosystem.
          </p>
          <p className="text-muted-foreground mb-4">
            Our open source projects are used by thousands of developers and organizations worldwide, and your contributions can help shape the future of blockchain technology.
          </p>
          <p className="text-muted-foreground mb-6">
            Whether you're an experienced blockchain developer or just starting your journey, there are many ways to get involved and make a meaningful impact.
          </p>
          <div className="flex space-x-4 mb-8">
            <Button asChild>
              <a href="https://github.com/blockfin" target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub Repository
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Contact Team
              </Link>
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-6">Technologies We Use</h2>
          <div className="grid grid-cols-2 gap-4">
            {technologies.map((tech, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <tech.icon className="h-5 w-5 mr-2 text-primary" />
                    {tech.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {project.stars}
                  </div>
                  <div className="flex items-center">
                    <GitBranch className="h-4 w-4 mr-1" />
                    {project.forks}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {project.issues}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Project</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How to Contribute</h2>
        
        <Tabs defaultValue="code" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="code">Code Contributions</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="community">Community Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Contributing Code</CardTitle>
                <CardDescription>
                  Follow these steps to contribute code to BlockFin projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal pl-5">
                  <li>
                    <div className="font-medium">Fork the Repository</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start by forking the repository you want to contribute to on GitHub.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Clone Your Fork</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <code className="bg-muted px-1 py-0.5 rounded">git clone https://github.com/yourusername/repo.git</code>
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Create a Branch</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <code className="bg-muted px-1 py-0.5 rounded">git checkout -b feature/your-feature-name</code>
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Make Your Changes</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implement your feature or bug fix following our coding standards.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Run Tests</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <code className="bg-muted px-1 py-0.5 rounded">npm run test</code>
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Submit a Pull Request</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Push your changes and create a pull request on GitHub.
                    </p>
                  </li>
                </ol>
                <div className="mt-6">
                  <Button asChild>
                    <a href="https://github.com/blockfin" target="_blank" rel="noopener noreferrer">
                      <GitBranch className="mr-2 h-4 w-4" />
                      Browse Issues
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Documentation Contributions</CardTitle>
                <CardDescription>
                  Help improve our documentation for developers and users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Good documentation is crucial for any open source project. You can help by:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Fixing typos and grammar issues
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Clarifying existing documentation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Adding examples and use cases
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Translating documentation to other languages
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Creating tutorials and guides
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <a href="https://docs.blockfin.com" target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      View Documentation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Help grow and support the BlockFin community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  There are many ways to contribute beyond code and documentation:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Answering questions on our community forums
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Helping new users get started with BlockFin
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Reporting bugs and suggesting features
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Organizing or speaking at community events
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Creating educational content like blog posts or videos
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button asChild>
                    <a href="https://discord.gg/blockfin" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join Discord
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://forum.blockfin.com" target="_blank" rel="noopener noreferrer">
                      <Users className="mr-2 h-4 w-4" />
                      Community Forum
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img 
                    src={contributor.avatar} 
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{contributor.name}</CardTitle>
                <CardDescription>{contributor.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  {contributor.contributions} contributions
                </div>
                <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Contributing?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join our growing community of contributors and help shape the future of blockchain finance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <a href="https://github.com/blockfin" target="_blank" rel="noopener noreferrer">
              <GitBranch className="mr-2 h-4 w-4" />
              Explore GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://docs.blockfin.com/contributing" target="_blank" rel="noopener noreferrer">
              Contribution Guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
