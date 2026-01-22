
export interface UserAccount {
  id?: string;
  name: string;
  email: string;
  password?: string;
  pin: string;
  balance: number;
  transactions: Transaction[];
  threat_logs?: PhishingLog[];
}

export interface PhishingLog {
  timestamp: string;
  type: 'link' | 'message';
  input: string;
  result: PhishingAnalysis;
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface PhishingAnalysis {
  riskPercentage: number;
  level: RiskLevel;
  analysis: string;
  vulnerabilities: string[];
}

export interface Transaction {
  id: string;
  to: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export type ViewState = 'landing' | 'register' | 'login' | 'dashboard' | 'transfer' | 'phishing' | 'security';
