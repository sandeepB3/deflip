import React from 'react';
import styled from 'styled-components';
import RewardCard from './RewardsCard';
import rewardsData from './rewards.json';

  const handleRedeem = (rewardCost: number) => {
    
  };


const RewardsPage: React.FC = () => {
  return (
    <Container>
      <Title>
        Redeem your Tokens
      </Title>
      <RewardsContainer>
        {rewardsData.map(reward => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeem={handleRedeem}
          />
        ))}
      </RewardsContainer>
    </Container>
  );
};

const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const RewardsContainer = styled.div`

  display: grid;
  grid-template-columns: repeat(4 , 1fr);
  gap: 20px;
  margin-top: 20px;
`;


export default RewardsPage;



