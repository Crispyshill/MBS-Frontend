import { Challenge } from '../Types/Challenge';
import { UsersChallenge } from '../Types/UsersChallenge';





const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""
const CHALLENGES_ENDPOINT = process.env.REACT_APP_CHALLENGES_ENDPOINT || ""
const USERS_CHALLENGES_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT + CHALLENGES_ENDPOINT || ""




export const fetchChallenges = async (): Promise<Challenge[]> => {
    try {

      const response = await fetch(BACKEND_URL + CHALLENGES_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Failed to fetch challenges. Status: ${response.status}`);
      }
  
      const data: Challenge[] = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error fetching challenges:", error);
      return []; // Return an empty array as a fallback
    }
  };

  export const fetchUsersChallenges = async(): Promise<UsersChallenge[]> => {
    try{
          const response = await fetch(BACKEND_URL + USERS_CHALLENGES_ENDPOINT);
          if (!response.ok) {
            throw new Error(`Failed to fetch users challenges. Status: ${response.status}`);
          }
      
          const data: UsersChallenge[] = await response.json();
          return data;
    }
    catch(error){
        console.error("Error fetching users challenges:", error);
        return []; // Return an empty array as a fallback
    }
  }
  
  