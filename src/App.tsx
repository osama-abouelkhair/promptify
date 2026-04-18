import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);

  const aiResponses = [
    "That's interesting! Tell me more.",
    "I understand. How can I help with that?",
    "Processing your request...",
    "Based on my analysis, that seems correct.",
    "I'm not sure I follow, could you clarify?"
  ];

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const userMsg = { role: 'user' as const, text: inputValue };
      const aiMsg = { 
        role: 'ai' as const, 
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)] 
      };
      setMessages((prev) => [...prev, userMsg, aiMsg]);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Component */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-tight border-b border-slate-800">
          MyApp
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-md bg-slate-800 text-white font-medium">
            Promptify
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header (Visible only on small screens) */}
        <header className="md:hidden bg-slate-900 text-white p-4 font-bold text-xl">
          Prompts
        </header>

        {/* Content Container */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Promptify</h1>
            </div>

            {/* Message List */}
            <div className="flex flex-col space-y-6">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[85%] px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'self-end bg-slate-200 text-slate-800 rounded-2xl' 
                      : 'self-start bg-transparent text-slate-900'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form/Action Card - Fixed at bottom */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter your data here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border-none rounded-lg text-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ease-in-out"
                />
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 ease-in-out shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
