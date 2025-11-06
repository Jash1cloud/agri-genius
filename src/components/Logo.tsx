interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 32 }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular background */}
      <circle cx="100" cy="100" r="95" fill="hsl(142, 70%, 45%)" />
      
      {/* Wheat stalks */}
      <g>
        {/* Left stalk */}
        <path
          d="M70 140 L70 80"
          stroke="hsl(43, 80%, 90%)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="65" cy="85" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="75" cy="90" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="65" cy="95" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="75" cy="100" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="65" cy="105" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="75" cy="110" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        
        {/* Center stalk */}
        <path
          d="M100 145 L100 70"
          stroke="hsl(43, 80%, 90%)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="95" cy="75" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="105" cy="80" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="95" cy="85" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="105" cy="90" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="95" cy="95" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="105" cy="100" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="95" cy="105" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="105" cy="110" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        
        {/* Right stalk */}
        <path
          d="M130 140 L130 80"
          stroke="hsl(43, 80%, 90%)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="125" cy="85" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="135" cy="90" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="125" cy="95" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="135" cy="100" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="125" cy="105" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
        <ellipse cx="135" cy="110" rx="6" ry="3" fill="hsl(43, 80%, 70%)" />
      </g>
      
      {/* Leaf accents */}
      <path
        d="M60 120 Q50 115 55 105"
        stroke="hsl(120, 60%, 40%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M140 120 Q150 115 145 105"
        stroke="hsl(120, 60%, 40%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
