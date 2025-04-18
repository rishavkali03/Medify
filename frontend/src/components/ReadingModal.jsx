import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ReadingModal = ({ isOpen, onClose, onSave }) => {
  const [readings, setReadings] = useState({
    heartRate: '',
    bloodPressure: '',
    spo2: '',
    weight: '',
    sleep: '',
    temperature: ''
  });

  const handleChange = (metric, value) => {
    setReadings(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(readings);
    setReadings({
      heartRate: '',
      bloodPressure: '',
      spo2: '',
      weight: '',
      sleep: '',
      temperature: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Add New Readings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
              <input
                type="number"
                value={readings.heartRate}
                onChange={(e) => handleChange('heartRate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="60-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg)</label>
              <input
                type="text"
                value={readings.bloodPressure}
                onChange={(e) => handleChange('bloodPressure', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SpO2 (%)</label>
              <input
                type="number"
                value={readings.spo2}
                onChange={(e) => handleChange('spo2', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="95-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={readings.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="50-90"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sleep (hours)</label>
              <input
                type="number"
                value={readings.sleep}
                onChange={(e) => handleChange('sleep', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="7-9"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input
                type="number"
                value={readings.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="36.1-37.2"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Readings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadingModal; 