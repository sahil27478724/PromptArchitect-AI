import React from 'react';
import { WizardStepProps, InputType } from '../types';
import { INPUT_DESCRIPTIONS } from '../constants';
import { IconImage, IconMonitor, IconFileText, IconChevronRight } from './Icons';

export const StepInputType: React.FC<WizardStepProps> = ({ state, updateState, onNext }) => {
  const options = [
    { type: InputType.IMAGE, icon: <IconImage className="w-8 h-8 text-indigo-400" />, label: 'Image', sub: 'Photo, design, artwork' },
    { type: InputType.SCREENSHOT, icon: <IconMonitor className="w-8 h-8 text-emerald-400" />, label: 'Screenshot', sub: 'Web, app, UI layouts' },
    { type: InputType.TEXT, icon: <IconFileText className="w-8 h-8 text-amber-400" />, label: 'Text / Idea', sub: 'Content, code, strategy' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Select Input Type</h2>
        <p className="text-slate-400">What is the primary source material for this project?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => {
              updateState({ inputType: option.type });
              // Small timeout to allow visual selection feedback if desired, or instant next
              setTimeout(onNext, 150); 
            }}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02]
              ${state.inputType === option.type 
                ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/50' 
                : 'bg-slate-900 border-slate-800 hover:border-slate-600'}
            `}
          >
            <div className="mb-4">{option.icon}</div>
            <h3 className="text-lg font-semibold text-white">{option.label}</h3>
            <p className="text-sm text-slate-400 mt-1">{option.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};