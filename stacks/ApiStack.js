import {Api, Cognito, use } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { MediaAssets } from "./MediaAssets";

export function API({ stack, app}) {
  const { bucket } = use(MediaAssets)
  // Create auth provider
  const auth = new Cognito(stack, "Auth", {
    login: ["email", "username"],
  });

  // Adjust the API 
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      }, 
    },
    routes: {

      "GET /games":{
        function: "packages/functions/src/game/getGames.main",
        authorizer: "none",
      },

      "GET /game/{gameId}":{
        function: "packages/functions/src/game/getGameDetail.main",
        authroizer: "none",
      },
      "POST /game":"packages/functions/src/game/postGame.main",
      "POST /user":"packages/functions/src/user/postUser.main",

      "GET /mygames":"packages/functions/src/myGame/getMyGames.main",
      "POST /mygames/{gameId}":"packages/functions/src/myGame/postMyGame.main",
      "DELETE /mygame/{gameId}":"packages/functions/src/myGame/deleteMyGame.main",

      "GET /jornals":"packages/functions/src/jornal/getAllJornals.main",
      "GET /jornals/{gameId}":"packages/functions/src/jornal/getJornals.main",
      "POST /jornal/{gameId}":"packages/functions/src/jornal/postJornal.main",
      "DELETE /jornal/{jornalId}":"packages/functions/src/jornal/deleteJornal.main",
      "PUT /jornal/{jornalId}":"packages/functions/src/jornal/updateJornal.main",

    },
  });


  // Allow authenticated users invoke API
  // auth.attachPermissionsForAuthUsers(stack, [api]);

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/public/*",
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        bucket.bucketArn + "/protected/${cognito-identity.amazonaws.com:sub}/*",
      ]
    }),
    new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/protected/*",
      ]
    })
  ]);

  // Allow unauthenticated users to access images
  auth.attachPermissionsForUnauthUsers(stack, [
    new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/public/*",
        bucket.bucketArn + "/protected/*",
      ]
    })
  ]);



  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId ?? "",
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    api,
    auth
  }
}
