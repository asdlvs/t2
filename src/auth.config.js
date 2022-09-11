export const msalConfig = {
    auth: {
      clientId: "3e04707e-07cb-45e3-af94-3918579b3148",
      authority: "https://login.microsoftonline.com/db3eca71-68bb-43e0-8ed6-3a53f6dbc0ed", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "https://green-glacier-040ff8a03.1.azurestaticapps.net",
      postLogoutRedirectUri: "https://green-glacier-040ff8a03.1.azurestaticapps.net"
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["api://2b41150b-c59f-4dca-857c-60c1f96c390e/orders_user"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };