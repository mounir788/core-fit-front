export const passwordValidation = {
  hasUppercase: (value) =>
    !value ||
    /[A-Z]/.test(value) ||
    "Password must contain at least one uppercase letter",
  hasLowercase: (value) =>
    !value ||
    /[a-z]/.test(value) ||
    "Password must contain at least one lowercase letter",
  hasNumber: (value) =>
    !value ||
    /[0-9]/.test(value) ||
    "Password must contain at least one number",
  hasSpecialChar: (value) =>
    !value ||
    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
    "Password must contain at least one special character",
  notCommon: (value) =>
    !value ||
    !/^(123456|password|qwerty|letmein|admin|welcome)$/i.test(value) ||
    "Password is too common, choose a stronger password",
};

export const emailDomainValidation = {
  domainCheck: (value) =>
    value.endsWith("@gmail.com") ||
    value.endsWith("@yahoo.com") ||
    "Only Gmail or Yahoo domains are allowed", // Optional, remove if not needed
};

export const validateBirthDate = (value, maxAge = 100, minAge) => {
  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const isFutureDate = birthDate > today;
  const isTooYoung = age < minAge;
  const isTooOld = age > maxAge;

  if (isFutureDate) return "Birth date cannot be in the future";
  if (isTooYoung) return `You must be at least ${minAge} years old`;
  if (isTooOld) return `Birth date cannot be more than ${maxAge} years ago`;

  return true; // Valid input
};
