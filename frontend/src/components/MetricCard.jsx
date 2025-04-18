import { useState } from 'react';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';

const MetricCard = ({ title, value, unit, normal, icon: Icon, onEdit, color = 'blue' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const getColorClasses = () => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-500',
        border: 'border-blue-100',
        hover: 'hover:bg-blue-50',
        icon: 'text-blue-500',
        ring: 'focus:ring-blue-500'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-500',
        border: 'border-green-100',
        hover: 'hover:bg-green-50',
        icon: 'text-green-500',
        ring: 'focus:ring-green-500'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-500',
        border: 'border-purple-100',
        hover: 'hover:bg-purple-50',
        icon: 'text-purple-500',
        ring: 'focus:ring-purple-500'
      },
      orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-500',
        border: 'border-orange-100',
        hover: 'hover:bg-orange-50',
        icon: 'text-orange-500',
        ring: 'focus:ring-orange-500'
      }
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses();

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${colors.border}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`p-2 ${colors.bg} rounded-lg`}>
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`p-1 ${colors.hover} rounded-full transition-colors`}
        >
          {isEditing ? (
            <CheckIcon className={`h-5 w-5 ${colors.icon}`} />
          ) : (
            <PencilIcon className={`h-5 w-5 ${colors.icon}`} />
          )}
        </button>
      </div>

      <div className="mt-4">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full p-2 border ${colors.border} rounded-md ${colors.ring} focus:border-transparent outline-none`}
          />
        ) : (
          <div className="flex items-baseline">
            <span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
            <span className="ml-2 text-gray-600">{unit}</span>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">Normal range: {normal}</p>
      </div>
    </div>
  );
};

export default MetricCard; 