import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../assets/constant";
import { Eye, Star, MessageCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const ChatbotFeedbackPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/cms/chatbot/feedback`, {
        withCredentials: true,
      });
      setFeedbacks(res.data);
    } catch (error) {
      toast.error("Failed to load chatbot feedback");
      console.error("Error fetching chatbot feedback", error);
    } finally {
      setLoading(false);
    }
  };

  const openChatLog = (feedback) => {
    setSelectedChat(feedback);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-3xl shadow-md w-full border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-brand-text tracking-tight uppercase">Chatbot Reviews</h2>
          <p className="text-xs text-brand-orange font-bold tracking-widest uppercase">Student & Visitor Interactions</p>
        </div>
        <button
          onClick={fetchFeedbacks}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500 font-bold">Loading feedback...</div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-10 text-slate-500 font-bold border border-dashed border-slate-200 rounded-2xl">
          No chatbot reviews found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-100">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] font-black tracking-wider">
              <tr>
                <th className="p-3.5 border border-slate-100 text-left">Date</th>
                <th className="p-3.5 border border-slate-100 text-left">Rating</th>
                <th className="p-3.5 border border-slate-100 text-left">Suggestions</th>
                <th className="p-3.5 border border-slate-100 text-center">Chat Log</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-slate-600">
              {feedbacks.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3.5 border border-slate-100 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td className="p-3.5 border border-slate-100">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 border border-slate-100 max-w-xs truncate" title={item.suggestions}>
                    {item.suggestions || <span className="text-slate-400 italic font-medium">None</span>}
                  </td>
                  <td className="p-3.5 border border-slate-100 text-center">
                    <button
                      onClick={() => openChatLog(item)}
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs uppercase tracking-wider px-4.5 py-2 rounded-xl inline-flex gap-2 items-center transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      View Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chat Log Modal */}
      {isModalOpen && selectedChat && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg h-[650px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-800 p-5 border-b border-slate-150 flex justify-between items-center select-none">
              <div>
                <h3 className="font-heading font-black text-lg text-slate-800 dark:text-white uppercase tracking-tight">
                  Chat Transcript
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  Rating: {selectedChat.rating} / 5 Stars
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-200/50 rounded-full transition text-slate-500 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 dark:bg-slate-950 flex flex-col gap-4">
              {(!selectedChat.chat_history || selectedChat.chat_history.length === 0) ? (
                <div className="text-center py-20 text-slate-400 italic">No chat log recorded for this session.</div>
              ) : (
                selectedChat.chat_history.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col gap-0.5 w-full max-w-[80%]">
                      <div
                        className={`p-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-br-none shadow-md'
                            : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[9px] text-slate-400 font-black px-1 uppercase tracking-wider block">
                        {msg.sender === 'user' ? 'User' : 'Shrushit Bot'} • {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Suggestions Footer */}
            {selectedChat.suggestions && (
              <div className="p-5 border-t border-slate-100 bg-white dark:bg-slate-900 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 block mb-1">
                  Suggestions/Feedback:
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100">
                  {selectedChat.suggestions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotFeedbackPanel;
