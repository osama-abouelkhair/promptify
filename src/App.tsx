import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import { Show, SignIn, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import ReactMarkdown from 'react-markdown'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompts, setPrompts] = useState<{ name: string, id: string }[]>([]);
  const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // Determine the current view and active prompt
  const currentView = location.state?.view || 'chat';
  const activePromptId = location.state?.promptId || (prompts.length > 0 ? prompts[0].id : null);

  // Fetch prompts on component mount
  useEffect(() => {
    if (!authLoaded || !isSignedIn) return;

    const fetchPrompts = async () => {
      try {
        const token = await getToken();
        const response = await fetch('https://quypw3y73os462q7s5nh5kxh5q0rejdo.lambda-url.us-east-1.on.aws/prompts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setPrompts(data);
          }
        }
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };
    fetchPrompts();
  }, [getToken, authLoaded, isSignedIn]);

  if (!authLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-xl shadow-slate-200/30 text-center w-full max-w-md">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Loading promptify</p>
          <div className="mt-6">
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-200 border-t-slate-400 animate-spin"></div>
          </div>
          <p className="mt-6 text-sm text-slate-500">Preparing your secure workspace…</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[min(100%,40rem)] rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)]">
          <div className="text-center mx-auto max-w-[min(100%,34rem)] px-4">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Promptify</span>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Sign in to access AI chat</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Secure your conversations, save prompts, and keep everything private. Sign in or create an account to continue.
            </p>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-1 shadow-sm">
            <div className="overflow-hidden rounded-[1.5rem] bg-white w-full min-w-0">
              <div className="w-full max-w-[calc(100vw-2rem)] mx-auto min-w-0">
                <SignIn />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              New here? Create an account and start chatting with AI instantly.
            </p>
            <SignUpButton mode="modal">
              <button className="inline-flex justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
                Create account
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-full bg-slate-50 text-slate-900 font-sans">
      <Helmet>
        <title>Promptify - AI Chat & Expert Prompts</title>
        <meta name="description" content="Unlock the power of AI with Promptify. Use expert-crafted prompts to get better answers from AI." />
        <link rel="canonical" href={window.location.origin} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
          <span className="text-2xl font-bold tracking-tight">App</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Close Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            state={{ view: 'chat', promptId: activePromptId || (prompts.length > 0 ? prompts[0].id : null) }}
            onClick={() => setIsSidebarOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-2 mb-4 rounded-md font-semibold transition-colors text-left bg-slate-100 text-slate-900 hover:bg-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New chat
          </Link>

          <Link
            to="/"
            state={{ view: 'search' }}
            onClick={() => setIsSidebarOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors text-left text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search chats
          </Link>
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Prompts</div>
          {Array.isArray(prompts) && prompts.map((prompt) => (
            <Link
              key={prompt.id}
              to="/"
              state={{ view: 'chat', promptId: prompt.id }}
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors text-left ${activePromptId === prompt.id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {prompt.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Routes>
          <Route path="/" element={
            !authLoaded ? (
              <div className="p-4 md:p-8 text-slate-500">Initializing...</div>
            ) : currentView === 'search' ? (
              <SearchView getToken={getToken} prompts={prompts} />
            ) : (
              <ChatView getToken={getToken} prompts={prompts} />
            )
          } />
          {/* Catch-all route to handle internal 404s and redirect back to chat */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function ChatView({ getToken, prompts }: { getToken: any, prompts: any[] }) {
  const location = useLocation();

  const activePromptId = location.state?.promptId || (prompts.length > 0 ? prompts[0].id : null);
  const conversationIdFromLocation = location.state?.conversationId;

  const [internalConversationId, setInternalConversationId] = useState<string | undefined>(conversationIdFromLocation);

  useEffect(() => {
    setInternalConversationId(conversationIdFromLocation);
  }, [conversationIdFromLocation]);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [currentStreamingAiText, setCurrentStreamingAiText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the messages container

  const activePrompt = prompts.find(p => p.id === activePromptId);
  const pageTitle = activePrompt ? `${activePrompt.name} | Promptify AI` : 'Chat | Promptify AI';

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, currentStreamingAiText]);

  // Load history when conversationId is present in URL
  useEffect(() => {
    if (!conversationIdFromLocation) {
      setMessages([]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`https://quypw3y73os462q7s5nh5kxh5q0rejdo.lambda-url.us-east-1.on.aws/conversations/${conversationIdFromLocation}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.contents && Array.isArray(data.contents)) {
            // Map API response to internal message format
            const history = data.contents.map((item: any) => ({
              role: item.role === 'model' ? 'ai' : 'user',
              text: item.parts.map((p: any) => p.text).join('')
            }));
            setMessages(history);
          }
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [conversationIdFromLocation, getToken]);

  const handleSubmit = useCallback(async () => {
    if (inputValue.trim() && activePromptId) {
      const text = inputValue;
      const userMsg = { role: 'user' as const, text };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setCurrentStreamingAiText('');

      let accumulatedText = ''; // Local variable to accumulate text before updating state

      const params = new URLSearchParams();
      if (internalConversationId) params.append('conversation_id', internalConversationId);

      try {
        const token = await getToken();
        const response = await fetch(`https://quypw3y73os462q7s5nh5kxh5q0rejdo.lambda-url.us-east-1.on.aws/ask/${activePromptId}?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ prompt: text })
        });


        if (!response.ok) throw new Error('Network response was not ok');

        // Extract conversation ID from header for new chats
        const xConvId = response.headers.get('X-Conversation-Id');
        if (xConvId && !internalConversationId) {
          setInternalConversationId(xConvId);
        }

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
  }, [inputValue, getToken, activePromptId, internalConversationId]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Chat with our AI using the ${activePrompt?.name || 'custom'} prompt template for high-quality results.`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Promptify AI",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication",
            "description": "An AI chatbot interface utilizing specialized prompts for better output.",
            "featureList": prompts.map(p => p.name).join(", ")
          })}
        </script>
      </Helmet>

      <div ref={messagesEndRef} className="flex-1 px-4 md:px-8 pb-8 pt-2 md:pt-8 overflow-y-auto">
        <div className="w-full space-y-8" role="log" aria-label="Chat history">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 pl-12 md:pl-0 mt-4 md:mt-0">
            <header>
               <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900">
                 {activePrompt ? activePrompt.name : 'Promptify'}
               </h1>
            </header>
            <div className="flex items-center gap-4">
              <Show when={"signed-out"}>
                <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <SignInButton mode="modal">
                    <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-all">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-all shadow-sm">Sign Up</button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when={"signed-in"}>
                <UserButton />
              </Show>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            {messages.map((msg, index) => (
              <article
                key={index}
                className={`max-w-[85%] px-4 py-2 ${msg.role === 'user' ? 'self-end bg-slate-200 text-slate-800 rounded-2xl' : 'self-start bg-transparent text-slate-900'}`}
              >
                {msg.role === 'user' ? <p className="leading-relaxed">{msg.text}</p> : <div className="leading-relaxed prose prose-slate max-w-none text-slate-900"><ReactMarkdown>{msg.text}</ReactMarkdown></div>}
              </article>
            ))}
            {currentStreamingAiText && (
              <article className="max-w-[85%] px-4 py-2 self-start bg-transparent text-slate-900">
                <div className="leading-relaxed prose prose-slate max-w-none text-slate-900"><ReactMarkdown>{currentStreamingAiText}</ReactMarkdown></div>
              </article>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-slate-50 border-t border-slate-200">
        <div className="w-full">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <textarea
                ref={inputRef}
                rows={1}
                placeholder={`Use ${Array.isArray(prompts) ? (prompts.find(p => p.id === activePromptId)?.name || 'Prompt') : 'Prompt'} to unlock a better answer`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              className="flex-1 px-4 py-2 bg-slate-50 border-none rounded-lg text-base placeholder-slate-400 focus:outline-none transition-all duration-200 ease-in-out resize-none min-h-[40px] max-h-48 overflow-y-auto"
              />
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-medium rounded-lg focus:outline-none cursor-pointer transition-all duration-200 ease-in-out shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SearchView({ getToken, prompts }: { getToken: any, prompts: any[] }) {
  const pageTitle = "Search Conversations | Promptify AI";
  const [conversations, setConversations] = useState<{ id: string, lastModified?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await getToken();
        const response = await fetch('https://quypw3y73os462q7s5nh5kxh5q0rejdo.lambda-url.us-east-1.on.aws/conversations', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setConversations(data);
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, [getToken]);

  return (
    <div className="flex-1 px-4 md:px-8 pt-8 overflow-y-auto bg-slate-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Browse and search through your previous AI conversations on Promptify." />
      </Helmet>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center md:text-left mt-12 md:mt-0">Your Conversations</h1>
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>
        ) : (
          <div className="grid gap-4">
            {Array.isArray(conversations) && conversations.map((conv) => (
              <Link
                key={conv.id}
                to="/"
                state={{ view: 'chat', promptId: prompts[0]?.id || 'default', conversationId: conv.id }}
                className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all block group"
              >
                <div className="flex justify-between items-start gap-4 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate min-w-0">
                    {conv.id.split('_').slice(1).join('_') || 'Untitled Chat'}
                  </h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap mt-1">
                    {conv.lastModified ? new Date(conv.lastModified).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App
