import { postJornal } from "@gamejorney/core/database";

export async function main(event) {

  // Get the game ID from the POST body
  const gameId  = event.pathParameters.gameId;

  // Get entry
  const body = JSON.parse(event.body);
  const entry = body.jornal;
  console.log(entry);
  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  const jornal = await postJornal( gameId, userId, entry );
  return {
    statusCode: 200,
    body: JSON.stringify({ jornal: jornal }),
  }
}