'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { ProgressRecord } from '@/lib/wordpress';

interface ProgressBadgeProps {
  progress: ProgressRecord | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ProgressBadge({ progress, size = 'md', showLabel = false }: ProgressBadgeProps) {
  const getProgressStatus = () => {
    if (!progress) return 'not-started';
    if (progress.quiz_completed && progress.quiz_score === progress.total_questions) {
      return 'completed'; // Perfect score = story completed
    }
    if (progress.story_read) {
      return 'in-progress'; // Story read but not perfect quiz
    }
    return 'not-started';
  };

  const status = getProgressStatus();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const iconSize = sizeClasses[size];

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: faCheckCircle,
          color: 'text-green-500',
          label: 'Completed',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/50'
        };
      case 'in-progress':
        return {
          icon: faBookOpen,
          color: 'text-yellow-500',
          label: 'In Progress',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/50'
        };
      default:
        return {
          icon: faCircle,
          color: 'text-gray-400',
          label: 'Not Started',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/50'
        };
    }
  };

  const config = getStatusConfig();

  if (showLabel) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor}`}>
        <FontAwesomeIcon 
          icon={config.icon} 
          className={`${config.color} ${iconSize}`}
        />
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
        {status === 'completed' && progress && (
          <span className="text-xs text-green-400 font-bold">
            {progress.quiz_score}/{progress.total_questions}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${config.bgColor} ${config.borderColor} border`}>
      <FontAwesomeIcon 
        icon={config.icon} 
        className={`${config.color} ${iconSize} ${status === 'in-progress' ? 'animate-pulse' : ''}`}
      />
    </div>
  );
}
