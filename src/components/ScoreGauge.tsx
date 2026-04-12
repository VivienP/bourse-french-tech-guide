import React from 'react';

interface ScoreGaugeProps {
  score: number;
  max?: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, max = 5 }) => {
  const percentage = Math.min(score / max, 1);
  const isEligible = score >= 2.5;

  // Circle geometry
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage);

  // Color based on score
  const getColor = () => {
    if (score >= 3.5) return { stroke: 'hsl(142, 71%, 45%)', bg: 'hsl(142, 76%, 96%)', text: 'hsl(142, 71%, 35%)' };
    if (score >= 2.5) return { stroke: 'hsl(142, 50%, 50%)', bg: 'hsl(142, 50%, 96%)', text: 'hsl(142, 50%, 38%)' };
    if (score >= 1.5) return { stroke: 'hsl(38, 92%, 50%)', bg: 'hsl(38, 92%, 96%)', text: 'hsl(38, 92%, 40%)' };
    return { stroke: 'hsl(0, 72%, 51%)', bg: 'hsl(0, 72%, 96%)', text: 'hsl(0, 72%, 41%)' };
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          {/* Score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Score text centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: color.text }}>
            {score.toFixed(1)}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">/ {max}</span>
        </div>
      </div>

      {/* Badge */}
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color.stroke }}
        />
        {isEligible ? 'Éligible' : 'Non éligible en l\'état'}
      </span>
    </div>
  );
};

export default ScoreGauge;
