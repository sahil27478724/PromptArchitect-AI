import React from 'react';
import { WizardStepProps, QualityLevel } from '../types';
import { generateArchitectPrompt } from '../services/geminiService';
import { IconSparkles, IconArrowLeft } from './Icons';

export const StepRefinement: React.FC<WizardStepProps> = ({ state, updateState, onNext, onBack }) => {

  const handleGenerate = async () => {
    updateState({ isGenerating: true, error: null });
    try {
      const prompt = await generateArchitectPrompt(state);
      updateState({ generatedPrompt: prompt, isGenerating: false });
      onNext();
    } catch (err: any) {
      updateState({ 
        isGenerating: false, 
        error: err.message || "An unexpected error occurred." 
      });
    }
  };

  const isReady = state.intent.length > 5;

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Define Intent</h2>
        <p className="text-slate-400">Brief the architect on your specific goals.</p>
      </div>

      <div className="space-y-6">
        {/* Intent */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">What do you want to create or modify?</label>
          <textarea
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
            placeholder="e.g. Turn this wireframe into a modern React landing page."
            value={state.intent}
            onChange={(e) => updateState({ intent: e.target.value })}
          />
        </div>

        {/* Quality Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Expected Output Quality</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(QualityLevel).map((q) => (
              <button
                key={q}
                onClick={() => updateState({ quality: q })}
                className={`
                  py-3 px-2 rounded-lg text-sm font-medium border transition-colors
                  ${state.quality === q 
                    ? 'bg-indigo-600 border-indigo-500 text-white' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}
                `}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Constraints (Optional)</label>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="e.g. Must use Tailwind, Dark mode only, fast loading"
            value={state.constraints}
            onChange={(e) => updateState({ constraints: e.target.value })}
          />
        </div>

        {state.error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {state.error}
            </div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button 
          onClick={onBack}
          disabled={state.isGenerating}
          className="flex items-center px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors font-medium disabled:opacity-50"
        >
          <IconArrowLeft className="mr-2 w-4 h-4" /> Back
        </button>
        
        <button
          onClick={handleGenerate}
          disabled={!isReady || state.isGenerating}
          className={`
            flex items-center px-8 py-3 rounded-lg font-bold transition-all w-full md:w-auto justify-center
            ${isReady && !state.isGenerating
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          {state.isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Architecting Prompt...
            </>
          ) : (
            <>
              Generate Prompt <IconSparkles className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};