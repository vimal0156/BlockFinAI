
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Code, Globe, Shield, Users, Brain, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      icon: Code
    },
    {
      title: "AI Research Scientist",
      department: "Research & Development",
      location: "New York",
      type: "Full-time",
      icon: Brain
    },
    {
      title: "Cybersecurity Analyst",
      department: "Security",
      location: "Remote",
      type: "Full-time",
      icon: Shield
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "London",
      type: "Full-time",
      icon: Globe
    },
    {
      title: "Customer Support Specialist",
      department: "Support",
      location: "Singapore",
      type: "Full-time",
      icon: Users
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      icon: Coffee
    }
  ];

  const departments = [
    { name: "Engineering", description: "Build and maintain our blockchain infrastructure and applications", icon: Code },
    { name: "Research & Development", description: "Explore cutting-edge solutions in AI, blockchain, and fintech", icon: Brain },
    { name: "Security", description: "Protect our platform and user assets with advanced security measures", icon: Shield },
    { name: "Marketing", description: "Drive growth through innovative marketing strategies", icon: Globe },
    { name: "Customer Support", description: "Provide exceptional assistance to our global user base", icon: Users },
    { name: "Design", description: "Create intuitive and engaging user experiences", icon: Coffee }
  ];

  const values = [
    { title: "Innovation", description: "We're pushing the boundaries of what's possible in blockchain technology" },
    { title: "Security", description: "We prioritize the protection of our users' assets and data above all else" },
    { title: "Transparency", description: "We operate with complete openness in all aspects of our business" },
    { title: "Inclusion", description: "We embrace diversity and value different perspectives and backgrounds" }
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Help us build the future of blockchain financial services through innovation and collaboration
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why BlockFin?</h2>
          <p className="text-muted-foreground mb-6">
            At BlockFin, we're at the forefront of blockchain technology and financial innovation. We're building a platform that empowers people worldwide to take control of their financial future in a secure, transparent, and efficient way.
          </p>
          <p className="text-muted-foreground mb-6">
            Our team consists of passionate individuals from diverse backgrounds, all united by a common goal: revolutionizing the financial landscape through blockchain technology and artificial intelligence.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-4" asChild>
            <Link to="#openings">View Open Positions</Link>
          </Button>
        </div>
        
        <div className="relative">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Team working at BlockFin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Office environment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                alt="Tech at BlockFin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="bg-primary/10 p-3 w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                  <dept.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{dept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dept.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div id="openings" className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="inline-flex mb-6">
            <TabsTrigger value="all">All Positions</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <job.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.department} · {job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Position</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="engineering">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.filter(job => job.department === "Engineering").map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <job.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.department} · {job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Position</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="research">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.filter(job => job.department === "Research & Development").map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <job.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.department} · {job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Position</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.filter(job => job.department !== "Engineering" && job.department !== "Research & Development").map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <job.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.department} · {job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Position</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-primary/5 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Don't see the right position?</h2>
          <p className="text-muted-foreground">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file.
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild className="mr-4">
            <a href="mailto:careers@blockfin.com">Send Your Resume</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
