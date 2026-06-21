/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppLanguage = 'en' | 'ar' | 'fr' | 'es';

export interface UserProfile {
  username: string;
  nationality: string;
  age: number;
  xp: number;
  streak: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  unlockedLevels: string[]; // ['A1', 'A2', ...]
  hasSubscription: boolean;
  premiumProgress: number; // For gamification tracking
  balance: number; // Simulated € for tutor transactions
}

export interface StudyOption {
  id: string;
  type: 'grado_medio' | 'grado_superior' | 'universidad' | 'master' | 'doctorado';
  title: Record<AppLanguage, string>;
  duration: Record<AppLanguage, string>;
  requirements: Record<AppLanguage, string[]>;
  fields: Record<AppLanguage, string[]>;
  description: Record<AppLanguage, string>;
  cost: Record<AppLanguage, string>;
}

export interface VisaDocument {
  id: string;
  documentName: Record<AppLanguage, string>;
  description: Record<AppLanguage, string>;
  requiredFor: {
    nationalities: string[]; // 'all' or specific e.g. 'Morocco', 'Algeria'
    minAge?: number;
    maxAge?: number;
  };
  steps: Record<AppLanguage, string[]>;
}

export interface TransportCard {
  id: string;
  cityName: string;
  name: string;
  cost: string;
  youthDiscount: string;
  howToApply: Record<AppLanguage, string[]>;
  details: Record<AppLanguage, string>;
}

export interface RentalPlatform {
  name: string;
  logo: string;
  url: string;
  pros: Record<AppLanguage, string[]>;
  cons: Record<AppLanguage, string[]>;
  studentPopularity: string;
}

export interface JobPlatform {
  name: string;
  logo: string;
  url: string;
  focus: Record<AppLanguage, string>;
  tips: Record<AppLanguage, string[]>;
}

export interface CityGuide {
  id: string;
  name: string;
  image: string;
  highlights: Record<AppLanguage, string[]>;
  placesToVisit: Array<{
    name: string;
    description: Record<AppLanguage, string>;
    cost: string;
  }>;
  transportTips: Record<AppLanguage, string>;
}

export interface TutorListing {
  id: string;
  tutorName: string;
  avatar: string;
  bio: Record<AppLanguage, string>;
  hourlyRate: number; // in €
  rating: number;
  reviewsCount: number;
  availability: string[];
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  aiGrammarFeedback?: string; // Checked and provided by AI helper
  isSystem?: boolean;
}

export interface LessonTopic {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  pageNumber: number; // 1 to 300 representing "300 pages" across levels (50 pages/level)
  title: Record<AppLanguage, string>;
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'essays';
}
