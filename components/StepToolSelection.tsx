import React from 'react';
import { WizardStepProps, ToolType } from '../types';
import { TOOL_DESCRIPTIONS } from '../constants';
import { IconCpu, IconChevronRight, IconArrowLeft } from './Icons';

export const StepToolSelection: React.FC<WizardStepProps> = ({ state, updateState, onNext, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Select Target AI Tool</h2>
        <p className="text-slate-400">The generated prompt will be architected strictly for the selected tool's capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(ToolType).map((tool) => (
          <button
            key={tool}
            onClick={() => {
              updateState({ selectedTool: tool });
              setTimeout(onNext, 150);
            }}
            className={`
              group relative p-6 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.01]
              ${state.selectedTool === tool 
                ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/50' 
                : 'bg-slate-900 border-slate-800 hover:border-slate-600'}
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <IconCpu className="w-5 h-5 text-indigo-400" />
                  {tool}
                </h3>
                <p className="text-sm text-slate-400 mt-2">{TOOL_DESCRIPTIONS[tool]}</p>
              </div>
              <div className={`
                w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                ${state.selectedTool === tool ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-700 text-transparent'}
              `}>
                <div className="w-2 h-2 bg-current rounded-full" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-start pt-6">
        <button 
          onClick={onBack}
          className="flex items-center px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors font-medium"
        >
          <IconArrowLeft className="mr-2 w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
};