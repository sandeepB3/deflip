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

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
  &:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.1);
  }
  `;

  
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  max-width: 80px;
  max-height: 80px;
  margin-right: 10px;
`;

const CostButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const Cost = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  padding : 0px 0px 10px 0px;
`;

const ClaimButton = styled.button`
  background-color: #fff;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {


    z-index:1;
  }
  
  `;
  const BottomSection = styled.div`
  text-align: center;
  `;
  
const BrandName = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Offer = styled.p`
  font-size: 14px;
`;

const RewardCard: React.FC<RewardCardProps> = ({ reward,onRedeem }) => {
  return (
    <CardContainer>
      <TopSection>
        <Image src="https://d8it4huxumps7.cloudfront.net/images/partners/partners75/64a795bb93523_TheMomsCo-logo.png?d=100x100" alt="Brand Logo" />
        <CostButtonContainer>
          <Cost>{reward.cost} Tokens</Cost>
          <ClaimButton>Claim Now</ClaimButton>
        </CostButtonContainer>
      </TopSection>
      <BottomSection>
        <BrandName>{reward.title}</BrandName>
        <Offer>{reward.description}</Offer>
      </BottomSection>
    </CardContainer>
  );
};
export default RewardCard;
