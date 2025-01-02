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
  uploadBackgroundMusic: "/page/uploadBackgroundMusic",

  // Gallery endpoints
  updateGalleryName: "/gallery/name",
  uploadGalleryImages: "/gallery/images",
  updateGalleryStatus: "/gallery/update-status",

  // Obituary management
  saveObituary: "/obituary",
  updateObituaryStatus: "/obituary/update-status",

  // Timeline management
  saveTimeline: "/timeline",
  deleteTimelineEvent: "/delete/timeline/event",

  // Gallery Management
  folders: "/folders",
  createFolder: "/gallery/folders/save",
  deleteFolder: "/gallery/folder/delete",
  deleteImage: "/gallery/delete/image",
  renameFolder: "/gallery/folders/rename",

  //Payment Management
  createPaymentIntent: "/create-payment-intent",

  // Fetch Countries
  fetchCountries: "/countries",

  // Personal Quote Management
  saveQuote: "/quote",
  updateQuoteStatus: "/quote/update-status",

  // Social Media Management
  saveSocialMediaData: "/save-social-media-data",
};
