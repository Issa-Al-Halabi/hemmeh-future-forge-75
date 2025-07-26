import logo from '@/assets/logo.png';

interface LoadingLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingLogo = ({ size = 'md' }: LoadingLogoProps) => {
  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-48 w-48'
  };

  return (
    <div className="flex items-center justify-center">
      <img
        src={logo}
        alt="Hemmeh Logo"
        className={`${sizeClasses[size]} animate-pulse hover:scale-105 transition-transform duration-300`}
      />
    </div>
  );
};