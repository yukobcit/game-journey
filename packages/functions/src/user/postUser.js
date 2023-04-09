import { postUser } from "@gamejorney/core/database";

export async function main(event) {
  // Get the form data from the POST body
  const { username, email } = JSON.parse(event.body);

  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  // Create the user object
  const user = {
    username,
    email,
    userId
  };

  // Save the user to the database
  const savedUser = await postUser(user);

  // Return the saved user as the response
  return {
    statusCode: 200,
    body: JSON.stringify(savedUser)
  };
}
