import { useState, useEffect } from 'react';
import {
  HeartIcon,
  ScaleIcon,
  MoonIcon,
  BeakerIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import MetricCard from '../components/MetricCard';
import HistoryChart from '../components/HistoryChart';
import PageHeader from '../components/PageHeader';
import ReadingModal from '../components/ReadingModal';

const initialMetrics = {
  heartRate: { value: 75, unit: 'bpm', normal: '60-100', color: 'blue' },
  bloodPressure: { value: '120/80', unit: 'mmHg', normal: '90/60-120/80', color: 'blue' },
  spo2: { value: 98, unit: '%', normal: '95-100', color: 'green' },
  weight: { value: 70, unit: 'kg', normal: '50-90', color: 'orange' },
  sleep: { value: 7.5, unit: 'hours', normal: '7-9', color: 'purple' },
  temperature: { value: 36.6, unit: '°C', normal: '36.1-37.2', color: 'orange' }
};

const demoHistoricalData = {
  heartRate: [
    { date: '2025-04-01', value: 75 },
    { date: '2025-04-02', value: 78 },
    { date: '2025-04-03', value: 80 },
    { date: '2025-04-04', value: 77 },
    { date: '2025-04-05', value: 75 },
    { date: '2025-04-06', value: 76 },
    { date: '2025-04-07', value: 79 },
  ],
  spo2: [
    { date: '2025-04-01', value: 98 },
    { date: '2025-04-02', value: 97 },
    { date: '2025-04-03', value: 98 },
    { date: '2025-04-04', value: 99 },
    { date: '2025-04-05', value: 98 },
    { date: '2025-04-06', value: 97 },
    { date: '2025-04-07', value: 98 },
  ],
  sleep: [
    { date: '2025-04-01', value: 8 },
    { date: '2025-04-02', value: 7.5 },
    { date: '2025-04-03', value: 7.5 },
    { date: '2025-04-04', value: 8 },
    { date: '2025-04-05', value: 7 },
    { date: '2025-04-06', value: 7.5 },
    { date: '2025-04-07', value: 8 },
  ],
  weight: [
    { date: '2025-04-01', value: 70 },
    { date: '2025-04-02', value: 70.2 },
    { date: '2025-04-03', value: 69.8 },
    { date: '2025-04-04', value: 70.1 },
    { date: '2025-04-05', value: 70 },
    { date: '2025-04-06', value: 70.3 },
    { date: '2025-04-07', value: 70.1 },
  ],
};

export default function HealthMetrics() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [historicalData, setHistoricalData] = useState(demoHistoricalData);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load historical data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthMetricsHistory');
    if (savedData) {
      setHistoricalData(JSON.parse(savedData));
    }
    const lastUpdateTime = localStorage.getItem('healthMetricsLastUpdate');
    if (lastUpdateTime) {
      setLastUpdate(new Date(lastUpdateTime));
    }
  }, []);

  // Save historical data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(historicalData).length > 0) {
      localStorage.setItem('healthMetricsHistory', JSON.stringify(historicalData));
    }
  }, [historicalData]);

  const handleSaveReadings = (newReadings) => {
    const currentDate = new Date();
    const dateKey = currentDate.toISOString().split('T')[0];

    // Update metrics and historical data for each reading
    Object.entries(newReadings).forEach(([metric, value]) => {
      if (value) {
        // Update current metrics
        setMetrics(prev => ({
          ...prev,
          [metric]: { ...prev[metric], value }
        }));

        // Update historical data
        setHistoricalData(prev => {
          const newHistory = { ...prev };
          if (!newHistory[metric]) {
            newHistory[metric] = [];
          }
          
          newHistory[metric].push({
            date: dateKey,
            value: parseFloat(value) || value,
            timestamp: currentDate.toISOString()
          });

          // Keep only last 30 days of data
          newHistory[metric] = newHistory[metric]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 30);

          return newHistory;
        });
      }
    });

    setLastUpdate(currentDate);
    localStorage.setItem('healthMetricsLastUpdate', currentDate.toISOString());
  };

  const getChartData = (metricKey, days = 7) => {
    if (!historicalData[metricKey]) return [];

    const data = historicalData[metricKey]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-days);

    return data.map(entry => ({
      day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
      value: entry.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-white via-blue-150 to-blue-300">
      <PageHeader
        title="Your Health Matrix"
        subtitle={`Track your vital health measurements ${lastUpdate ? `• Last updated ${new Date(lastUpdate).toLocaleString()}` : ''}`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Reading
        </button>
      </PageHeader>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Heart Rate"
          value={metrics.heartRate.value}
          unit={metrics.heartRate.unit}
          normal={metrics.heartRate.normal}
          icon={HeartIcon}
          color={metrics.heartRate.color}
          onEdit={(value) => handleSaveReadings({ heartRate: value })}
        />
        <MetricCard
          title="Blood Pressure"
          value={metrics.bloodPressure.value}
          unit={metrics.bloodPressure.unit}
          normal={metrics.bloodPressure.normal}
          icon={ChartBarIcon}
          color={metrics.bloodPressure.color}
          onEdit={(value) => handleSaveReadings({ bloodPressure: value })}
        />
        <MetricCard
          title="SpO2"
          value={metrics.spo2.value}
          unit={metrics.spo2.unit}
          normal={metrics.spo2.normal}
          icon={BeakerIcon}
          color={metrics.spo2.color}
          onEdit={(value) => handleSaveReadings({ spo2: value })}
        />
        <MetricCard
          title="Weight"
          value={metrics.weight.value}
          unit={metrics.weight.unit}
          normal={metrics.weight.normal}
          icon={ScaleIcon}
          color={metrics.weight.color}
          onEdit={(value) => handleSaveReadings({ weight: value })}
        />
        <MetricCard
          title="Sleep"
          value={metrics.sleep.value}
          unit={metrics.sleep.unit}
          normal={metrics.sleep.normal}
          icon={MoonIcon}
          color={metrics.sleep.color}
          onEdit={(value) => handleSaveReadings({ sleep: value })}
        />
        <MetricCard
          title="Temperature"
          value={metrics.temperature.value}
          unit={metrics.temperature.unit}
          normal={metrics.temperature.normal}
          icon={ArrowTrendingUpIcon}
          color={metrics.temperature.color}
          onEdit={(value) => handleSaveReadings({ temperature: value })}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <HistoryChart
          title="Weekly Heart Rate Trends"
          data={getChartData('heartRate')}
          dataKey="value"
          unit="bpm"
          color="#3B82F6"
          type="area"
        />
        <HistoryChart
          title="SpO2 Levels"
          data={getChartData('spo2')}
          dataKey="value"
          unit="%"
          color="#10B981"
          type="area"
        />
        <HistoryChart
          title="Sleep Hours"
          data={getChartData('sleep')}
          dataKey="value"
          unit="hrs"
          color="#8B5CF6"
        />
        <HistoryChart
          title="Weight Tracking"
          data={getChartData('weight')}
          dataKey="value"
          unit="kg"
          color="#F59E0B"
        />
      </div>

      {/* Health Insights */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800">Heart Health</h4>
            <p className="mt-1 text-blue-600">
              {metrics.heartRate.value >= 60 && metrics.heartRate.value <= 100
                ? "Your heart rate is within normal ranges."
                : "Your heart rate needs attention."}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800">Sleep Pattern</h4>
            <p className="mt-1 text-purple-600">
              {metrics.sleep.value >= 7 && metrics.sleep.value <= 9
                ? "You're getting adequate sleep. Keep it up!"
                : "Try to get 7-9 hours of sleep for optimal health."}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800">Oxygen Levels</h4>
            <p className="mt-1 text-green-600">
              {metrics.spo2.value >= 95
                ? "Your SpO2 levels are excellent."
                : "Your oxygen levels need attention."}
            </p>
          </div>
        </div>
      </div>

      <ReadingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReadings}
      />
    </div>
  );
}
