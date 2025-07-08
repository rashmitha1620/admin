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
      container: compact ? 'w-7 h-3.5' : 'w-8 h-4',
      toggle: compact ? 'w-2.5 h-2.5' : 'w-3 h-3',
      translate: compact ? 'translate-x-3.5' : 'translate-x-4'
    },
    medium: {
      container: compact ? 'w-8 h-4.5' : 'w-12 h-6',
      toggle: compact ? 'w-3.5 h-3.5' : 'w-5 h-5',
      translate: compact ? 'translate-x-3.5' : 'translate-x-6'
    },
    large: {
      container: compact ? 'w-10 h-5' : 'w-14 h-7',
      toggle: compact ? 'w-4 h-4' : 'w-6 h-6',
      translate: compact ? 'translate-x-5' : 'translate-x-7'
    }
  };

  const currentSize = sizeClasses[size];

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!enabled);
    }
  };

  return (
    <div className={`flex items-center toggle-switch-container ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`toggle-switch-label ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 cursor-pointer whitespace-nowrap`}
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
          toggle-switch-compact relative inline-flex items-center ${currentSize.container} rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1
          ${enabled 
            ? 'bg-emerald-600 hover:bg-emerald-700' 
            : 'bg-gray-300 hover:bg-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-pressed={enabled}
        aria-label={label || 'Toggle switch'}
      >
        <span
          className={`
            toggle-thumb ${currentSize.toggle} bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ml-0.5
            ${enabled ? `${currentSize.translate} enabled` : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;