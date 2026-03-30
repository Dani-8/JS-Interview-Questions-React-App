import React from 'react';
import { Code2, ChevronRight } from 'lucide-react';


const QuestionList = ({ questions, activeTab, onSelect }) => {
  return (
    <nav className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-2">
        Challenges
      </p>

        
      {questions.map((q, idx) => (
        <button
          key={q.id}
          onClick={() => onSelect(idx)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all text-left group ${
            activeTab === idx 
              ? "bg-slate-800 text-white shadow-xl ring-1 ring-slate-700" 
              : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Code2 
              size={16} 
              className={activeTab === idx ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"} 
            />
            <span className="font-medium text-sm">{q.title}</span>
          </div>
          {activeTab === idx && <ChevronRight size={14} className="text-indigo-500" />}
        </button>
      ))}
    </nav>
  );
};

export default QuestionList;