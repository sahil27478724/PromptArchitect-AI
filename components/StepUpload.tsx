import React, { useRef } from 'react';
import { WizardStepProps, InputType, FileData } from '../types';
import { IconUpload, IconFileText, IconCheck, IconChevronRight, IconArrowLeft } from './Icons';

export const StepUpload: React.FC<WizardStepProps> = ({ state, updateState, onNext, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPrimary: boolean) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Strip data:image/xyz;base64, prefix for the API
        const base64Content = base64String.split(',')[1];
        
        const fileData: FileData = {
          base64: base64Content,
          mimeType: file.type,
          name: file.name
        };

        if (isPrimary) {
          updateState({ primaryFile: fileData });
        } else {
          updateState({ secondaryFiles: [...state.secondaryFiles, fileData] });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const isReady = () => {
    if (state.inputType === InputType.TEXT) {
      return state.textInput.trim().length > 10;
    }
    return !!state.primaryFile;
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">
          {state.inputType === InputType.TEXT ? 'Describe Your Idea' : 'Upload Reference'}
        </h2>
        <p className="text-slate-400">
          {state.inputType === InputType.TEXT 
            ? 'Paste your raw content, strategy, or code snippets.' 
            : 'The primary file defines the core structure. Secondary files add style modifiers.'}
        </p>
      </div>

      {state.inputType === InputType.TEXT ? (
        <div className="space-y-4">
          <textarea
            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none font-mono text-sm"
            placeholder="e.g. I want to build a dashboard for a logistics company using React..."
            value={state.textInput}
            onChange={(e) => updateState({ textInput: e.target.value })}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Primary Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              cursor-pointer group relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all
              ${state.primaryFile 
                ? 'border-emerald-500/50 bg-emerald-950/10' 
                : 'border-slate-700 hover:border-indigo-500 bg-slate-900 hover:bg-slate-800'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, true)}
            />
            
            {state.primaryFile ? (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <IconCheck />
                </div>
                <p className="text-emerald-400 font-medium">{state.primaryFile.name}</p>
                <p className="text-xs text-emerald-500/70">Click to replace</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <IconUpload />
                </div>
                <p className="text-slate-300 font-medium">Upload Primary Reference</p>
                <p className="text-xs text-slate-500">JPG, PNG, WEBP supported</p>
              </div>
            )}
          </div>

          {/* Secondary Upload (Small) */}
          {state.primaryFile && (
             <div className="space-y-2">
                <label className="text-sm text-slate-400 font-medium">Secondary References (Optional)</label>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  <label className="flex-shrink-0 cursor-pointer w-32 h-32 rounded-lg border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, false)}
                    />
                    <span className="text-2xl">+</span>
                    <span className="text-xs">Add</span>
                  </label>
                  
                  {state.secondaryFiles.map((file, idx) => (
                    <div key={idx} className="flex-shrink-0 w-32 h-32 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center relative overflow-hidden">
                       <img src={`data:${file.mimeType};base64,${file.base64}`} alt="preview" className="object-cover w-full h-full opacity-60" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <IconCheck className="text-emerald-400" />
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button 
          onClick={onBack}
          className="flex items-center px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors font-medium"
        >
          <IconArrowLeft className="mr-2 w-4 h-4" /> Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!isReady()}
          className={`
            flex items-center px-8 py-3 rounded-lg font-bold transition-all
            ${isReady() 
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          Next Step <IconChevronRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};