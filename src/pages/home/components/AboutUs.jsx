import styled from "styled-components";
import { MainContainer } from "../../../styles/generalStyles";
import { FaUsers, FaMapMarkedAlt, FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--mainColor);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentText = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    opacity: 0.9;
    margin-bottom: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 1rem;

  &::before {
    content: "✓";
    color: var(--mainColor);
    font-weight: bold;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const AboutUs = () => {
  const stats = [
    { icon: <FaUsers />, number: "10K+", label: "Happy Users" },
    { icon: <FaMapMarkedAlt />, number: "500+", label: "Locations" },
    { icon: <FaStar />, number: "4.9", label: "Average Rating" },
    { icon: <FaHeart />, number: "99%", label: "Satisfaction" },
  ];

  return (
    <AboutSection
      as={motion.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="about"
    >
      <MainContainer>
        <SectionTitle>About Us</SectionTitle>
        <SectionSubtitle>
          We&apos;re revolutionizing the way people discover and book
          playgrounds and stores. Our platform connects communities with amazing
          local businesses.
        </SectionSubtitle>

        <StatsContainer
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
        </StatsContainer>

        <ContentGrid>
          {[0, 1].map((i) => (
            <ContentText
              as={motion.div}
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + i * 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {i === 0 ? (
                <>
                  <h3>Our Mission</h3>
                  <p>
                    We believe that every community deserves access to quality
                    playgrounds and local businesses. Our platform makes it easy
                    for families to discover new places to play and shop, while
                    helping local businesses thrive.
                  </p>
                  <FeatureList>
                    <FeatureItem>
                      Easy booking and reservation system
                    </FeatureItem>
                    <FeatureItem>Verified and safe locations</FeatureItem>
                    <FeatureItem>Real-time availability updates</FeatureItem>
                    <FeatureItem>Community reviews and ratings</FeatureItem>
                  </FeatureList>
                </>
              ) : (
                <>
                  <h3>Why Choose Us</h3>
                  <p>
                    With years of experience in connecting communities,
                    we&apos;ve built a platform that prioritizes user
                    experience, safety, and local business growth. Our
                    commitment to quality and innovation drives everything we
                    do.
                  </p>
                  <p>
                    Whether you&apos;re a family looking for the perfect
                    playground or a business owner wanting to reach more
                    customers, we&apos;re here to help you succeed.
                  </p>
                </>
              )}
            </ContentText>
          ))}
        </ContentGrid>
      </MainContainer>
    </AboutSection>
  );
};

export default AboutUs;
