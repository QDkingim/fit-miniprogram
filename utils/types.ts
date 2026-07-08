export type DietFlag = "protein" | "carb" | "vegetable" | "sugarFree";

export interface UserProfile {
  gender: string;
  age: number;
  heightCm: number;
  startWeightKg: number;
  targetWeightKg: number;
  waistCm: number;
  sleepTargetHours: number;
  stepTarget: number;
}

export interface DailyLog {
  date: string;
  weightKg?: number;
  waistCm?: number;
  steps?: number;
  sleepHours?: number;
  waterLiters?: number;
  dietFlags: DietFlag[];
  note?: string;
}

export interface ExerciseLog {
  name: string;
  sets: number;
  target: string;
  weight?: number;
  reps?: number;
  done: boolean;
}

export interface WorkoutLog {
  date: string;
  exercises: ExerciseLog[];
  note?: string;
}

export interface CardioLog {
  date: string;
  minutes: number;
  speed: number;
  incline: number;
  fatigue: number;
  done: boolean;
  note?: string;
}

export interface ReviewStats {
  averageWeight?: number;
  latestWaist?: number;
  weightDelta?: number;
  workoutDone: number;
  cardioDone: number;
  trend: {
    date: string;
    label: string;
    weightKg?: number;
    waistCm?: number;
  }[];
  recommendation: string;
}
