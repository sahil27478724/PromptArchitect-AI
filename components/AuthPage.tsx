import React, { useState } from 'react';
import { IconGoogle, IconCpu } from './Icons';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await window.aistudio.openSelectKey();
      // Assume success as per race condition handling instructions
      onLoginSuccess();
    } catch (e: any) {
      console.error(e);
      // Even if "Requested entity was not found" occurs, we let the user try again
      setError("Unable to authenticate. Please try selecting your API key again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-8">
        {/* Logo Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
             <IconCpu className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            PromptArchitect <span className="text-slate-500 font-normal">AI</span>
          </h1>
          <p className="text-slate-400">
            Automated prompt engineering for enterprise-grade outputs.
          </p>
        </div>

        <div className="h-px bg-slate-800 w-full" />

        {/* Auth Button */}
        <div className="space-y-4">
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
               <IconGoogle className="w-5 h-5" />
            )}
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>
          
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            By signing in, you agree to connect your Google Cloud API key for processing.
            <br/>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline mt-2 inline-block">
              View Billing Documentation
            </a>
          </p>
        </div>

        {error && (
            <div className="text-red-400 text-sm bg-red-950/20 p-3 rounded-lg border border-red-900/50">
                {error}
            </div>
        )}
      </div>
    </div>
  );
};