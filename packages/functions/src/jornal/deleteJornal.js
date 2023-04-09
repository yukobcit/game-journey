import { deleteJornal } from "@gamejorney/core/database";

export async function main(event) {

  // Get the game ID from the POST body
  const jornalId = event.pathParameters.jornalId;

  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  const jornal = await deleteJornal( userId, jornalId );
  return {
    statusCode: 200,
    body: JSON.stringify({ jornal: jornal }),
  }
}