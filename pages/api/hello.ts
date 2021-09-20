// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {google} from "googleapis";


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}


export async function appendService(itWorks: string){
  const auth = await google.auth.getClient({scopes: 'https://www.googleapis.com/auth/spreadsheets'});
  const sheets = google.sheets({ version: 'v4', auth});
  const testRange = 'P1!B3:C3';
  const values = [[`it ${itWorks}`,`it ${itWorks}`]];
  const body = {
    values: values
  };

  // @ts-ignore
  const request = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: testRange,
    valueInputOption: 'RAW',
    resource: body
  });

  if (request.data.tableRange) {
    // @ts-ignore
    console.log(request.data.updates.updatedRange);
  }
}
export async function readSheet(){

}
export function compressUrl(url: string) {
  const result = url.replace('https:', '**ps**');
  return result.replace(/[/]/g, '**dash**');
}

export function decompressUrl(url: string) {
  const result = url.replace('**ps**', 'https:');
  return result.replace('**dash**','/')
}
