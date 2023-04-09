import { updateJornal } from "@gamejorney/core/database";

export async function main(event) {

  // Get the game ID from the POST body
  const jornalId  = event.pathParameters.jornalId;

  // Get entry
  const body = JSON.parse(event.body);
  const entry = body.jornal;

  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  const jornal = await updateJornal( userId, jornalId, entry );
  return {
    statusCode: 200,
    body: JSON.stringify({ jornal: jornal }),
  }
}