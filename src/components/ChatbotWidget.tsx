import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Place2 assistant. I can help you discover places, activities, and plan your trips. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! For more detailed assistance and access to our AI experts, click "Open Full Chatbot" below. I can help with quick questions here too!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleOpenFullChatbot = () => {
    navigate('/chatbot');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#DB6551] to-[#E6896B] text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#DB6551] rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-[#E6896B]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#DB6551] to-[#E6896B] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Place2 Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-[#E6896B]/5">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-[#DB6551] text-white rounded-br-md'
                      : 'bg-white text-[#E6896B] border-2 border-[#E6896B]/20 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm font-medium">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-[#E6896B]/70'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Full Chatbot Button */}
          <div className="p-3 border-t-2 border-[#E6896B]/20 bg-white">
            <button
              onClick={handleOpenFullChatbot}
              className="w-full bg-gradient-to-r from-[#E6896B] to-[#DB6551] text-white py-3 px-4 rounded-xl hover:from-[#DB6551] hover:to-[#E6896B] transition-all duration-300 flex items-center justify-center gap-2 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Bot size={18} />
              <span>Open Full Chatbot</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-[#E6896B]/20 bg-white">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border-2 border-[#E6896B]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB6551] focus:border-[#DB6551] text-sm font-medium placeholder-[#E6896B]/60 transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-12 h-12 bg-[#DB6551] text-white rounded-xl hover:bg-[#E6896B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;