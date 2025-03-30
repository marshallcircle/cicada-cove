import Link from 'next/link';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showText?: boolean;
};

export default function Logo({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  href = '/',
  showText = true
}: LogoProps) {
  // Set size dimensions based on size prop
  const dimensions = {
    sm: { width: 32, height: 32, textClass: 'text-lg' },
    md: { width: 40, height: 40, textClass: 'text-xl' },
    lg: { width: 48, height: 48, textClass: 'text-2xl' },
  };

  const { width, height, textClass } = dimensions[size];
  
  // Determine text color based on variant
  const textColor = variant === 'white' ? 'text-white' : 'text-black';
  
  const logoSrc = variant === 'white' 
    ? '/images/logo-white.svg' 
    : '/images/logo.svg';

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Image 
          src={logoSrc} 
          alt="Cicada Cove" 
          width={width} 
          height={height} 
          className="object-contain"
        />
      </div>
      {showText && (
        <div className={`ml-2 font-serif ${textClass} ${textColor} font-bold tracking-tight`}>
          Cicada Cove
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}