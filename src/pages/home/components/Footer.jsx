import styled from "styled-components";
import { MainContainer } from "../../../styles/generalStyles";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../../../components/Logo";
import { Link } from "react-router";
import { motion } from "framer-motion";

const FooterSection = styled.footer`
  background: #1a202c;
  color: white;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #a0aec0;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.5rem;

  a {
    color: #a0aec0;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--mainColor);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2d3748;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--mainColor);
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #2d3748;
  padding-top: 2rem;
  text-align: center;
  color: #a0aec0;
  font-size: 0.9rem;
`;

const LogoContainer = styled.div`
  margin-bottom: 1rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection
      as={motion.footer}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <MainContainer>
        <FooterContent>
          <FooterColumn>
            <LogoContainer>
              <Logo size="30px" />
            </LogoContainer>
            <p>
              Connecting communities with amazing playgrounds and local
              businesses. Discover, book, and enjoy the best experiences in your
              area.
            </p>
            <SocialLinks>
              <SocialIcon href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
            </SocialLinks>
          </FooterColumn>

          {/* <FooterColumn>
            <h3>Platform</h3>
            <FooterLinks>
              <FooterLink>
                <a href="#">Playgrounds</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Stores</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Booking</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Reviews</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Map</a>
              </FooterLink>
            </FooterLinks>
          </FooterColumn> */}

          <FooterColumn>
            <h3>Company</h3>
            <FooterLinks>
              <FooterLink>
                <a href="#about">About Us</a>
              </FooterLink>
              <FooterLink>
                <a href="#features">Features</a>
              </FooterLink>
              <FooterLink>
                <a href="#smart-lock">Smart Lock</a>
              </FooterLink>
              <FooterLink>
                <a href="#feedback">Feedback</a>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Support</h3>
            <FooterLinks>
              <FooterLink>
                <a href="#contact">Contact Us</a>
              </FooterLink>
              <FooterLink>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/terms">Terms of Service</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <p>&copy; {currentYear} CoreFit. All rights reserved.</p>
        </FooterBottom>
      </MainContainer>
    </FooterSection>
  );
};

export default Footer;
