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
  uploadBackgroundMusic: "/page/uploadBackgroundMusic",

  // Gallery endpoints
  updateGalleryName: "/gallery/name",
  uploadGalleryImages: "/gallery/images",

  // Obituary management
  saveObituary: "/obituary",

  // Timeline management
  saveTimeline: "/timeline",
  deleteTimelineEvent : "/delete/timeline/event",

  // Gallery Management
  folders: "/folders",
  createFolder: "/gallery/folders/save",
  deleteFolder: "/gallery/folder/delete",
  deleteImage: "/gallery/delete/image",

  //Payment Management
  createPaymentIntent: "/create-payment-intent",
};
