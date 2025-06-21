import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicrophoneIcon,
  XMarkIcon,
  CommandLineIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { useHotkeys } from 'react-hotkeys-hook';

// Simple string similarity function (Levenshtein distance)
const similarity = (s1, s2) => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
};

const commandAliases = {
  // Navigation
  '/chatbot': ['chatbot', 'chat bot', 'open chatbot', 'go to chatbot'],
  '/': ['home', 'go home', 'go to home', 'main page', 'dashboard'],
  '/quick-checkup': ['quick checkup', 'check up', 'checkup', 'go to quick checkup', 'disease prediction'],
  '/appointments': ['appointments', 'my appointments', 'show appointments', 'go to appointments'],
  '/health-metrics': ['health metrics', 'metrics', 'my health', 'go to health metrics'],
  '/emergency': ['emergency', 'emergency page', 'go to emergency', 'help'],
  '/profile': ['profile', 'my profile', 'user profile', 'go to profile'],

  // Chat Actions
  'action:send_message': ['send message', 'send', 'send it'],
  'action:clear_chat': ['clear chat', 'reset chat', 'new chat'],

  // Auth Actions
  'action:sign_out': ['sign out', 'log out', 'logout'],
};

const VoiceCommand = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [commands, setCommands] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(true);
  
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const toggleVoiceControl = () => {
    setIsEnabled(prev => !prev);
  };

  const toggleSpeech = () => {
    setIsSpeaking(prev => !prev);
  };
  
  const processCommand = useCallback((text) => {
    const cleanedText = text.toLowerCase().trim();
    setCommands(prev => [...prev, { text: cleanedText, timestamp: new Date() }]);

    let response = '';
    let bestMatch = null;
    let highestSimilarity = 0;

    for (const action in commandAliases) {
      const aliases = commandAliases[action];
      for (const alias of aliases) {
        // Using `includes` for partial matches, e.g., "go to chatbot please"
        if (cleanedText.includes(alias)) {
          const sim = similarity(cleanedText, alias);
          if (sim > highestSimilarity) {
            highestSimilarity = sim;
            bestMatch = action;
          }
        }
      }
    }

    if (bestMatch && highestSimilarity > 0.5) { // Confidence threshold
      if (bestMatch.startsWith('/')) {
        navigate(bestMatch);
        const pageName = bestMatch.replace('/', '') || 'home';
        response = `Navigating to ${pageName}.`;
      } else if (bestMatch.startsWith('action:')) {
        const actionName = bestMatch.split(':')[1];
        
        switch (actionName) {
          case 'send_message':
          case 'clear_chat': {
            const event = new CustomEvent('voice-command-chat', { detail: { action: actionName, text: cleanedText } });
            window.dispatchEvent(event);
            response = `Action acknowledged: ${actionName.replace('_', ' ')}.`;
            break;
          }
          case 'sign_out':
            // Assuming sign out is handled in Sidebar or a context
            // A bit of a hack, but effective for a global action
            document.getElementById('sign-out-button')?.click();
            response = 'Signing you out.';
            break;
          default:
            response = "I understood the action but don't know how to perform it.";
        }
      }
    } else if (cleanedText.includes('send') || cleanedText.startsWith('i have')) {
        const event = new CustomEvent('voice-command-chat', { detail: { action: 'send_text', text: cleanedText } });
        window.dispatchEvent(event);
        response = `Sending "${cleanedText}" to the chatbot.`;
    } else {
      response = "Sorry, I didn't understand that command.";
    }
    
    setFeedback(response);
  }, [navigate]);

  const startListening = useCallback(() => {
    if (isListening || !window.webkitSpeechRecognition) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onresult = (event) => {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(newTranscript);
      processCommand(newTranscript);
    };
    
    recognition.start();
    recognitionRef.current = recognition;
  }, [isListening, processCommand]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
      if (isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(feedback);
        window.speechSynthesis.speak(utterance);
      }
      const timer = setTimeout(() => setShowFeedback(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback, isSpeaking]);

  useHotkeys('ctrl+m', () => {
    toggleVoiceControl();
    if (!isEnabled) startListening();
  }, [isEnabled, startListening]);

  return (
    <>
      {/* Voice Control Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVoiceControl}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isEnabled 
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white ring-4 ring-blue-200' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
          }`}
        >
          <AnimatePresence mode="wait">
            {isEnabled ? (
              <motion.div
                key="enabled"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MicrophoneIcon className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="disabled"
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <MicrophoneIcon className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse animation when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500 opacity-20"
              animate={{ scale: [1, 1.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Ripple effect when enabled */}
          {isEnabled && !isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400 opacity-30"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Speech Toggle Button */}
      {isEnabled && (
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0, y: 20, opacity: 0 }}
          className="fixed bottom-8 right-24 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSpeech}
            className={`p-3 rounded-full shadow-2xl transition-all duration-300 ${
              isSpeaking 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white ring-4 ring-green-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300'
            }`}
          >
            {isSpeaking ? (
              <SpeakerWaveIcon className="h-5 w-5" />
            ) : (
              <SpeakerXMarkIcon className="h-5 w-5" />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Voice Control Panel */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-40 backdrop-blur-sm bg-white/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-3">
                  <CommandLineIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Voice Control</h3>
                  <p className="text-xs text-gray-500">AI-powered navigation</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startListening}
                  disabled={isListening}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-100 text-red-600 shadow-lg' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md'
                  }`}
                >
                  <MicrophoneIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopListening}
                  disabled={!isListening}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    !isListening 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-md'
                  }`}
                >
                  <XMarkIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-2xl">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                isListening ? 'bg-red-500 animate-pulse shadow-lg' : 'bg-gray-400'
              }`} />
              <span className="text-sm font-medium text-gray-700">
                {isListening ? 'Listening...' : 'Ready to listen'}
              </span>
              {isListening && (
                <motion.div
                  className="ml-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </motion.div>
              )}
            </div>

            {/* Transcript */}
            {transcript && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
              >
                <p className="text-sm font-semibold text-blue-800 mb-1">You said:</p>
                <p className="text-sm text-blue-700 italic">"{transcript}"</p>
              </motion.div>
            )}

            {/* Commands History */}
            {commands.length > 0 && (
              <div className="max-h-32 overflow-y-auto mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Recent Commands:</p>
                <div className="space-y-1">
                  {commands.slice(-3).map((cmd, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <span className="text-blue-500 font-bold">→</span> {cmd.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide">Try saying:</p>
              <div className="space-y-1">
                <p className="text-xs text-blue-700">🎯 "go to chatbot"</p>
                <p className="text-xs text-blue-700">🏥 "I have fever"</p>
                <p className="text-xs text-blue-700">📤 "send message"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Toast */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 max-w-sm backdrop-blur-sm bg-white/95"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceCommand;
