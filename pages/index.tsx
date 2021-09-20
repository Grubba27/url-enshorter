import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import {useRouter} from "next/router";
const {google} = require('googleapis');

const Home: NextPage = () => {
  const [url, setUrl] = useState('');

  const generateSmallUrl = async (url:string) => {
    console.log(url)
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
