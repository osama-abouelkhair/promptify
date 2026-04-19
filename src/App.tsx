import { useState } from 'react'
import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      {/* Floating Menu Toggle for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white text-slate-800 rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
        aria-label="Open Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Sidebar Component */}
      <aside className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-64 bg-slate-800 text-slate-100 fixed md:static inset-0 z-50 md:z-auto transition-all`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <span className="text-2xl font-bold tracking-tight">Prompts</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Close Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-md bg-slate-800 text-white font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            JPA
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Content Container */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full space-y-8">

            <div className="flex items-center justify-between pb-6 border-b border-slate-200 pl-12 md:pl-0">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Promptify</h1>
              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <SignInButton mode="modal">
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-all">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-all shadow-sm">Sign Up</button>
                    </SignUpButton>
                  </div>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>

            {/* Message List */}
            <div className="flex flex-col space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] px-4 py-2 ${msg.role === 'user'
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
          <div className="w-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Use JPA to unlcok a better answer"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border-none rounded-lg text-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ease-in-out"
                />
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-medium rounded-lg focus:outline-none cursor-pointer transition-all duration-200 ease-in-out shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
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
