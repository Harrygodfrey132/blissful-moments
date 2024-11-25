import validator from "validator";

const sharedRules = {
  email: {
    required: "Email is required",
    validate: (value: string) => {
      if (!value) return "Email is required";
      if (!validator.isEmail(value)) {
        return "Please enter a valid email address";
      }
      return true; // No error
    },
  },
  password: {
    required: "Password is required",
    validate: (value: string) => {
      if (!value) return "Password is required";
      if (!validator.isLength(value, { min: 8 })) {
        return "Password must be at least 8 characters long";
      }
      if (!validator.matches(value, /[A-Z]/)) {
        return "Password must contain at least one uppercase letter";
      }
      if (!validator.matches(value, /[a-z]/)) {
        return "Password must contain at least one lowercase letter";
      }
      if (!validator.matches(value, /\d/)) {
        return "Password must contain at least one number";
      }
      if (!validator.matches(value, /[!@#$%^&*(),.?":{}|<>]/)) {
        return "Password must contain at least one special character";
      }
      return true; // No error
    },
  },
};

export const validateSignup = {
  firstName: {
    required: "First name is required",
  },
  lastName: {
    required: "Last name is required",
  },
  email: sharedRules.email,
  password: sharedRules.password,
  confirmPassword: {
    required: "Confirm Password is required",
    validate: (value: string, data: any) => {
      if (value !== data.password) {
        return "Passwords do not match";
      }
      return true;
    },
  },
  terms: {
    required: "You must accept the terms and conditions",
  },
};

export const validateLogin = {
  email: sharedRules.email,
  password: {
    required: "Password is required",
    validate: (value: string) => {
      if (!value) return "Password is required";
      if (!validator.isLength(value, { min: 8 })) {
        return "Password must be at least 8 characters long";
      }
      return true; // No error
    },
  },
};
