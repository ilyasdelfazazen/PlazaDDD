import React, { useState } from 'react';
import { Send, ChevronRight, ChevronLeft, MessageCircle, ThumbsUp, Share2, MoreHorizontal, HelpCircle, ChevronDown, ChevronUp, Bot } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  abilities: string[];
  color: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const agents: Agent[] = [
  {
    id: 'mark',
    name: 'Mark',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    abilities: ['Event Planning', 'Activity Recommendations', 'Schedule Management'],
    color: 'DB6551'
  },
  {
    id: 'athena',
    name: 'Athena',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg',
    abilities: ['Real Estate/Investment', 'Property Analysis', 'Market Insights'],
    color: 'E6896B'
  },
  {
    id: 'nova',
    name: 'Nova',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-7.jpg',
    abilities: ['Booking and Logistics', 'Travel Planning', 'Transportation'],
    color: 'DB6551'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg',
    abilities: ['Place Discovery', 'Local Recommendations', 'Cultural Insights'],
    color: 'E6896B'
  },
  {
    id: 'luna',
    name: 'Luna',
    avatar: 'https://images.generated.photos/kMohesO15iKpSK0r-wuXxmHwFh9Msw0CmBdStJsslGQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDU4MzMxLmpwZw.jpg',
    abilities: ['Entertainment Guide', 'Activity Matching', 'Social Planning'],
    color: 'DB6551'
  }
];

const topics = [
  'Forum',
  'Offre',
  'History',
  'Topics',
  'Visios',
  'Support',
  'News'
];

const topicFAQs: Record<string, FAQ[]> = {
  'Forum': [
    {
      id: 'f1',
      question: 'How do I create a new forum post?',
      answer: 'To create a new forum post, click on the "New Post" button in the top right corner of the forum page. Fill in the title, select appropriate tags, and write your content. Make sure to follow our community guidelines.',
      category: 'Forum Usage',
      helpful: 45
    },
    {
      id: 'f2',
      question: 'How can I edit or delete my forum posts?',
      answer: 'You can edit your posts by clicking the three dots menu next to your post and selecting "Edit". You can delete posts within 24 hours of posting. After that, contact a moderator for assistance.',
      category: 'Forum Management',
      helpful: 32
    },
    {
      id: 'f3',
      question: 'What are the forum community guidelines?',
      answer: 'Our forum guidelines include: be respectful to all members, stay on topic, no spam or self-promotion, use appropriate language, and provide constructive feedback. Violations may result in warnings or account suspension.',
      category: 'Community Rules',
      helpful: 67
    },
    {
      id: 'f4',
      question: 'How do I report inappropriate content?',
      answer: 'Click the flag icon next to any post or comment to report it. Provide a brief explanation of why you\'re reporting it. Our moderation team reviews all reports within 24 hours.',
      category: 'Moderation',
      helpful: 28
    }
  ],
  'Offre': [
    {
      id: 'o1',
      question: 'How do I create a new offer?',
      answer: 'Navigate to the "Create Offer" section, fill in all required details including title, description, price, and availability. Upload high-quality images and set your terms and conditions.',
      category: 'Creating Offers',
      helpful: 52
    },
    {
      id: 'o2',
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets. Payment processing is secure and encrypted.',
      category: 'Payments',
      helpful: 78
    },
    {
      id: 'o3',
      question: 'How do I manage my offer listings?',
      answer: 'Go to your dashboard and click on "My Offers". From there you can edit details, update availability, view analytics, and manage bookings. You can also pause or delete offers.',
      category: 'Offer Management',
      helpful: 41
    },
    {
      id: 'o4',
      question: 'What are the commission fees?',
      answer: 'Our platform charges a 5% commission on successful bookings. This covers payment processing, customer support, and platform maintenance. No hidden fees.',
      category: 'Pricing',
      helpful: 63
    }
  ],
  'History': [
    {
      id: 'h1',
      question: 'How can I view my booking history?',
      answer: 'Access your booking history through your profile dashboard. Click on "History" to see all past and current bookings, including dates, amounts, and status.',
      category: 'Booking History',
      helpful: 39
    },
    {
      id: 'h2',
      question: 'Can I download my transaction history?',
      answer: 'Yes, you can export your transaction history as a CSV or PDF file. Go to your account settings and select "Export Data" to download your complete history.',
      category: 'Data Export',
      helpful: 25
    },
    {
      id: 'h3',
      question: 'How long is my history stored?',
      answer: 'We store your complete history for 7 years for legal and tax purposes. You can access this data anytime through your account dashboard.',
      category: 'Data Retention',
      helpful: 18
    }
  ],
  'Topics': [
    {
      id: 't1',
      question: 'How do I follow specific topics?',
      answer: 'Click the "Follow" button on any topic page to receive notifications about new posts and updates. You can manage your followed topics in your profile settings.',
      category: 'Topic Following',
      helpful: 34
    },
    {
      id: 't2',
      question: 'Can I create custom topics?',
      answer: 'Custom topics can be created by users with verified accounts. Submit a topic proposal through the "Suggest Topic" form, and our team will review it within 3-5 business days.',
      category: 'Topic Creation',
      helpful: 22
    },
    {
      id: 't3',
      question: 'How are topics moderated?',
      answer: 'Topics are moderated by our community team and volunteer moderators. We ensure content stays relevant and follows our guidelines. Off-topic posts may be moved or removed.',
      category: 'Topic Moderation',
      helpful: 29
    }
  ],
  'Visios': [
    {
      id: 'v1',
      question: 'How do I join a video session?',
      answer: 'Click on the video session link sent to your email or access it through your dashboard. Make sure you have a stable internet connection and allow camera/microphone permissions.',
      category: 'Joining Sessions',
      helpful: 56
    },
    {
      id: 'v2',
      question: 'What are the technical requirements?',
      answer: 'You need a modern web browser (Chrome, Firefox, Safari, Edge), stable internet connection (minimum 1 Mbps), and a device with camera and microphone for full participation.',
      category: 'Technical Requirements',
      helpful: 43
    },
    {
      id: 'v3',
      question: 'Can I record video sessions?',
      answer: 'Recording is available for premium users and session hosts. All participants will be notified when recording starts. Recordings are stored securely and can be accessed for 30 days.',
      category: 'Recording',
      helpful: 31
    }
  ],
  'Support': [
    {
      id: 's1',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through live chat (available 24/7), email (support@place2.com), or by submitting a ticket through your dashboard. Average response time is under 2 hours.',
      category: 'Contact Support',
      helpful: 89
    },
    {
      id: 's2',
      question: 'What information should I include in a support ticket?',
      answer: 'Include your account email, detailed description of the issue, steps you\'ve already tried, screenshots if applicable, and your browser/device information.',
      category: 'Support Tickets',
      helpful: 47
    },
    {
      id: 's3',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the reset email. If you don\'t receive it, check your spam folder.',
      category: 'Account Issues',
      helpful: 72
    }
  ],
  'News': [
    {
      id: 'n1',
      question: 'How often are news updates published?',
      answer: 'We publish news updates weekly, with breaking news and important announcements posted as needed. Subscribe to our newsletter to stay informed about all updates.',
      category: 'News Frequency',
      helpful: 26
    },
    {
      id: 'n2',
      question: 'Can I submit news or announcements?',
      answer: 'Community members can submit news through our "Submit News" form. All submissions are reviewed by our editorial team before publication.',
      category: 'News Submission',
      helpful: 19
    },
    {
      id: 'n3',
      question: 'How do I subscribe to news notifications?',
      answer: 'Enable news notifications in your account settings under "Notification Preferences". You can choose to receive updates via email, push notifications, or both.',
      category: 'News Notifications',
      helpful: 35
    }
  ]
};

const ChatbotPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isTopicExpanded, setIsTopicExpanded] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [chatbotTopic, setChatbotTopic] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      let responseText = '';
      if (chatbotTopic) {
        responseText = `I'm here to help you with questions about ${chatbotTopic}. ${inputMessage.includes('?') ? 'Let me provide you with detailed information about that.' : 'What specific aspect would you like to know more about?'}`;
      } else if (selectedAgent && selectedAbility) {
        responseText = `This is a response from ${selectedAgent.name} about ${selectedAbility}. How can I assist you further?`;
      } else if (selectedAgent) {
        responseText = `Hello! I'm ${selectedAgent.name}. I can help you with ${selectedAgent.abilities.join(', ')}. What would you like to know?`;
      } else {
        responseText = 'Hello! Please select an AI agent or topic to get started with your questions.';
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleAgentClick = (agent: Agent) => {
    if (expandedAgent === agent.id) {
      setExpandedAgent(null);
    } else {
      setExpandedAgent(agent.id);
      setSelectedAgent(agent);
      setSelectedAbility(null);
      setChatbotTopic(null);
    }
  };

  const handleAbilityClick = (ability: string) => {
    setSelectedAbility(ability);
    setChatbotTopic(null);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setIsTopicExpanded(true);
  };

  const handleChatbotTopicClick = (topic: string) => {
    setChatbotTopic(topic);
    setSelectedAgent(null);
    setSelectedAbility(null);
    setExpandedAgent(null);
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `I'm now ready to help you with questions about ${topic}. Feel free to ask me anything that wasn't covered in the FAQ section!`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const renderFAQContent = () => {
    if (!selectedTopic || !topicFAQs[selectedTopic]) {
      return (
        <div className="p-8 text-center">
          <HelpCircle size={48} className="mx-auto text-[#E6896B]/40 mb-4" />
          <h3 className="text-xl font-bold text-[#DB6551] mb-2">No FAQs Available</h3>
          <p className="text-[#E6896B] font-medium">Select a topic to view frequently asked questions.</p>
        </div>
      );
    }

    const faqs = topicFAQs[selectedTopic];
    const categories = [...new Set(faqs.map(faq => faq.category))];

    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[#DB6551] mb-3">
                {selectedTopic} - Frequently Asked Questions
              </h3>
              <p className="text-[#E6896B] font-medium">
                Find answers to common questions about {selectedTopic.toLowerCase()}.
              </p>
            </div>
            <button
              onClick={() => handleChatbotTopicClick(selectedTopic)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#DB6551] to-[#E6896B] text-white rounded-xl hover:from-[#E6896B] hover:to-[#DB6551] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Bot size={20} />
              <span>Ask Chatbot</span>
            </button>
          </div>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-10">
            <h4 className="text-xl font-bold text-[#DB6551] mb-6 border-b-2 border-[#E6896B]/20 pb-3">
              {category}
            </h4>
            <div className="space-y-4">
              {faqs
                .filter(faq => faq.category === category)
                .map(faq => (
                  <div key={faq.id} className="border-2 border-[#E6896B]/20 rounded-2xl overflow-hidden hover:border-[#DB6551]/40 transition-all duration-300">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-[#E6896B]/5 transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="font-bold text-[#DB6551] pr-4 text-lg">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp size={24} className="text-[#E6896B] flex-shrink-0" />
                      ) : (
                        <ChevronDown size={24} className="text-[#E6896B] flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-6 py-4 bg-gradient-to-r from-[#E6896B]/5 to-[#DB6551]/5 border-t-2 border-[#E6896B]/20">
                        <p className="text-[#E6896B] mb-4 leading-relaxed font-medium">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-2 text-sm text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-semibold">
                            <ThumbsUp size={18} />
                            <span>Helpful ({faq.helpful})</span>
                          </button>
                          <span className="text-xs text-[#E6896B]/70 font-medium">
                            Category: {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Left Sidebar - AI Agents */}
      <div className={`bg-white border-r-2 border-[#E6896B]/20 flex flex-col py-8 transition-all duration-300 ${
        isTopicExpanded ? 'w-48' : 'w-64'
      }`}>
        <h2 className="px-6 text-xl font-bold text-[#DB6551] mb-6">AI Agents</h2>
        <div className="space-y-2 px-4 overflow-y-auto">
          {agents.map(agent => (
            <div key={agent.id}>
              <button
                onClick={() => handleAgentClick(agent)}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300 border-2 ${
                  selectedAgent?.id === agent.id 
                    ? `bg-[#${agent.color}]/10 text-[#${agent.color}] border-[#${agent.color}]/30` 
                    : 'hover:bg-[#E6896B]/5 text-[#E6896B] border-transparent hover:border-[#E6896B]/20'
                }`}
              >
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E6896B]/20"
                />
                <div className="flex-1 text-left">
                  <div className="font-bold">{agent.name}</div>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`transition-transform duration-300 ${expandedAgent === agent.id ? 'rotate-90' : ''}`}
                />
              </button>
              
              {expandedAgent === agent.id && (
                <div className="ml-14 mt-2 space-y-2">
                  {agent.abilities.map((ability) => (
                    <button
                      key={ability}
                      onClick={() => handleAbilityClick(ability)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 font-medium border-2 ${
                        selectedAbility === ability
                          ? `bg-[#DB6551]/10 text-[#DB6551] border-[#DB6551]/30`
                          : 'hover:bg-[#E6896B]/5 text-[#E6896B] border-transparent hover:border-[#E6896B]/20'
                      }`}
                    >
                      {ability}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section - Chat */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isTopicExpanded ? 'w-[25%]' : 'w-[60%]'
      }`}>
        {/* Chat Header */}
        <div className="h-20 bg-white border-b-2 border-[#E6896B]/20 flex items-center px-8">
          {chatbotTopic ? (
            <div className="flex items-center">
              <Bot size={28} className="text-[#DB6551] mr-4" />
              <div>
                <div className="font-bold text-[#DB6551] text-lg">Topic Assistant</div>
                <div className="text-sm text-[#E6896B] font-medium">Helping with {chatbotTopic}</div>
              </div>
            </div>
          ) : selectedAgent ? (
            <div className="flex items-center">
              <img 
                src={selectedAgent.avatar} 
                alt={selectedAgent.name}
                className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-[#E6896B]/20"
              />
              <div>
                <div className="font-bold text-[#DB6551] text-lg">{selectedAgent.name}</div>
                {selectedAbility && (
                  <div className="text-sm text-[#E6896B] font-medium">{selectedAbility}</div>
                )}
              </div>
            </div>
          ) : (
            <span className="text-[#E6896B] font-semibold text-lg">Select an AI agent or use topic chatbot</span>
          )}
        </div>

        {/* Chat Messages */}
        <div className="overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-[#E6896B]/5" style={{ height: 'calc(100vh - 200px)' }}>
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-6 py-4 shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-[#DB6551] text-white'
                    : 'bg-white text-[#E6896B] border-2 border-[#E6896B]/20'
                }`}
              >
                <p className="font-medium">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-[#E6896B]/70'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t-2 border-[#E6896B]/20 p-6 h-24 flex items-center">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={chatbotTopic ? `Ask about ${chatbotTopic}...` : "Type your message..."}
              className="flex-1 px-6 py-3 border-2 border-[#E6896B]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB6551] focus:border-[#DB6551] font-medium placeholder-[#E6896B]/60 transition-all duration-300"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-[#DB6551] text-white rounded-xl hover:bg-[#E6896B] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Topics */}
      <div className={`bg-white border-l-2 border-[#E6896B]/20 flex flex-col transition-all duration-300 ${
        isTopicExpanded ? 'w-[60%]' : 'w-24'
      }`}>
        <div className="p-6 border-b-2 border-[#E6896B]/20 flex justify-between items-center">
          <h3 className={`font-bold text-[#DB6551] text-xl ${!isTopicExpanded && 'sr-only'}`}>
            {selectedTopic || 'Topics'}
          </h3>
          <button
            onClick={() => setIsTopicExpanded(!isTopicExpanded)}
            className="p-3 hover:bg-[#E6896B]/10 rounded-full transition-all duration-300 hover:scale-110"
          >
            {isTopicExpanded ? <ChevronRight size={24} className="text-[#DB6551]" /> : <ChevronLeft size={24} className="text-[#DB6551]" />}
          </button>
        </div>

        {isTopicExpanded ? (
          <div className="flex-1 overflow-y-auto">
            {selectedTopic ? (
              renderFAQContent()
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-[#DB6551] mb-2">Select a Topic</h3>
                <p className="text-[#E6896B] font-medium">Choose a topic from the sidebar to view content</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`h-28 flex items-center justify-center cursor-pointer hover:bg-[#E6896B]/10 transition-all duration-300 border-l-4 ${
                  selectedTopic === topic ? 'bg-[#E6896B]/20 border-[#DB6551]' : 'border-transparent hover:border-[#E6896B]/30'
                }`}
              >
                <span 
                  className="transform -rotate-90 whitespace-nowrap text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-bold"
                  style={{ transformOrigin: 'center' }}
                >
                  {topic}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;