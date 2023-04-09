import { getJornals } from "@gamejorney/core/database";

export async function main(event) {

  // Get the game ID from the POST body
  const gameId  = event.pathParameters.gameId;

  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  const jornals = await getJornals( gameId, userId );
  return {
    statusCode: 200,
    body: JSON.stringify({ jornals: jornals }),
  }
}