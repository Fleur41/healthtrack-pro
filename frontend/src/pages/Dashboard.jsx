import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const AI_RESPONSES = [
  {
    type: 'greeting',
    messages: [
      "Hello! How can I assist you with your fitness goals today?",
      "Welcome back! What would you like to discuss about your fitness journey?",
    ]
  },
  {
    type: 'motivation',
    messages: [
      "Keep pushing! Every step counts towards your goals. 💪",
      "You're doing great! Consistency is key to success. 🌟",
    ]
  },
  {
    type: 'tip',
    messages: [
      "Remember to stay hydrated during your workouts! 💧",
      "Don't forget to warm up before exercising! 🔥",
    ]
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activePrograms: 0,
    pendingTasks: 0
  });
  const [paginatedStats, setPaginatedStats] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10, // Match the pagination in Clients page
    totalItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to HealthTrack Pro! I'm your virtual fitness assistant. How can I help you today?", 
      sender: "system", 
      timestamp: new Date(),
      avatar: "🤖"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await api.clients.getAll();
        const programs = await api.programs.getAll();

        const totalPages = Math.ceil(clients.length / paginatedStats.itemsPerPage);

        setStats({
          totalClients: clients.length,
          activePrograms: programs.length,
          pendingTasks: clients.length > 0 ? Math.floor(clients.length * 0.3) : 0 // Example calculation
        });

        setPaginatedStats(prev => ({
          ...prev,
          totalPages,
          totalItems: clients.length
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSmartResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes('goal') || message.includes('plan')) {
      return AI_RESPONSES.find(r => r.type === 'greeting').messages;
    } else if (message.includes('tired') || message.includes('give up')) {
      return AI_RESPONSES.find(r => r.type === 'motivation').messages;
    }
    return AI_RESPONSES.find(r => r.type === 'tip').messages;
  };

  const simulateResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = getSmartResponse(userMessage);
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomResponse,
        sender: "system",
        timestamp: new Date(),
        avatar: "🤖"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      avatar: "👤"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    simulateResponse(inputMessage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-primary-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards - Left Side */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <Link to="/clients" className="block">
                <div className="stat-card bg-primary-50 hover:bg-primary-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-600 text-sm font-medium">Total Clients</p>
                      <p className="text-2xl font-bold text-primary-700">
                        {stats.totalClients}
                        <span className="text-sm text-primary-500 ml-2">
                          / {paginatedStats.itemsPerPage} per page
                        </span>
                      </p>
                    </div>
                    <div className="text-primary-500">👥</div>
                  </div>
                  <div className="mt-2 text-sm text-primary-600">
                    {paginatedStats.totalPages} total pages
                  </div>
                </div>
              </Link>

              <Link to="/programs" className="block">
                <div className="stat-card bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Active Programs</p>
                      <p className="text-2xl font-bold text-green-700">{stats.activePrograms}</p>
                    </div>
                    <div className="text-green-500">📊</div>
                  </div>
                </div>
              </Link>

              <div className="stat-card bg-yellow-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Pending Tasks</p>
                    <p className="text-2xl font-bold text-yellow-700">{stats.pendingTasks}</p>
                  </div>
                  <div className="text-yellow-500">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section - Right Side */}
        <div className="lg:col-span-2">
          <div className="chat-container bg-white rounded-xl shadow-card">
            <div className="chat-header border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-semibold text-gray-800">
                  AI Fitness Assistant
                </h2>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">Online</span>
            </div>

            <div className="chat-messages p-4 space-y-4 h-[400px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`chat-message ${
                    message.sender === 'user' ? 'chat-message-user' : 'chat-message-system'
                  }`}>
                    <div className="flex items-start gap-2 max-w-md">
                      <span className="text-2xl">{message.avatar}</span>
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-message chat-message-system">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      <div className="typing-indicator">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about fitness..."
                  className="input flex-1"
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary px-6"
                  disabled={isTyping || !inputMessage.trim()}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;