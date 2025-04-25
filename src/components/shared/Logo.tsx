
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
      <div className="relative flex items-center">
        <svg className={`${sizes[size]} text-bluestock-600`} viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 4L18 12L10 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 4L33 12L25 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M40 4L48 12L40 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={`ml-2 font-bold ${size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl'}`}>
          BLUESTOCK
        </span>
      </div>
    </Link>
  );
};

export default Logo;
