export interface Decision {
  _id?: string;
  userId?: string;
  title: string;
  context: string;
  reasoning: string;
  assumptions: string[];
  expectedOutcome: string;
  actualOutcome?: string;
  successLevel?: number;
  unexpectedFactors?: string[];
  aiAnalysis?: {
    comparison: string;
    invalidAssumptions: string[];
    lessonsLearned: string[];
    suggestions: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
}