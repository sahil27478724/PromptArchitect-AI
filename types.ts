export enum InputType {
  IMAGE = 'IMAGE',
  SCREENSHOT = 'SCREENSHOT',
  TEXT = 'TEXT'
}

export enum ToolType {
  CHATGPT = 'ChatGPT (GPT-5.x)',
  GEMINI = 'Gemini',
  NANOBANANA = 'NanoBanana',
  LOVABLE = 'Lovable',
  IMAGE_GEN = 'Image Generation AI',
  VIBE_CODING = 'Website / Vibe-coding AI'
}

export enum QualityLevel {
  DRAFT = 'Draft',
  PRODUCTION = 'Production',
  ENTERPRISE = 'Enterprise'
}

export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}

export interface AppState {
  step: number;
  inputType: InputType | null;
  primaryFile: FileData | null;
  secondaryFiles: FileData[];
  textInput: string;
  selectedTool: ToolType | null;
  intent: string;
  quality: QualityLevel;
  constraints: string;
  generatedPrompt: string;
  isGenerating: boolean;
  error: string | null;
}

export interface WizardStepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}