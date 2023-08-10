// RewardCard.tsx
import React from 'react';
import styled from 'styled-components';

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
}

interface RewardCardProps {
  reward: Reward;
  onRedeem: (rewardCost: number) => void;
}

const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
`;

const Cost = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const RedeemButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeem }) => {
  return (
    <Card>
      <Title>{reward.title}</Title>
      <Description>{reward.description}</Description>
      <Cost>Cost: {reward.cost} tokens</Cost>
      <RedeemButton onClick={() => onRedeem(reward.cost)}>Redeem</RedeemButton>
    </Card>
  );
};

export default RewardCard;
