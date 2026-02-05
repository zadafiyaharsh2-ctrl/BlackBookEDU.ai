import React, { useState, useEffect, useRef } from 'react'
import api from '../../utils/api';
import Navbar from '../../components/AuthComponents/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const AI = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! How can I assist you today?' }]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  })

  // Fetch Chat History
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/ai/history');
        if (data.ok && data.messages.length > 0) {
          const formattedMessages = data.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };
    fetchHistory();
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/query', {
        query: currentInput
      });

      const aiResponse = {
        role: "assistant",
        content: data.aiResponse?.content || "No response content"
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div className="flex flex-col h-screen bg-black text-white font-sans ">
        <Navbar />
        <main className='grow flex flex-col items-center p-4 overflow-hidden'>
          <h1 className='text-3xl font-bold mb-8 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Ask AI
          </h1>

          {/* chat area */}
          <div className='w-full max-w-6xl grow bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col '>


            <div className='grow overflow-y-auto p-4 space-y-4 no-scrollbar'>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                    }`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={`${className} bg-zinc-700 px-1 rounded`} {...props}>
                                {children}
                              </code>
                            )
                          },
                          // Basic styling for other elements
                          h1: ({ children }) => <h1 className="text-2xl font-bold my-2 text-blue-400">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-xl font-bold my-2 text-purple-400">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-lg font-bold my-1 text-zinc-100">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          a: ({ children, href }) => <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">{children}</a>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-zinc-500 pl-3 my-2 italic text-zinc-400">{children}</blockquote>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none animate-pulse">
                    AI is thinking...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>


            {/* input area */}
            <form onSubmit={handleSendMessage} className='p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2' >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="grow bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Send
              </button>
            </form>

          </div>
        </main>
      </div>
    </div>
  )
}

export default AI