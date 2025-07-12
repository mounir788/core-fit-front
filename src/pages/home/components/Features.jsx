import styled from "styled-components";
import { MainContainer } from "../../../styles/generalStyles";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaStar,
  FaMobileAlt,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: #fff;
  color: var(--gray700);
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
  max-width: 600px;
  margin: 0 auto 4rem;
  color: var(--gray500);
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f3f7f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--mainColor);
  font-size: 2rem;
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray700);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--gray500);
`;

const CTAButton = styled(Link)`
  width: fit-content;
  background: var(--mainColor);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.13);
  }
`;

const Features = () => {
  const features = [
    {
      icon: <FaSearch />,
      title: "Easy Discovery",
      description:
        "Find the perfect playgrounds and stores near you with our advanced search and filtering system.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Simple Booking",
      description:
        "Book reservations instantly for both playgrounds and stores with our streamlined booking process.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Real-time Location",
      description:
        "Get accurate directions and real-time location data to find your destination easily.",
    },
    {
      icon: <FaStar />,
      title: "Verified Reviews",
      description:
        "Read authentic reviews from real users to make informed decisions about where to play or shop.",
    },
    {
      icon: <FaLock />,
      title: "Smart Door Locks (Playgrounds)",
      description:
        "Secure access to playgrounds with our integrated door lock system. Only authorized users can enter during booked time slots.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Friendly",
      description:
        "Access our platform from any device with our responsive design and mobile app.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Your data and transactions are protected with enterprise-grade security measures.",
    },
  ];

  return (
    <FeaturesSection
      as={motion.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="features"
    >
      <MainContainer>
        <SectionTitle>Why Choose Our Platform</SectionTitle>
        <SectionSubtitle>
          Discover, book, and enjoy the best <b>playgrounds and stores</b> in
          your area. Here&apos;s what makes us different.
        </SectionSubtitle>
        <FeaturesGrid
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              as={motion.div}
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        <CTAButton to="/register">Get Started Today</CTAButton>
      </MainContainer>
    </FeaturesSection>
  );
};

export default Features;
