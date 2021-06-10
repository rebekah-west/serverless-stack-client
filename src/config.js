const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "armoire-uploads",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://xz9hfnuudl.execute-api.us-east-1.amazonaws.com/dev",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_Ns4UW39Tq",
      APP_CLIENT_ID: "5fj0m2d8tbv2ss06u6k31hc4ee",
      IDENTITY_POOL_ID: "us-east-1:f7cdc236-182c-436e-90cc-7edd6248bc95",
    },
  };
  
  export default config;