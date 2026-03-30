import React, { useState, useEffect } from 'react';
import { Zap, Terminal } from 'lucide-react';
import QuestionList from './components/QuestionList';
import ChallengePanel from './components/ChallengePanel';

// -------------------------------------------------------------
// -------------------------------------------------------------

const questions = [
  {
    id: 1,
    title: "Remove Duplicates",
    type: "array",
    placeholder: "1, 2, 2, 3, 4, 4",
    code: `(input) => {
  const arr = input.split(',').map(n => n.trim());
  return [...new Set(arr)].join(', ');
}`,
    fn: (input) => {
      const arr = input.split(',').map(n => n.trim());
      return [...new Set(arr)].join(', ');
    }
  },
  {
    id: 2,
    title: "Reverse String",
    type: "text",
    placeholder: "Hello World",
    code: `(str) => str.split('').reverse().join('')`,
    fn: (str) => str.split('').reverse().join('')
  },
  {
    id: 3,
    title: "Even/Odd Split",
    type: "array",
    placeholder: "1, 2, 3, 4, 5, 6",
    code: `(input) => {
  const arr = input.split(',').map(Number).filter(n => !isNaN(n));
  const even = arr.filter(n => n % 2 === 0);
  const odd = arr.filter(n => n % 2 !== 0);
  return \`Even: [\${even}] | Odd: [\${odd}]\`;
}`,
    fn: (input) => {
      const arr = input.split(',').map(Number).filter(n => !isNaN(n));
      const even = arr.filter(n => n % 2 === 0);
      const odd = arr.filter(n => n % 2 !== 0);
      return `Even: [${even}] | Odd: [${odd}]`;
    }
  },
  {
    id: 4,
    title: "Find Largest",
    type: "array",
    placeholder: "10, 5, 100, 2, 8",
    code: `(input) => {
  const arr = input.split(',').map(Number).filter(n => !isNaN(n));
  return arr.length ? Math.max(...arr) : 'N/A';
}`,
    fn: (input) => {
      const arr = input.split(',').map(Number).filter(n => !isNaN(n));
      return arr.length ? Math.max(...arr) : 'N/A';
    }
  },
  {
    id: 5,
    title: "Vowel Counter",
    type: "text",
    placeholder: "How many vowels?",
    code: `(str) => {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}`,
    fn: (str) => {
      const matches = str.match(/[aeiou]/gi);
      return matches ? matches.length : 0;
    }
  },
  {
    id: 6,
    title: "Capitalize Words",
    type: "text",
    placeholder: "capitalize me please",
    code: `(str) => str.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')`,
    fn: (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  },
  {
    id: 7,
    title: "Remove Falsy",
    type: "static",
    placeholder: "Filters [0, false, '', null...]",
    code: `(arr) => arr.filter(Boolean)`,
    fn: () => JSON.stringify([0, 1, false, 2, '', 3, null, undefined, NaN, 'hello'].filter(Boolean))
  },
  {
    id: 8,
    title: "Array Sum",
    type: "array",
    placeholder: "10, 20, 30",
    code: `(input) => {
  const arr = input.split(',').map(Number).filter(n => !isNaN(n));
  return arr.reduce((a, b) => a + b, 0);
}`,
    fn: (input) => {
      const arr = input.split(',').map(Number).filter(n => !isNaN(n));
      return arr.reduce((a, b) => a + b, 0);
    }
  },
  {
    id: 9,
    title: "Missing Numbers",
    type: "array",
    placeholder: "1, 2, 4, 6",
    code: `(input) => {
  const arr = input.split(',').map(Number).sort((a, b) => a - b);
  let missing = [];
  for (let i = arr[0]; i <= arr[arr.length - 1]; i++) {
    if (!arr.includes(i)) missing.push(i);
  }
  return missing.join(', ');
}`,
    fn: (input) => {
      const arr = input.split(',').map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
      if (arr.length < 2) return "Need at least 2 numbers";
      let missing = [];
      for (let i = arr[0]; i <= arr[arr.length - 1]; i++) {
        if (!arr.includes(i)) missing.push(i);
      }
      return missing.length ? missing.join(', ') : "None missing";
    }
  },
];


// -------------------------------------------------------------
// -------------------------------------------------------------


const App = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [inputVal, setInputVal] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [result, setResult] = useState("")

  const currentQ = questions[activeTab]



  // Calculate result using useEffect instead of useMemo
  useEffect(() => {
    if (!inputVal && currentQ.type !== 'static') {
      setResult("");
      return;
    }

    try {
      const output = currentQ.fn(inputVal);
      setResult(output);
    } catch (err) {
      setResult("Error");
    }
  }, [inputVal, activeTab]);


  const handleQuestionSelect = (idx) => {
    setActiveTab(idx);
    setInputVal("");
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Zap className="text-white" fill="white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">Interactive Interview Dashboard</h1>
            </div>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${showCode ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-800 text-slate-400 hover:border-slate-600"
              }`}
          >
            <Terminal size={18} />
            <span className="text-sm font-medium">{showCode ? "Hide Logic" : "View Logic"}</span>
          </button>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <QuestionList
              questions={questions}
              activeTab={activeTab}
              onSelect={handleQuestionSelect}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <ChallengePanel
              currentQ={currentQ}
              inputVal={inputVal}
              setInputVal={setInputVal}
              result={result}
              showCode={showCode}
            />

            <div className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
              <p className="text-xs text-slate-500">React State Management • Functional Programming • ES6+</p>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;