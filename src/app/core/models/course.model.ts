export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  image: string;
  status: 'available' | 'hidden';
  isFree: boolean;
  modules: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      videoUrl?: string;
      completed?: boolean;
    }[];
  }[];
} 