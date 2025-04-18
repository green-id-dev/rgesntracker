import React from 'react';

type ButtonProps =
  | {
      href: string;
      onClick?: never;
      className?: string;
      children: React.ReactNode;
    }
  | {
      href?: never;
      onClick: () => void;
      className?: string;
      children: React.ReactNode;
    };

const Button: React.FC<ButtonProps> = ({ href, onClick, className, children }) => {
  const baseStyle = "flex text-black font-bold p-4 px-8 rounded-xl";
  const defaultStyle = "bg-[#90D8B2] hover:bg-[#00BF7D]";
  const combinedClass = `${baseStyle} ${defaultStyle} ${className || ''}`;

  return (
    <div className="mx-auto w-full flex justify-center">
      {href ? (
        <a href={href} className={combinedClass} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={combinedClass} type="button">
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;