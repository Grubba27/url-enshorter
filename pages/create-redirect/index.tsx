import { useState} from "react";
import {useRouter} from "next/router";
import {compressUrl} from "../api/hello";

export default function CreateRedirect() {
  const [url, setUrl] = useState('');

  const route = useRouter();
  const generateSmallUrl = async (url:string) => {
    const finalResult = compressUrl(url);
    await route.push({pathname: `/create-redirect/${finalResult}`})
  }

  return (
    <div>
      <h1>redirect works</h1>
      <input value={url} onInput={e => setUrl(e.target.value)}/>
      <button onClick={() => generateSmallUrl(url)}> testa</button>
    </div>
  )
}
