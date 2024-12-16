export interface UsersChallenge {
    id: string; // Unique identifier for the challenge
    userId: string;
    isCompleted: boolean; // If the user completed the challenge
    completedDate: string;
}
  