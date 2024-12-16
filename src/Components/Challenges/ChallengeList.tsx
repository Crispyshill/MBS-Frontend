import React from "react";
import ChallengeCard from "./ChallengeCard";

interface Challenge {
  id: string;
  name: string;
  description: string;
  points: number;
}

interface ChallengeListProps {
  challenges: Challenge[];
  onParticipate: (id: string) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges, onParticipate }) => {
  return (
    <div style={styles.container}>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          name={challenge.name}
          description={challenge.description}
          points={challenge.points}
          onParticipate={() => onParticipate(challenge.id)}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    gap: "16px",
    justifyContent: "center",
  },
};

export default ChallengeList;
