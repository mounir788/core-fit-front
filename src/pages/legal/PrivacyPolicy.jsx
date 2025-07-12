import styled from "styled-components";
import { MainContainer } from "../../styles/generalStyles";

import Header from "../home/components/Header";

const ContentContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--mainColor);
  text-align: center;
  margin-bottom: 2rem;
`;

const LastUpdated = styled.p`
  text-align: center;
  color: var(--gray500);
  font-size: 0.9rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--gray600);
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--gray600);

  &::before {
    content: "•";
    color: var(--mainColor);
    font-weight: bold;
    margin-right: 0.75rem;
    min-width: 1rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: var(--gray500);
  font-size: 0.9rem;
`;

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* <Header>
        <MainContainer>
          <HeaderContent>
            <BackButton to="/">← Back to Home</BackButton>
            <Logo size="30px" />
          </HeaderContent>
        </MainContainer>
      </Header> */}

      <Header />

      <MainContainer style={{ paddingBlock: "100px" }}>
        <ContentContainer>
          <Title>Privacy Policy</Title>
          <LastUpdated>Last updated: {currentDate}</LastUpdated>

          <Section>
            <Text>At CoreFit, we respect your privacy.</Text>
          </Section>

          <Section>
            <List>
              <ListItem>
                We do not share your personal data (email, phone, location) with
                third parties without your consent.
              </ListItem>
              <ListItem>
                Your wallet transactions and reservation history are secure and
                private.
              </ListItem>
              <ListItem>
                All data is stored securely and used only to enhance your user
                experience.
              </ListItem>
            </List>
          </Section>

          <Section>
            <Text>
              By using CoreFit, you agree to our commitment to protecting your
              personal information.
            </Text>
          </Section>

          <Footer>
            <p>
              For questions about our privacy policy, please contact us at
              privacy@corefit.com
            </p>
          </Footer>
        </ContentContainer>
      </MainContainer>
    </>
  );
};

export default PrivacyPolicy;
