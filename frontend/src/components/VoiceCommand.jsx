import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VoiceCommand = ({ onCall }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setTranscript(transcript);
          handleVoiceCommand(transcript);
        };

        recognitionInstance.onerror = (event) => {
          setError('Error occurred in recognition: ' + event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      } else {
        setError('Speech recognition is not supported in this browser.');
      }
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const emergencyServices = {
      'ambulance': '102',
      'police': '100',
      'fire': '101',
      'doctor': '108',
      'pharmacy': '104',
      'oxygen': '107'
    };

    for (const [service, number] of Object.entries(emergencyServices)) {
      if (command.includes(service)) {
        onCall(number);
        return;
      }
    }
  };

  const startListening = () => {
    if (recognition) {
      setError(null);
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Voice Command</h3>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-full ${
              isListening 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            } transition-colors`}
          >
            {isListening ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <MicrophoneIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {transcript && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700">You said: "{transcript}"</p>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Available Commands:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>"Call ambulance"</li>
            <li>"Call police"</li>
            <li>"Call fire department"</li>
            <li>"Call doctor"</li>
            <li>"Call pharmacy"</li>
            <li>"Call oxygen supplier"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommand;
