// TokenBalance.tsx
import React from 'react';
import styled from 'styled-components';

interface TokenBalanceProps {
  balance: number;
}

const BalanceContainer = styled.div`
  margin-bottom: 20px;
`;

const TokenBalance: React.FC<TokenBalanceProps> = ({ balance }) => {
  return (
    <BalanceContainer>
      <p>Your Token Balance: {balance}</p>
    </BalanceContainer>
  );
};

export default TokenBalance;
