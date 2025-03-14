export const API = {
  Registration: "/register",
  Login: "/login",
  VerifyEmail: "/verify-email",
  resendCode: "/resend-OTP",
  CheckVerification: "/user/validation-status/",
  Logout: "/logout",
  getUser: "/user",
  updateProfile: "/update-profile",
  updatePassword: "/update-password",
  sendForgotPasswordOTP: "/send-reset-otp",
  validateForgotPasswordOTP: "/verify-reset-otp",
  updateNewPassword: "/update-new-password",
  validatePasswordResetToken: "/validate-password-reset-token",
  fetchReCaptchaKey: "/get-recaptcha-key",
  submitRequestDemoForm: "/submit-request-demo",
  requestAccountDelete: "/request-account-deletion",

  // Page management
  savePageSettings: "/page/settings",
  checkExistingPage: "/page/exists",
  savePersonalDetails: "/page/personal-info",
  checkDomainAvailability: "/page/name-availability",
  uploadBackgroundImage: "/page/background-image",
  uploadBackgroundMusic: "/page/uploadBackgroundMusic",
  deleteBackgroundMusic: "/page/deleteBackgroundMusic",
  verifyPassword: "/verify-password",

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

  // Order Management
  getOrders: "/orders",

  // Fovourite Management
  updateFavouriteTagline: "/favourite/update-tagline",
  updateFavouriteEvents: "/favourite/update-events",
  deleteFavouriteEvent: "/favourite/delete-event",

  // Contribution Management
  updateContributionTagline: "/contribution/update-tagline",
  storeContributionData: "/contribution/store-data",
  updateContributionData: "/contribution/update-data",
  deleteContribution: "/contribution/delete",
  storeUserContributionData: "/storeUserContributionData",
  getContributionRequests: "/contribution/contribution-requests",
  updateContributionRequestStatus: "/contribution/update/requests",

  // Request Access
  requestAccess: "/request-access",
  getAccessRequests: "/all-access-requests",
  updateAccessRequestStatus: "/update/access-requests",
  verifyRequestAccessData: "/verify/request-access-data",
  submitUserChanges: "/submit/user-Changes",
  updateUserChanges: "/update/user-Changes",

  // Checkout
  createOrder: "/orders/create",
  getOrderDetails: "/getOrderDetails",
  createCheckoutSession: "/create-checkout-session",

  // Plans Listing

  fetchAllPlans: "/plans/listing",
};
