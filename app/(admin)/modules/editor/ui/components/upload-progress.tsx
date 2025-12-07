"use client";

interface UploadProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export function UploadProgress({
  progress,
  size = 80,
  strokeWidth = 4,
}: UploadProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background circle (track) */}
      <svg
        className="absolute"
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      {/* Percentage text */}
      <span className="text-sm font-semibold text-white">
        {Math.round(progress)}%
      </span>
    </div>
  );
}
