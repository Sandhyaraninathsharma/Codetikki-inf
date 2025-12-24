// utils/validation.js

export const validateName = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }

  if (value.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }

  return null;
};

export const validateGmail = (email) => {
  const regex = /^[a-z0-9._%+-]+@gmail\.com$/;

  if (!email || !email.trim()) {
    return "Email is required";
  }

  if (!regex.test(email)) {
    return "Only @gmail.com email is allowed";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};
