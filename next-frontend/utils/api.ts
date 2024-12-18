export const API = {
  Registration: "/register",
  Login: "/login",
  VerifyEmail: "/verify-email",
  CheckVerification: "/user/validation-status/",
  Logout: "/logout",
  getUser: "/user",
  updateProfile: "/update-profile",

  // Page management
  savePageSettings: "/page/settings",
  checkExistingPage: "/page/exists",
  savePersonalDetails: "/page/personal-info",
  checkDomainAvailability: "/page/name-availability",
  uploadBackgroundImage: "/page/background-image",
  saveQuote: "/page/quote",

  // Gallery endpoints
  updateGalleryName: "/gallery/name",
  uploadGalleryImages: "/gallery/images",

  // Obituary management
  saveObituary: "/obituary",

  // Timeline management
  saveTimeline: "/timeline",
};
