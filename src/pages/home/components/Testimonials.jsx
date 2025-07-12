import styled, { keyframes } from "styled-components";
import { MainContainer } from "../../../styles/generalStyles";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const TestimonialsSection = styled.section`
  padding: 100px 0;
  background: #fff;
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

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ScrollWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 400px;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 40s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  position: relative;
  min-width: 400px;
  max-width: 400px;
  margin-right: 2rem;
  flex: 0 0 auto;
  transition: transform 0.3s ease;
  /* border: 1px solid #e2e8f0; */
  overflow: hidden;

  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, var(--mainColor), #667eea);
    border-radius: 20px 20px 0 0;
    z-index: 2;
  }
`;

const QuoteIcon = styled.div`
  /* position: absolute;
  top: -15px;
  left: 30px; */
  width: 30px;
  height: 30px;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--mainColor), #667eea);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--gray600);
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--mainColor), #667eea);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const UserDetails = styled.div`
  flex: 1;
  margin-top: auto;
`;

const UserName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray700);
  margin-bottom: 0.25rem;
`;

const UserRole = styled.p`
  font-size: 0.9rem;
  color: var(--gray500);
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #ffd700;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const testimonials = [
  {
    text: "This platform has completely changed how we find playgrounds and discover new stores for our family. The booking system is so easy and the locations are always well-maintained.",
    name: "Sarah Johnson",
    role: "Parent & Shopper",
    rating: 5,
    avatar: "SJ",
  },
  {
    text: "As a playground and store owner, this platform has helped me reach so many more families and customers. The interface is intuitive and the support team is amazing.",
    name: "Mike Chen",
    role: "Playground & Store Owner",
    rating: 5,
    avatar: "MC",
  },
  {
    text: "I love how I can discover new stores and playgrounds in my area. The reviews are genuine and the booking process is seamless.",
    name: "Emily Rodriguez",
    role: "Local Resident",
    rating: 5,
    avatar: "ER",
  },
  {
    text: "The mobile app is fantastic! I can book playgrounds and shop on the go. The real-time updates are a game-changer.",
    name: "David Thompson",
    role: "Tech Enthusiast",
    rating: 5,
    avatar: "DT",
  },
  {
    text: "Great platform for connecting with local businesses. The verification system gives me confidence in the quality of both playgrounds and stores.",
    name: "Lisa Wang",
    role: "Business Owner",
    rating: 5,
    avatar: "LW",
  },
  {
    text: "My kids love discovering new playgrounds and I enjoy finding unique stores through this app. The photos and descriptions help us choose the perfect spot every time.",
    name: "James Wilson",
    role: "Father & Shopper",
    rating: 5,
    avatar: "JW",
  },
];

const Testimonials = () => {
  // Duplicate testimonials for seamless infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];
  return (
    <TestimonialsSection
      as={motion.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="feedback"
    >
      <MainContainer>
        <SectionTitle>What Our Users Say</SectionTitle>
        <SectionSubtitle>
          Don&apos;t just take our word for it. Here&apos;s what our community
          members have to say about their experience.
        </SectionSubtitle>
        <ScrollWrapper>
          <Row
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard
                as={motion.div}
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <UserInfo>
                  <UserAvatar>{testimonial.avatar}</UserAvatar>
                  <UserDetails>
                    <UserName>{testimonial.name}</UserName>
                    <UserRole>{testimonial.role}</UserRole>
                    <Rating>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </Rating>
                  </UserDetails>
                </UserInfo>
              </TestimonialCard>
            ))}
          </Row>
        </ScrollWrapper>
      </MainContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;
