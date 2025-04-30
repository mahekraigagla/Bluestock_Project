
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizes = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
  };

  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/8d2838d1-43d6-4fdd-81be-5d83e977e560.png" 
        alt="BlueStock Logo" 
        className={`${sizes[size]} mr-2`} 
      />
      <span className={`font-bold ${size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl'}`}>
        BLUESTOCK
      </span>
    </Link>
  );
};

export default Logo;
