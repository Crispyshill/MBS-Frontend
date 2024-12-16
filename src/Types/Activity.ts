export interface Activity {
    id: string;
    name: string;
    type: 'exercise' | 'study' | 'mindfulness';
    points: number;
    date: string;
    userId: string;
  }
  