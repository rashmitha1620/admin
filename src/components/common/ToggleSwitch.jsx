import React from 'react';

const ToggleSwitch = ({ 
  enabled = false, 
  onChange, 
  disabled = false, 
  size = 'medium',
  label,
  id,
  compact = false
}) => {
  const sizeClasses = {
    small: {
      container: 'w-8 h-4',
      toggle: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    medium: {
      container: 'w-12 h-6',
      toggle: 'w-5 h-5',
      translate: 'translate-x-6'
    },
    large: {
      container: 'w-14 h-7',
      toggle: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };

  // Adjust sizes for compact mode
  const compactSizeClasses = {
    small: {
      container: 'w-7 h-3.5',
      toggle: 'w-2.5 h-2.5',
      translate: 'translate-x-3.5'
    },
    medium: {
      container: 'w-10 h-5',
      toggle: 'w-4 h-4',
      translate: 'translate-x-5'
    },
    large: {
      container: 'w-12 h-6',
      toggle: 'w-5 h-5',
      translate: 'translate-x-6'
    }
  };

  const currentSize = compact ? compactSizeClasses[size] : sizeClasses[size];

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!enabled);
    }
  };

  return (
    <div className={`flex items-center ${compact ? 'space-x-1.5' : 'space-x-2'}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 cursor-pointer`}
        >
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center ${currentSize.container} rounded-full transition-all duration-300 ease-in-out focus:outline-none ${compact ? 'focus:ring-1 focus:ring-emerald-500 focus:ring-offset-1' : 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'}
          ${enabled 
            ? 'bg-emerald-600 hover:bg-emerald-700' 
            : 'bg-gray-300 hover:bg-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${compact ? 'toggle-switch-compact' : 'toggle-switch'}
        `}
        aria-pressed={enabled}
        aria-label={label || 'Toggle switch'}
      >
        <span
          className={`
            ${currentSize.toggle} bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${compact ? 'ml-0.5' : 'ml-0.5'}
            ${enabled ? currentSize.translate : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;