import React from 'react';
import { IconCpu, IconSparkles, IconMonitor, IconFileText, IconImage, IconArrowLeft } from './Icons';

interface HelpPageProps {
  onBack: () => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center px-4 py-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors font-medium border border-slate-800"
        >
          <IconArrowLeft className="mr-2 w-4 h-4" /> Back to App
        </button>
      </div>

      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Mastering <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Prompt Architecture</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          How to leverage our multi-model training engine to generate production-ready outputs.
        </p>
      </div>

      {/* Section 1: The Engine (Cheat Codes) */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
            <IconCpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">The Engine: Cross-Model Training</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Not Just Prompting</h3>
            <p className="text-slate-400 leading-relaxed">
              Most users write "conversational" prompts. This system is different. It is trained on the specific latent-space architectures of models like <span className="text-white font-mono">GPT-5.x</span>, <span className="text-white font-mono">Gemini</span>, and <span className="text-white font-mono">NanoBanana</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We inject <strong className="text-indigo-400">"Cheat Codes"</strong>—structural patterns, expert personas, and constraint tokens—that force the target AI to bypass generic conversational layers and operate in "Senior Engineer" or "Expert Designer" mode.
            </p>
          </div>
          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ACTIVE INJECTIONS
            </div>
            <div className="space-y-2 opacity-80">
              <p>> Injecting Role_Anchor: "Senior Architect"</p>
              <p>> Locking Context_Window: "Strict Adherence"</p>
              <p>> Optimizing for Token_Density: High</p>
              <p>> Applying Model_Bias: {`{Target_Tool}`} Specifics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Right Process */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">The Right Process: How to Use</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: UI/Web */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IconMonitor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Website & UI</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">IN:</span> Screenshot of a layout or Figma design.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">OUT:</span> Component hierarchy, Tailwind classes, spacing tokens.
              </li>
              <li className="text-xs pt-2 border-t border-slate-800">
                <strong>Best For:</strong> Lovable, NanoBanana, Vibe-coding.
              </li>
            </ul>
          </div>

          {/* Card 2: App Logic */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <IconFileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Application Logic</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-amber-400 font-bold">IN:</span> Text description, raw code, or architecture diagrams.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">OUT:</span> System architecture, API schemas, state management logic.
              </li>
              <li className="text-xs pt-2 border-t border-slate-800">
                <strong>Best For:</strong> ChatGPT (GPT-5), Gemini.
              </li>
            </ul>
          </div>

          {/* Card 3: Visuals */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <IconImage className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Visual Arts</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">IN:</span> Mood boards, photos, sketches.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">OUT:</span> Lighting setup, camera angles, material descriptions.
              </li>
              <li className="text-xs pt-2 border-t border-slate-800">
                <strong>Best For:</strong> Image Gen AI, NanoBanana.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Step-by-Step */}
      <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Detailed Workflow</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">1</div>
            <div>
              <h4 className="text-lg font-bold text-white">Select Input Type</h4>
              <p className="text-slate-400 mt-1">Don't mix inputs. If you want a website based on a drawing, select <span className="text-white">Screenshot/Image</span>. If you want a Python script, select <span className="text-white">Text</span>. The engine changes its analysis mode based on this selection.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">2</div>
            <div>
              <h4 className="text-lg font-bold text-white">Upload Reference</h4>
              <p className="text-slate-400 mt-1">
                <strong>Tip:</strong> For screenshots, ensure the UI is clearly visible. For text, be messy—paste raw notes. The Architect will structure it for you.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">3</div>
            <div>
              <h4 className="text-lg font-bold text-white">Target Tool Selection</h4>
              <p className="text-slate-400 mt-1">
                This is critical. A prompt for <span className="text-indigo-300">Lovable</span> (which needs UI code) looks completely different from a prompt for <span className="text-emerald-300">ChatGPT</span> (which explains logic). Select the tool you will actually use.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">4</div>
            <div>
              <h4 className="text-lg font-bold text-white">Architect & Deploy</h4>
              <p className="text-slate-400 mt-1">
                We generate the final "Mega-Prompt". Copy it directly. Do not edit the core structure, as it contains the embedded role-locking and expert definitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-8">
         <button
          onClick={onBack}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-900/20 transition-all hover:scale-105"
        >
          Start Architecting Now
        </button>
      </div>
    </div>
  );
};