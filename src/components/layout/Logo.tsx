import React from 'react';
import Link from 'next/link';

export interface LogoProps {
  width?: number;
  height?: number;
  linkToHome?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  width = 300,
  height = 100,
  linkToHome = true,
  className = '',
}) => {
  // Container with black background
  const containerClasses = `relative flex items-center justify-center bg-black p-4 rounded ${className}`;
  
  // High quality SVG logo
  const logoComponent = (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 100" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto"
    >
      <rect width="300" height="100" fill="#000000"/>
      <text x="150" y="46" fontFamily="Arial" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        CICADA COVE
      </text>
      <text x="150" y="74" fontFamily="Arial" fontSize="16" textAnchor="middle" fill="#ffffff">
        VINTAGE DESIGNER MENSWEAR
      </text>
    </svg>
  );

  if (linkToHome) {
    return (
      <Link href="/" aria-label="Cicada Cove - Home">
        <div className={containerClasses}>
          {logoComponent}
        </div>
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {logoComponent}
    </div>
  );
};