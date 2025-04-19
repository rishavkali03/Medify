import React, { useState, useRef, useEffect } from 'react';
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollContainerRef = useRef(null); // NEW: scroll target

  useEffect(() => {
    const greeting = {
      sender: 'bot',
      text: "👋 Hi there! I'm your health assistant. Ask me anything—from symptoms to wellness tips!",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilePreview(file ? URL.createObjectURL(file) : null);
  };

  const toggleRecording = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onloadedmetadata = () => {
          setRecordingTime(Math.round(audio.duration));
          setRecordedAudio(audioUrl);
        };

        chunksRef.current = [];
      };

      mediaRecorder.start();

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      setRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      clearInterval(intervalRef.current);
      setRecording(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedFile && !recordedAudio) return;

    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    if (recordedAudio) {
      newMessage.audio = {
        url: recordedAudio,
        duration: recordingTime,
      };
    }

    setMessages((prev) => [...prev, newMessage]);

    const formData = new FormData();
    formData.append('sender', 'user');
    formData.append('timestamp', new Date().toISOString());
    if (inputMessage.trim()) formData.append('text', inputMessage.trim());
    if (selectedFile) formData.append('file', selectedFile);
    if (recordedAudio) {
      const blob = await fetch(recordedAudio).then((r) => r.blob());
      formData.append('audio', blob, 'recording.wav');
    }

    setInputMessage('');
    setSelectedFile(null);
    setFilePreview(null);
    setRecordedAudio(null);
    setRecordingTime(0);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with error:', errorText);
        throw new Error('Chat error');
      }

      const raw = await response.json();

      const botMessage = {
        sender: 'bot',
        text: raw.response_text,
        timestamp: raw.created_at,
      };

      if (raw.response_audio) {
        botMessage.audio = {
          url: raw.response_audio.startsWith('/')
            ? `${API_URL}${raw.response_audio}`
            : raw.response_audio,
          duration: 10,
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Message failed:', err);
      alert('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      if (audioRef.current.src !== audioUrl) {
        audioRef.current.src = audioUrl.startsWith('/uploads')
          ? `${API_URL}${audioUrl}`
          : audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-200 to-blue-200 h-screen">
      <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-2">
        <div className="flex-1 flex flex-col w-full rounded-3xl shadow-lg overflow-hidden bg-white">
          <div className="bg-white border-b border-gray-200 p-4 text-center">
            <h1 className="text-2xl font-bold text-blue-600">🧠Care Bot</h1>
            <p className="text-sm text-gray-500">Ask anything about your health & wellness</p>
          </div>

          {/* Chat messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
            ref={scrollContainerRef}
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 text-sm rounded-2xl font-medium leading-relaxed backdrop-blur ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-3xl shadow-md'
                        : 'bg-green-100 text-gray-800 rounded-bl-3xl shadow'
                    }`}
                  >
                    {msg.text && <p>{msg.text}</p>}

                    {msg.audio && (
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => playAudio(msg.audio.url)}
                          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                        >
                          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                        </button>
                        <div className="flex-1 bg-white/20 rounded-full h-2">
                          <div className="bg-white h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-xs opacity-75">{msg.audio.duration}s</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-green-100 text-gray-900 rounded-2xl p-3 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Section */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-inner">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <motion.button
                  type="button"
                  onClick={toggleRecording}
                  className={`p-2 rounded-full ${recording ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                  whileTap={{ scale: 0.95 }}
                >
                  {recording ? (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      <StopIcon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <MicrophoneIcon className="h-5 w-5" />
                  )}
                </motion.button>
              </div>

              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,audio/*,video/*"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                disabled={!inputMessage.trim() && !selectedFile && !recordedAudio}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </form>

            {recording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-red-500 text-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="h-2 w-2 bg-red-500 rounded-full"
                />
                Recording... {recordingTime}s
              </motion.div>
            )}

            {filePreview && (
              <div className="mt-2 relative inline-block">
                <img src={filePreview} alt="Preview" className="max-h-32 rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFilePreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            {recordedAudio && (
              <div className="mt-2 flex items-center gap-2">
                <audio controls src={recordedAudio} className="flex-1" />
                <button
                  type="button"
                  onClick={() => {
                    setRecordedAudio(null);
                    setRecordingTime(0);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Chatbot;
