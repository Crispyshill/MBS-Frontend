import React, { useState, useEffect } from "react";
import ChallengeList from "../Components/Challenges/ChallengeList";
import { fetchChallenges } from "../Utils/ChallengesApi";

interface Challenge {
  id: string;
  name: string;
  description: string;
  points: number;
}

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch challenges from the backend
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await fetchChallenges();
        setChallenges(data); // Set the fetched challenges
      } catch (err) {
        setError("Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  // Handle participation logic
  const handleParticipate = (id: string) => {
    console.log(`Participated in challenge with ID: ${id}`);
    // Add participation logic (e.g., API call or state update)
  };

  // Loading state
  if (loading) {
    return <div style={styles.container}>Loading challenges...</div>;
  }

  // Error state
  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  // Render challenges
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Challenges</h1>
      <ChallengeList challenges={challenges} onParticipate={handleParticipate} />
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "16px",
    color: "#333",
    textAlign: "center" as "center",
  },
};

export default Challenges;
