import React, { useEffect, useState } from "react";
import { fetchUserById } from "../Utils/Api";
import { fetchUsersChallenges, fetchChallengeDetails } from "../Utils/ChallengesApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import { User } from "../Types/User";
import { UsersChallenge } from "../Types/UsersChallenge";
import { Challenge } from "../Types/Challenge";

const ProfilePage: React.FC = () => {
  const { externalId } = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState<User | null>(null);
  const [combinedChallenges, setCombinedChallenges] = useState<
    (Challenge & { isCompleted: boolean; completedDate: string | null })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!externalId) return;
  
      try {
        // Fetch user data
        const userData = await fetchUserById(externalId);
        setUser(userData);
  
        // Fetch user's challenges and details
        const userChallenges = await fetchUsersChallenges(externalId); // Contains isCompleted, challengeId
        let challengeDetails = await fetchChallengeDetails(userChallenges);
        challengeDetails = challengeDetails.flat()
        // Combine userChallenges and challengeDetails with default values
        const combined = userChallenges.map((userChallenge: UsersChallenge) => {
          const details = challengeDetails.find(
            (challenge: Challenge) => challenge.id === userChallenge.challengeid
          );
        console.log("Is it completed? " + userChallenge.iscompleted)
        
          // Explicitly construct an object matching the required type
          return {
            id: details?.id || userChallenge.challengeid,
            name: details?.name ?? "Unknown Challenge",
            description: details?.description ?? "No description available.",
            points: details?.points ?? 0,
            startDate: details?.startDate ?? null,
            endDate: details?.endDate ?? null,
            isCompleted: userChallenge.iscompleted,
            completedDate: userChallenge.completedDate || null,
          } as Challenge & { isCompleted: boolean; completedDate: string | null };
        });
        
  
        setCombinedChallenges(combined);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile or challenges.");
      } finally {
        setLoading(false);
      }
    };
  
    loadProfile();
  }, [externalId]);
  

  const handleCompleteChallenge = async (challengeId: string) => {
    try {
      // Complete the challenge via API
      await fetch(`/api/challenges/${challengeId}/complete`, { method: "POST" });
      setCombinedChallenges((prev) =>
        prev.map((challenge) =>
          challenge.id === challengeId
            ? { ...challenge, isCompleted: true, completedDate: new Date().toISOString() }
            : challenge
        )
      );
    } catch (err) {
      console.error("Error completing challenge:", err);
      setError("Failed to complete the challenge.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Total Points: {user.totalPoints}</p>

      <h2>Participating Challenges</h2>
      {combinedChallenges.length > 0 ? (
        <ul style={styles.list}>
          {combinedChallenges.map((challenge) => (
            <li key={challenge.id} style={styles.challengeItem}>
              <h3>{challenge.name}</h3>
              <p>{challenge.description}</p>
              <p>Points: {challenge.points}</p>
              {challenge.isCompleted ? (
                <span style={styles.completedText}>Completed</span>
              ) : (
                <button
                  style={styles.completeButton}
                  onClick={() => handleCompleteChallenge(challenge.id)}
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No challenges found.</p>
      )}
    </div>
  );
};

const styles = {
  list: {
    padding: 0,
    listStyle: "none",
  },
  challengeItem: {
    marginBottom: "16px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  completedText: {
    color: "green",
    fontWeight: "bold",
  },
};

export default ProfilePage;
