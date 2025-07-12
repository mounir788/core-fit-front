import styled from "styled-components";
import { MainContainer } from "../../../styles/generalStyles";
import {
  FaLock,
  FaShieldAlt,
  FaClock,
  FaMobileAlt,
  FaUserCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DoorLockSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--mainColor);
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  color: var(--gray500);
  line-height: 1.6;
`;

const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureContent = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--gray700);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--gray600);
    margin-bottom: 1.5rem;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--gray600);

  &::before {
    content: "✓";
    color: var(--mainColor);
    font-weight: bold;
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
`;

const FeatureImage = styled.div`
  background: linear-gradient(135deg, var(--mainColor), #0f7a3d);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
`;

const LockIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const LockTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const LockDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* border: 1px solid #e2e8f0; */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--mainColor), #0f7a3d);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--gray700);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--gray500);
`;

const DoorLockFeature = () => {
  const stats = [
    { icon: <FaShieldAlt />, number: "100%", label: "Secure Access" },
    { icon: <FaClock />, number: "24/7", label: "Availability" },
    { icon: <FaMobileAlt />, number: "Instant", label: "Mobile Control" },
    { icon: <FaUserCheck />, number: "0", label: "Unauthorized Access" },
  ];

  return (
    <DoorLockSection
      as={motion.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="smart-lock"
    >
      <MainContainer>
        <SectionTitle>Smart Playground Door Lock</SectionTitle>
        <SectionSubtitle>
          Experience the future of playground access with our integrated smart
          door lock system. Secure, convenient, and fully automated access
          control for your peace of mind.
        </SectionSubtitle>
        <FeatureContainer
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <FeatureContent
            as={motion.div}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3>Revolutionary Access Control</h3>
            <p>
              Our smart door lock system integrates seamlessly with our booking
              platform, providing secure access to playgrounds only during
              authorized time slots. No more physical keys or manual access
              management.
            </p>
            <p>
              The system automatically unlocks doors for users with valid
              bookings and locks them when the session ends, ensuring complete
              security and convenience.
            </p>
            <BenefitsList>
              <BenefitItem>
                Automatic door unlocking for booked time slots
              </BenefitItem>
              <BenefitItem>Real-time access control and monitoring</BenefitItem>
              <BenefitItem>
                Mobile app integration for remote access
              </BenefitItem>
              <BenefitItem>
                Secure authentication and user verification
              </BenefitItem>
              <BenefitItem>Automatic locking when sessions expire</BenefitItem>
              <BenefitItem>24/7 monitoring and security alerts</BenefitItem>
            </BenefitsList>
          </FeatureContent>
          <FeatureImage
            as={motion.div}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <LockIcon>
              <FaLock />
            </LockIcon>
            <LockTitle>Smart Access</LockTitle>
            <LockDescription>
              Connected to our backend system for real-time access control and
              security monitoring
            </LockDescription>
          </FeatureImage>
        </FeatureContainer>
        <StatsGrid
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {stats.map((stat, index) => (
            <StatCard
              as={motion.div}
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </MainContainer>
    </DoorLockSection>
  );
};

export default DoorLockFeature;
