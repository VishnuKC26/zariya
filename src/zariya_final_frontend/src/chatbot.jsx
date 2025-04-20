import React, { useState, useEffect, useRef } from 'react';

const suggestions = [
  "Which NGOs work with education?",
  "How do I know an NGO is trustworthy?",
  "NGOs working on flood relief",
  "Can I donate to multiple causes?",
  "How to track impact of my donation?",
  "Animal welfare organizations"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'Zariya', text: "Hi there! I'm Zariya, your guide to finding and supporting trusted NGOs across India. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const sendMessage = async (presetMessage) => {
    const message = presetMessage || input.trim();
    if (!message) return;

    setMessages(prev => [...prev, { sender: 'You', text: message }]);
    setInput('');

    const loadingMsg = { sender: 'Zariya', text: '...' };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      const res = await fetch('http://localhost:8000/chat-stream/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const reply = await res.text();

      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'Zariya', text: reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'Zariya', text: 'Sorry, there was a problem contacting the server.' }
      ]);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-[100%] max-w-[1100px] mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 backdrop-blur-sm">
      <div className="bg-gray-900  text-white text-center py-5 text-4xl font-semibold tracking-wide rounded-t-3xl">
        Zariya 🤖
      </div>
      <div className="text-center text-gray-500 italic pt-2 pb-4 px-6">
        A Medium for Change
      </div>
  
      <div
        ref={chatRef}
        className="px-6 py-5 h-[250px] overflow-y-auto space-y-4 bg-gray-50/60"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-5 py-3 rounded-2xl text-base shadow-sm transition-all ${
              msg.sender === 'You'
                ? 'bg-blue-100 ml-auto text-right'
                : 'bg-white mr-auto text-left'
            }`}
          >
            <strong className="block text-sm text-gray-700 mb-1">{msg.sender}:</strong>
            <span className="whitespace-pre-wrap text-gray-800">{msg.text}</span>
          </div>
        ))}
      </div>
  
      <div className="px-6 py-4 bg-white/90 border-t border-gray-200 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((text, i) => (
            <button
              key={i}
              onClick={() => sendMessage(text)}
              className="px-4 py-1.5 text-sm rounded-full bg-green-100 hover:bg-green-200 border border-green-300 text-green-800 transition duration-200"
            >
              {text}
            </button>
          ))}
        </div>
  
        <div className="flex items-center">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about donations or NGOs..."
            className="flex-grow px-5 py-2.5 border border-gray-300 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            onClick={() => sendMessage()}
            className="ml-3 px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium hover:bg-green-800 transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Chatbot;