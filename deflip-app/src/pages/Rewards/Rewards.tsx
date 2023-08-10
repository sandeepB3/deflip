// RewardsPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import rewardsData from './rewards.json';
import TokenBalance from './TokenBalance';
import RewardCard from './RewardsCard';

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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RewardsPage: React.FC = () => {
  const [tokenBalance, setTokenBalance] = useState<number>(1000); // Example initial token balance

  const handleRedeem = (rewardCost: number) => {
    if (tokenBalance >= rewardCost) {
      setTokenBalance(prevBalance => prevBalance - rewardCost);
      // Implement logic to actually redeem the reward
    } else {
      alert('Insufficient tokens.');
    }
  };

  return (
    <Container>
      <Title>Redeem Your Tokens</Title>
      <TokenBalance balance={tokenBalance} />
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

export default RewardsPage;
