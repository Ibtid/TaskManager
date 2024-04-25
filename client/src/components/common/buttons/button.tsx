import { FC } from "react";

interface IButtonProps {
    onClick?: () => void;
    label: string;
    iconSrc: string;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    hoverBgColor?: string;
    className?: string;
    inlineIconSize?: string;
    lgInline?: boolean;
    smMarginRight?: boolean;
  }
  
  const Button: FC<IButtonProps> = ({
    onClick,
    label,
    iconSrc,
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    borderColor = 'border-white',
    hoverBgColor = 'hover:bg-blue-700',
    className = '',
    inlineIconSize = 'h-5 w-5',
    lgInline = false,
    smMarginRight = false,
  }) => {
    
    const marginRight = smMarginRight ? 'lg:mr-4' : 'sm:mr-0';
    const inlineDisplay = lgInline ? 'lg:inline' : 'hidden lg:inline';
  
    return (
      <button
        onClick={onClick}
        className={`${bgColor} ${textColor} font-semibold border-2 ${borderColor} py-2 px-2 sm:px-3 rounded cursor-pointer transition duration-300 ease-in-out ${hoverBgColor} ${className} flex items-center text-sm`}
      >
        <img
          src={iconSrc}
          alt={label}
          className={`inline ${inlineIconSize} ${marginRight}`}
        />
        <div className={inlineDisplay}>{label}</div>
      </button>
    );
  };
  
  export default Button;