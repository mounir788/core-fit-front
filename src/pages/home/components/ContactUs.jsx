import styled from "styled-components";
import { Error, MainContainer } from "../../../styles/generalStyles";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useCreateField from "../../../hooks/general/useCreateField";

const ContactSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: white;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: var(--mainColor);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: var(--mainColor);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SubmitButton = styled.button`
  background: var(--mainColor);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.13);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--mainColor);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.4;
  }
`;

const ContactUs = () => {
  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "info@corefit.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      content: "123 Main Street, City, State 12345",
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate, isPending } = useCreateField("/contact");

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <ContactSection
      as={motion.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="contact"
    >
      <MainContainer>
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionSubtitle>
          Have questions or need support? We&apos;re here to help! Reach out to
          us and we&apos;ll get back to you as soon as possible.
        </SectionSubtitle>

        <ContactGrid
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <ContactForm
            as={motion.form}
            onSubmit={handleSubmit(onSubmit)}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <FormTitle>Send us a message</FormTitle>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                placeholder="Your full name"
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                placeholder="your.email@example.com"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors?.email?.message && (
                <Error>{errors?.email?.message}</Error>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput
                type="text"
                placeholder="What is this about?"
                {...register("subject", {
                  required: "This field is required",
                })}
              />
              {errors?.subject?.message && (
                <Error>{errors?.subject?.message}</Error>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                placeholder="Tell us more about your inquiry..."
                {...register("message", {
                  required: "This field is required",
                })}
              />
              {errors?.message?.message && (
                <Error>{errors?.message?.message}</Error>
              )}
            </FormGroup>
            <SubmitButton type="submit" disabled={isPending}>
              Send Message
            </SubmitButton>
          </ContactForm>

          <ContactInfo>
            {contactInfo.map((info, index) => (
              <InfoCard
                as={motion.div}
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <InfoIcon>{info.icon}</InfoIcon>
                <InfoContent>
                  <h4>{info.title}</h4>
                  <p>{info.content}</p>
                </InfoContent>
              </InfoCard>
            ))}
          </ContactInfo>
        </ContactGrid>
      </MainContainer>
    </ContactSection>
  );
};

export default ContactUs;
