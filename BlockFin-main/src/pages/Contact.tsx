
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Reach out to our team for any questions, feedback, or assistance with your BlockFin account
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button className="w-full md:w-auto">Submit Message</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-muted-foreground">
            You can reach us through the following channels or visit our office during business hours.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-muted-foreground">+1 (800) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Fri: 9am-5pm EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">support@blockfin.com</p>
                <p className="text-sm text-muted-foreground mt-1">We aim to respond within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Office Location</h3>
                <p className="text-muted-foreground">123 Blockchain Avenue</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-muted-foreground">Available 24/7 for premium users</p>
                <Button className="mt-2" variant="outline" size="sm">Start Chat</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How can I recover my password?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can reset your password by clicking on the "Forgot Password" link on the login page. We'll send you recovery instructions via email.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What are the transaction fees?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transaction fees vary by transaction type and amount. Please visit our <Link to="/service-charges" className="text-primary hover:underline">Service Charges</Link> page for detailed information.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is my data secure with BlockFin?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we implement industry-leading security measures to protect your data and assets. Learn more on our <Link to="/security" className="text-primary hover:underline">Security</Link> page.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I join your affiliate program?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can register for our affiliate program on the <Link to="/affiliation" className="text-primary hover:underline">Affiliation</Link> page. Start earning commissions by referring new users to BlockFin.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild>
            <Link to="/help-center">Visit Help Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
