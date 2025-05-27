
import { Link } from "react-router-dom";
import { 
  Shield, BarChart2, CreditCard, HelpCircle, Users, 
  Briefcase, Phone, FileText, Info, ArrowRight, 
  Mail, Twitter, Linkedin, Github, Facebook, ArrowUp,
  Lock, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        {/* Newsletter Section */}
        <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Stay updated with BlockFin</h3>
              <p className="text-muted-foreground">Get the latest news, updates and trading insights delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md border border-input bg-background w-full"
              />
              <Button className="whitespace-nowrap bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center text-white">
                <Lock className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">BlockFin</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Next-Generation Blockchain Financial Platform providing secure, efficient and innovative crypto solutions.
            </p>
            <div className="mt-4 flex space-x-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:info@blockfin.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/wallet" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Wallet className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/exchange" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Exchange
                </Link>
              </li>
              <li>
                <Link to="/assets" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Assets
                </Link>
              </li>
              <li>
                <Link to="/service-charges" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Service Charges
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <BarChart2 className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Briefcase className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contribution" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Users className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Contribution
                </Link>
              </li>
              <li>
                <Link to="/affiliation" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Info className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Affiliation
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Shield className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Security
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help-center" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <HelpCircle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Phone className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <CreditCard className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Payment Methods
                </Link>
              </li>
              <li>
                <a href="tel:+18001234567" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (800) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:support@blockfin.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@blockfin.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BlockFin. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="mt-4 md:mt-0 rounded-full"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
