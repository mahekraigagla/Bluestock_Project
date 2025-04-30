
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizes = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  return (
    <Link to="/" className="flex items-center">
      <span className={`font-bold ${sizes[size]}`}>
        BLUESTOCK
      </span>
    </Link>
  );
};

export default Logo;
