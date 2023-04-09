import { getAllJornals } from "@gamejorney/core/database";

export async function main(event) {

  const jornals = await getAllJornals();
  console.log(jornals);
  return {
    statusCode: 200,
    body: JSON.stringify({ jornals: jornals }),
  }
}