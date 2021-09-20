import { google } from "googleapis";
import {useRouter} from "next/router";

export async function getServerSideProps( {query} ) {
  const auth = await google.auth.getClient({scopes: 'https://www.googleapis.com/auth/spreadsheets'});
  const sheets = google.sheets({ version: 'v4', auth});
  const url = query.new;
  const range = `P1!B3:C3`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });


  const [firstPage, redirectsTo] = ['bla', 'blabla'];


  return {
    props: {
      firstPage,
      redirectsTo,
      url
    }
  }
}


export default function YourUrl( { firstPage, redirectsTo,url} ) {


  const router = useRouter();

  return (
    <div>
      <h1> new url works</h1>
      <h2> a url é {url}</h2>
      <button> testa aqui</button>
  </div>
);
}
