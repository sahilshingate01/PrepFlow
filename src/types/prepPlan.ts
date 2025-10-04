export interface Project {
  title: string;
  description: string;
  skills: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface CodingChallenge {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
}

export interface BehavioralQuestion {
  question: string;
  focus: string;
  tips: string;
}

export interface StudyPhase {
  phase: string;
  duration: string;
  focus: string[];
}

export interface StudyTimeline {
  duration: string;
  phases: StudyPhase[];
}

export interface PrepPlan {
  company: string;
  role: string;
  keySkills: string[];
  projects: Project[];
  codingChallenges: CodingChallenge[];
  behavioralQuestions: BehavioralQuestion[];
  studyTimeline: StudyTimeline;
}
