import { Challenge } from '../Types/Challenge';
import { UsersChallenge } from '../Types/UsersChallenge';





const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""
const CHALLENGES_ENDPOINT = process.env.REACT_APP_CHALLENGES_ENDPOINT || ""
const USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT || ""




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

  export const fetchUsersChallenges = async(userId: String): Promise<UsersChallenge[]> => {
    try{
      console.log("fetching user challenges")
          const url = BACKEND_URL + USERS_ENDPOINT + "/" + userId + CHALLENGES_ENDPOINT
          const response = await fetch(url);
          console.log("response: " + response)
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

  export const fetchChallengeDetails = async (userChallenges: UsersChallenge[]): Promise<Challenge[]> => {
    try {
      const url = BACKEND_URL + CHALLENGES_ENDPOINT;
  
      // Use Promise.all to handle multiple asynchronous fetch calls
      const challenges = await Promise.all(
        userChallenges.map(async (userChallenge) => {
          console.log("Fetching details for challengeId: " + userChallenge.challengeid);
          const res = await fetch(`${url}/${userChallenge.challengeid}`);
          const challenge: Challenge = await res.json();
          return challenge;
        })
      );
  
      console.log("Fetched challenges:", JSON.stringify(challenges));
      return challenges; // Return all resolved challenges
    } catch (error) {
      console.error("Error fetching challenge details:", error);
      return []; // Return an empty array as a fallback
    }
  };
  
  