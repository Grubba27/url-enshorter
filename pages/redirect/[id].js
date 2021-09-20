const {google} = require('googleapis');
import {useEffect} from "react";

export async function getServerSideProps( {query} ) {
  const auth = await google.auth.getClient({scopes: 'https://www.googleapis.com/auth/spreadsheets'});
  const sheets = google.sheets({ version: 'v4', auth});

  const { id } = query;
  const range = `P1!B${id}:C${id}`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });


  const [firstPage, redirectsTo] = response.data.values[0];


  return {
    props: {
      firstPage,
      redirectsTo
    }
  }
}


export default function YourUrl( { firstPage, redirectsTo} ) {

  function redirect(){
    console.log('redirecting');
    window.location = firstPage;
  }

  useEffect(() => {
    window.location = firstPage;
  })
  return (
    <div>
      <a> you are going to  {firstPage} </a>
      <br/>
      <button onClick={ () => redirect()} > if nothing happens click here</button>
    </div>
  );
}
