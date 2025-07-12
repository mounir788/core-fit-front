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
    content: "${(props) => props.number || "•"}";
    color: var(--mainColor);
    font-weight: bold;
    margin-right: 0.75rem;
    min-width: 1.5rem;
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

const TermsAndConditions = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />

      <MainContainer style={{ paddingBlock: "100px" }}>
        <ContentContainer>
          <Title>Terms and Conditions</Title>
          <LastUpdated>Last updated: {currentDate}</LastUpdated>

          <Section>
            <Text>
              By using the CoreFit app, you agree to the following terms and
              conditions:
            </Text>
          </Section>

          <Section>
            <List>
              <ListItem number="1">
                You must provide accurate personal information during
                registration.
              </ListItem>
              <ListItem number="2">
                Reservation cancellation policies may apply and vary by
                playground.
              </ListItem>
              <ListItem number="3">
                Wallet refunds are only applicable in eligible cancellation
                cases.
              </ListItem>
              <ListItem number="4">
                Marketplace orders must comply with the seller's return/refund
                policies.
              </ListItem>
              <ListItem number="5">
                Abuse of the system (fake reservations, spam orders) may result
                in account suspension.
              </ListItem>
            </List>
          </Section>

          <Section>
            <Text>
              CoreFit reserves the right to update these terms at any time.
              Continued use of the app means you accept all changes.
            </Text>
          </Section>

          <Footer>
            <p>
              For questions about these terms, please contact us at
              support@corefit.com
            </p>
          </Footer>
        </ContentContainer>
      </MainContainer>
    </>
  );
};

export default TermsAndConditions;
