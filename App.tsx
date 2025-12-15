import React, { useState } from 'react';
import { AppState, InputType, QualityLevel, ToolType } from './types';
import { StepInputType } from './components/StepInputType';
import { StepUpload } from './components/StepUpload';
import { StepToolSelection } from './components/StepToolSelection';
import { StepRefinement } from './components/StepRefinement';
import { StepResult } from './components/StepResult';
import { HelpPage } from './components/HelpPage';
import { IconBook } from './components/Icons';

type ViewMode = 'wizard' | 'help';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('wizard');
  const [state, setState] = useState<AppState>({
    step: 1,
    inputType: null,
    primaryFile: null,
    secondaryFiles: [],
    textInput: '',
    selectedTool: null,
    intent: '',
    quality: QualityLevel.PRODUCTION,
    constraints: '',
    generatedPrompt: '',
    isGenerating: false,
    error: null,
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateState({ step: state.step + 1 });
  const prevStep = () => updateState({ step: Math.max(1, state.step - 1) });

  const renderContent = () => {
    if (view === 'help') {
      return <HelpPage onBack={() => setView('wizard')} />;
    }

    const props = { state, updateState, onNext: nextStep, onBack: prevStep };
    switch (state.step) {
      case 1: return <StepInputType {...props} />;
      case 2: return <StepUpload {...props} />;
      case 3: return <StepToolSelection {...props} />;
      case 4: return <StepRefinement {...props} />;
      case 5: return <StepResult {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('wizard')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              P
            </div>
            <h1 className="font-bold text-lg tracking-tight">PromptArchitect <span className="text-slate-500 font-normal text-sm">AI</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView(view === 'help' ? 'wizard' : 'help')}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${view === 'help' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
              `}
            >
              <IconBook className="w-4 h-4" />
              {view === 'help' ? 'Back to App' : 'How to Use'}
            </button>
            <div className="text-xs font-mono text-slate-500 border-l border-slate-800 pl-4">
              v1.0.0
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Progress Bar (Only in Wizard mode and before completion) */}
          {view === 'wizard' && state.step < 5 && (
            <div className="mb-12 max-w-xl mx-auto">
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                  style={{ width: `${(state.step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Content */}
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-600 text-sm">
        <p>© 2024 PromptArchitect. Powered by Gemini 2.5.</p>
      </footer>
    </div>
  );
};

export default App;