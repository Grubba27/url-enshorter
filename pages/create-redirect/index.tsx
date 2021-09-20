import { useState} from "react";
import {useRouter} from "next/router";
import {appendService} from "../api/hello";
const {google} = require('googleapis');
const sheets = google.sheets('v4');

export default function CreateRedirect() {
  const [url, setUrl] = useState('');

  const route = useRouter();
  const generateSmallUrl = async (url:string) => {
    console.log(url);
    const auth = await google.auth.getClient({scopes: 'https://www.googleapis.com/auth/spreadsheets'});
    const sheets = google.sheets({ version: 'v4', auth});
    const testRange = 'P1!B3:C3';
    const values = [[`it ${url}`,`it ${url}`]];
    const body = {
      values: values
    };

    // @ts-ignore
    const request = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID,
      range: testRange,
      valueInputOption: 'RAW',
      resource: body
    });

    // @ts-ignore
    if (request.data.tableRange) {
      // @ts-ignore
      console.log(request.data.updates.updatedRange);
    }
  }

  return (
    <div>
      <h1>redirect works</h1>
      <input value={url} onInput={e => setUrl(e.currentTarget.value)}/>
      <button onClick={() => generateSmallUrl(url)}> testa</button>
    </div>
  )
}
