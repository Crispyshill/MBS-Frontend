import React from "react";

interface ChallengeCardProps {
  name: string;
  description: string;
  points: number;
  onParticipate: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ name, description, points, onParticipate }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.description}>{description}</p>
      <p style={styles.points}>Points: {points}</p>
      <button style={styles.button} onClick={onParticipate}>
        Participate
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "8px",
    color: "#333",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "8px",
    color: "#555",
  },
  points: {
    fontSize: "1rem",
    marginBottom: "16px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  button: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center" as "center",
  },
};

export default ChallengeCard;
