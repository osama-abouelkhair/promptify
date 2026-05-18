import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import { Show, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import ReactMarkdown from 'react-markdown'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [currentStreamingAiText, setCurrentStreamingAiText] = useState<string>('');
  const { getToken } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the messages container

  // Effect to scroll to the bottom whenever messages change or streaming text updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, currentStreamingAiText]);

  const handleSubmit = useCallback(async () => {
    if (inputValue.trim()) {
      const text = inputValue;
      const userMsg = { role: 'user' as const, text };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setCurrentStreamingAiText('');
        
      let accumulatedText = ''; // Local variable to accumulate text before updating state

      try {
        const token = await getToken();
        const response = await fetch('https://quypw3y73os462q7s5nh5kxh5q0rejdo.lambda-url.us-east-1.on.aws/ask/75945356-2a6f-4893-8cbb-79ba73c2ad67', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ prompt: text })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);


        if (!response.ok) throw new Error('Network response was not ok');
        if (!response.body) throw new Error('ReadableStream not supported');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = ''; // Temporary storage for partial chunks

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode current chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });

          // Logic to find and parse complete JSON objects within the stream
          // This works even if the JSON is pretty-printed or wrapped in an array [ ... ]
          let startIndex = 0;
          while (true) {
            const start = buffer.indexOf('{', startIndex);
            if (start === -1) break;

            let end = buffer.indexOf('}', start);
            let foundValidObject = false;

            while (end !== -1) {
              const potentialJson = buffer.substring(start, end + 1);
              try {
                const parsed = JSON.parse(potentialJson);

                parsed.candidates?.forEach((candidate: any) => {
                  candidate.content?.parts?.forEach((part: any) => {
                    if (part.text) {
                      accumulatedText += part.text;
                    }
                  });
                });
                setCurrentStreamingAiText(accumulatedText);

                startIndex = end + 1;
                foundValidObject = true;
                break; // Found a valid object, stop looking for higher-level closing braces
              } catch {
                // Not a complete JSON yet, keep looking for the next closing brace
                end = buffer.indexOf('}', end + 1);
              }
            }

            if (!foundValidObject) break;
          }
          // Clean up the buffer to keep only the unprocessed tail
          buffer = buffer.substring(startIndex);
        }

        // After the stream is done, add the complete message to the messages array
        setMessages((prev) => [...prev, { role: 'ai', text: accumulatedText }]);
        setCurrentStreamingAiText(''); // Clear the streaming text state
      } catch (error) {
        console.error('Error fetching response:', error);
        // If an error occurs, add an error message to the main messages array
        // We append to any partially received text
        setMessages((prev) => [...prev, { role: 'ai' as const, text: accumulatedText + "\n\nError: Unable to get a complete response from the server." }]);
        setCurrentStreamingAiText(''); // Clear streaming text on error
      }
    }
  }, [inputValue, getToken]);

  return (
    <div className="flex h-dvh w-full bg-slate-50 text-slate-900 font-sans">
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
        <div ref={messagesEndRef} className="flex-1 px-8 pb-8 pt-2 md:pt-8 overflow-y-auto"> {/* Attach the ref here */}
          <div className="w-full space-y-8">

            <div className="flex items-center justify-between pb-6 border-b border-slate-200 pl-12 md:pl-0 mt-4 md:mt-0">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900">Promptify</h1>
              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <SignInButton mode="modal">
                      <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-all">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-all shadow-sm">Sign Up</button>
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
                  {msg.role === 'user' ? (
                    <p className="leading-relaxed">{msg.text}</p>
                  ) : (
                    <div className="leading-relaxed prose prose-slate max-w-none text-slate-900">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
              {/* Render the currently streaming AI text */}
              {currentStreamingAiText && (
                <div
                  className={`max-w-[85%] px-4 py-2 self-start bg-transparent text-slate-900`}
                >
                  <div className="leading-relaxed prose prose-slate max-w-none text-slate-900">
                    <ReactMarkdown>{currentStreamingAiText}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form/Action Card - Fixed at bottom */}
        <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-slate-50 border-t border-slate-200">
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
