import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import {useRouter} from "next/router";
import {google} from "googleapis";

const Home: NextPage = () => {
  const [url, setUrl] = useState('');

  const generateSmallUrl = async (url:string) => {
    console.log(url)
    const auth = await google.auth.getClient({scopes: 'https://www.googleapis.com/auth/spreadsheets'});
    const sheets = google.sheets({ version: 'v4', auth});
    const testRange = 'P1!B3:C3';
    const values = [[`it ${url}`,`it ${url}`]];
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

  return (
    <div>
      <h1>Tell me a url and i create a small ulr for u</h1>
      <br/>
      <input value={url} onInput={e => setUrl(e.currentTarget.value)}/>
      <br/>
      <button onClick={() => generateSmallUrl(url)}> Generate</button>
    </div>
  )
}

export default Home
