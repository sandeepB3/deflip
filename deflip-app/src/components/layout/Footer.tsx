import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const FooterContainer = styled.footer`
display: flex;
flex-direction : column;
  background-color: #232f3e;
  color: #fff;
  padding: 30px 0;
  text-align: center;
  align-items : center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#">About Us</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
      </FooterLinks>
      <FooterText>&copy; 2023 De-Flipkart Store. All rights reserved by 686157-U3IPZ641.</FooterText>
    </FooterContainer>
  );
};
export default Footer;
// const Footer: React.FC = () => {
//   return (
//     <FooterContainer>
//       <FooterLinks>
//         <FooterLink to="/">Home</FooterLink>
//         <FooterLink to="/products">Products</FooterLink>
//         <FooterLink to="/contact">Contact</FooterLink>
//         {/* Add more links as needed */}
//       </FooterLinks>
//       <CopyrightText>&copy; {new Date().getFullYear()} Your eCommerce App. All rights reserved.</CopyrightText>
//     </FooterContainer>
//   );
// };

// const FooterContainer = styled.footer`
//   background-color: #f5f5f5;
//   padding: 20px;
//   text-align: center;
//   bottom: 100px;
// `;

// const FooterLinks = styled.div`
//   margin-top: 10px;
// `;

// const FooterLink = styled(Link)`
//   color: #333;
//   margin: 0 10px;
//   text-decoration: none;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #ff6600;
//   }
// `;

// const CopyrightText = styled.p`
//   color: #666;
//   margin-top: 10px;
// `;

// export default Footer;
