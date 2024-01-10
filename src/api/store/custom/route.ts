import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  console.log(req,res)
  res.setHeader('Access-Control-Allow-Origin', 'https://developer.mozilla.org')
  res.sendStatus(200);
}
