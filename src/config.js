const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "serverless-bucket-tutorial-rw",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://dilwl3wpt4.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_v6pQIqLFA",
      APP_CLIENT_ID: "1g11igrt9q4cpipfpas00aejh3",
      IDENTITY_POOL_ID: "us-east-1:e5c9d2d2-61f7-4444-8cb4-7b353d7a5073",
    },
  };
  
  export default config;