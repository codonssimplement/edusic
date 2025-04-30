
interface CircularProgressProps {
  value: number; // percentage from 0-100
}

export const CircularProgress = ({ value }: CircularProgressProps) => {
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#333"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#1DB954" // eduGreen
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-white font-bold text-xl">
        {value}%
      </div>
    </div>
  );
};
