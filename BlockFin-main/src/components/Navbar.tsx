
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, LogOut, Shield, BarChart2, Wallet, 
  ArrowLeftRight, Coins, FileText, CreditCard, 
  Home, Lock, HelpCircle, Phone, Briefcase,
  Moon, Sun, MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // This would typically come from your auth context
  const isAuthenticated = false;
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You would implement actual dark mode toggling here
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home, protected: false },
    { path: "/dashboard", label: "Dashboard", icon: BarChart2, protected: true },
    { path: "/wallet", label: "Wallet", icon: Wallet, protected: true },
    { path: "/exchange", label: "Exchange", icon: ArrowLeftRight, protected: true },
    { path: "/assets", label: "Assets", icon: Coins, protected: true },
    { path: "/transactions", label: "Transactions", icon: FileText, protected: true },
    { path: "/payment", label: "Payment", icon: CreditCard, protected: true },
    { path: "/security", label: "Security", icon: Shield, protected: true },
    { path: "/analytics", label: "Analytics", icon: BarChart2, protected: true },
  ];

  const supportItems = [
    { path: "/help-center", label: "Help Center", icon: HelpCircle, protected: false },
    { path: "/contact", label: "Contact Us", icon: Phone, protected: false },
    { path: "/careers", label: "Careers", icon: Briefcase, protected: false },
    { path: "/service-charges", label: "Service Charges", icon: FileText, protected: false },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/");
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled ? "shadow-md py-2" : "py-3",
        {
          "bg-background/95": !scrolled,
          "bg-background/80": scrolled
        }
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8 flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <Lock className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-primary transition-all">BlockFin</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
              {navItems.map((item) => (
                (!item.protected || isAuthenticated) && (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        location.pathname === item.path 
                          ? "bg-accent/50 text-primary" 
                          : "bg-background text-foreground"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4 mr-2", 
                        location.pathname === item.path 
                          ? "text-primary"
                          : "group-hover:text-primary"
                      )} />
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/social-messaging">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              aria-label="Messages"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">3</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="hidden sm:flex"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="group">
                <HelpCircle className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">Support</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-in fade-in-80">
              {supportItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild className="hover:bg-accent cursor-pointer">
                  <Link to={item.path} className="flex items-center">
                    <item.icon className="w-4 h-4 mr-2 text-primary" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0 border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-in fade-in-80 w-56">
                <DropdownMenuItem asChild className="hover:bg-accent cursor-pointer">
                  <Link to="/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-primary" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4 text-primary" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex hover:bg-primary hover:text-white transition-colors">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
