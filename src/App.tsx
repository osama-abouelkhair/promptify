import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    alert(`You entered: ${inputValue}`);
    setInputValue('');
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
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-slate-800 text-slate-300 transition-colors">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-slate-800 text-slate-300 transition-colors">
            Profile
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header (Visible only on small screens) */}
        <header className="md:hidden bg-slate-900 text-white p-4 font-bold text-xl">
          MyApp
        </header>

        {/* Content Container */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Promptify</h1>
              <p className="mt-2 text-slate-600">Welcome to your new React application.</p>
            </div>

            {/* Form/Action Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold mb-4">Quick Action</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Tailwind Textbox Component */}
                <input
                  type="text"
                  placeholder="Enter your data here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm placeholder-slate-400 
                             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                             transition-all duration-200 ease-in-out"
                />
                
                {/* Tailwind Button Component */}
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                             active:bg-blue-800 transition-all duration-200 ease-in-out shadow-sm"
                >
                  Submit Data
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
