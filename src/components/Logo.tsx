interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 32 }: LogoProps) => {
  return (
    <img
      src="/agreegenius-logo.png"
      alt="AgreeGenius Logo"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
