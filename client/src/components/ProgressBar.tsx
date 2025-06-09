interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={`progress-bar w-32 ${className}`}>
      <div 
        className="progress-fill" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
