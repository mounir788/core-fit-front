import styled from "styled-components";

// Progress bar container
const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-inline: auto;
`;

// Individual step circle
const Step = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? "var(--mainColor)" : "var(--gray300)"};
  display: grid;
  place-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition-delay: 350ms;
  transition: 100ms ease-in-out;
`;

// Connector line
const Connector = styled.div`
  position: absolute;
  left: 75%;
  top: 12px;
  height: 4px;
  width: 65px;
  background: var(--gray300);
  border-radius: 6px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--mainColor);
    width: ${({ $active }) => ($active ? "100%" : 0)};
    transition: 300ms ease-in-out;
  }
`;

// Label below each step
const StepWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100px;
`;

const StepLabel = styled.span`
  margin-top: 6px;
  font-size: 10px;
  text-transform: capitalize;
  color: ${({ $active }) => ($active ? "var(--mainColor)" : "var(--gray400)")};
`;

const ProgressBar = ({ currentStep, steps }) => {
  return (
    <ProgressContainer>
      {steps.map((step, index) => (
        <StepWrapper key={step.server}>
          <Step $active={index <= currentStep.index}>{index + 1}</Step>
          {index < steps.length - 1 && (
            <Connector $active={index < currentStep.index} />
          )}
          <StepLabel $active={index <= currentStep.index}>
            {step.server.replace("_", " ")}
          </StepLabel>
        </StepWrapper>
      ))}
    </ProgressContainer>
  );
};

export default ProgressBar;
