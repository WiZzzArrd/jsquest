interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

export default function PixelButton({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  disabled = false 
}: PixelButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return "bg-undertale-green text-black";
      case 'warning':
        return "bg-undertale-yellow text-black";
      case 'danger':
        return "bg-undertale-red text-white";
      case 'secondary':
        return "bg-undertale-panel text-white";
      default:
        return "bg-undertale-cyan text-black";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`pixel-button ${getVariantClasses()} px-4 py-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
