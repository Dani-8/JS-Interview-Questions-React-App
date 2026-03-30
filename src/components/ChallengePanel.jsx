import React from 'react';
import { Code2 } from 'lucide-react';


const ChallengePanel = ({ 
  currentQ, 
  inputVal, 
  setInputVal, 
  result, 
  showCode 
}) => {

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-6 md:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Code2 className="text-indigo-400" size={20} />
          {currentQ.title}
        </h2>
        <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase tracking-tighter">
          {currentQ.type}
        </span>
      </div>

      {showCode ? (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-indigo-300 leading-relaxed">
            <code>{currentQ.code}</code>
          </pre>
        </div>
      ) : (
        <div className="space-y-6">
          {currentQ.type !== 'static' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-500 font-medium ml-1">TEST INPUT</label>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-indigo-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-slate-800/50">
            <label className="text-xs text-slate-500 font-medium ml-1">OUTPUT RESULT</label>
            <div className="w-full bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6 min-h-[100px] flex items-center justify-center text-center">
              {result !== "" ? (
                <p className="text-2xl font-mono text-indigo-400 break-all">{result}</p>
              ) : (
                <p className="text-slate-600 italic">Waiting for input...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePanel;