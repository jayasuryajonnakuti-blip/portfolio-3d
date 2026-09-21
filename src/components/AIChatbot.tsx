import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Bot, Loader2 } from 'lucide-react';
import { auth, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm your AI Portfolio Assistant. Ask me anything about the owner's skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.slice(1) // Exclude initial greeting
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();
      
      const botMessage: Message = { role: 'model', content: data.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg z-[100] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-[350px] sm:w-[400px] h-[500px] bg-[#0A0A0A]/95 border border-red-900/30 rounded-2xl flex flex-col shadow-2xl z-[100] backdrop-blur-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-red-900/30 bg-red-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Portfolio Assistant</h3>
                  <p className="text-xs text-red-400">Gemini Powered</p>
                </div>
              </div>
              {!user && (
                <button 
                  onClick={signInWithGoogle}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-900/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-red-800' : 'bg-red-900/40'}`}>
                      {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-red-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center">
                      <Bot size={16} className="text-red-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none">
                      <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-red-900/30 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-red-900/30 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:text-red-400 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
