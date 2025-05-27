
import React from 'react';

// A simpler, more reliable animated background without Three.js
const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
      
      {/* Animated stars using CSS */}
      <div className="stars-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
              opacity: Math.random() * 0.8 + 0.2,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '2s' }}></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-1/3 right-1/5 w-12 h-12 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float-reverse"></div>
      
      <style>{`
        .stars-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-reverse {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
