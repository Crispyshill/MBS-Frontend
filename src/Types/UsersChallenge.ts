export interface UsersChallenge {
    challengeid: string; // Unique identifier for the challenge
    userid: string;
    iscompleted: boolean; // If the user completed the challenge
    completedDate: string;
}
  