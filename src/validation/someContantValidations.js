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
