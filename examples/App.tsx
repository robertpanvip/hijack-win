import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import hackWindows from "../src";

hackWindows((win) => {
    //console.log('win', win)
    const winFetch = win.fetch;
    win.fetch = (...args) => {
        console.log('fetch')
        return winFetch(...args)
    }
})

const iframe=document.createElement('iframe')

iframe.srcdoc= `<iframe id='b' srcDoc='123<script>console.log(fetch)</script>'></iframe><script>console.log('xx',fetch)</script>`
//document.body.appendChild(iframe)
const html=`<iframe id='a' srcdoc="${iframe.srcdoc}"></iframe>`
//const html=`<iframe id='a' srcdoc="123"></iframe>`

function App() {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        document.querySelector('#test')!.innerHTML=html
    },[])
    function getSrc() {
        const content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <script>
</script>
  <body>
  123<script>console.log(fetch)</script>
  </body>
</html>
`;
        const blob = new Blob([content], { type: 'text/html' });
        return URL.createObjectURL(blob)
    }
    return (
        <>
            <div id='test'></div>
            <iframe src={getSrc()}></iframe>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App