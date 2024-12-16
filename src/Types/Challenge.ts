export interface Challenge {
    id: string; // Unique identifier for the challenge
    name: string; // Name of the challenge
    description: string; // Description of the challenge
    points: number; // Points awarded for completing the challenge
    startDate?: string; // Optional: Start date for the challenge (ISO string)
    endDate?: string; // Optional: End date for the challenge (ISO string)
  }
  