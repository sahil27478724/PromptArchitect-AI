import React, { useState } from 'react';
import { WizardStepProps } from '../types';
import { IconCopy, IconCheck, IconArrowLeft } from './Icons';

export const StepResult: React.FC<WizardStepProps> = ({ state, onNext, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
      // Refresh the page or reset state via a passed prop if we wanted a smoother reset.
      // For simplicity in this architecture, we will just reload or user can use 'Back' to edit params.
      window.location.reload(); 
  }

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Architecture Complete
        </h2>
        <p className="text-slate-400">Your production-ready prompt is ready for deployment.</p>
      </div>

      <div className="relative flex-grow bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-4 z-10">
          <button
            onClick={handleCopy}
            className={`
              flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg
              ${copied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-800 text-slate-200 hover:bg-indigo-600 hover:text-white'}
            `}
          >
            {copied ? (
              <>
                <IconCheck className="w-4 h-4 mr-2" /> Copied
              </>
            ) : (
              <>
                <IconCopy className="w-4 h-4 mr-2" /> Copy Prompt
              </>
            )}
          </button>
        </div>

        <div className="h-[500px] overflow-y-auto p-6 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {state.generatedPrompt}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={handleReset}
          className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
        >
          Start New Architecture
        </button>
      </div>
    </div>
  );
};