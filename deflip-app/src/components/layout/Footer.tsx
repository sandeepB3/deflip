import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/products">Products</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
        {/* Add more links as needed */}
      </FooterLinks>
      <CopyrightText>&copy; {new Date().getFullYear()} Your eCommerce App. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  bottom: 100px;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
`;

const FooterLink = styled(Link)`
  color: #333;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6600;
  }
`;

const CopyrightText = styled.p`
  color: #666;
  margin-top: 10px;
`;

export default Footer;
