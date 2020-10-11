import React,{useState,useEffect} from 'react';
import Editor from './Editor';
import useLocalStorage from './useLocalStorage';
import Footer from "./Footer";

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const[srcDoc,setSrcDoc]=useState('')
  useEffect(()=>{
      const timeout=setTimeout(()=>{
          setSrcDoc(`<html>  
          <body>
          ${html}
          </body>
          <style>
          ${css}
          </style>
          <script>
          ${js}
          </script>                        
          </html>`)
      },300)
      {/* To avoid immediate redering of typed text on output screen which can
      slow the browser down.*/}
      return()=>clearTimeout(timeout)
  },[html,css,js])
  {/*Using the value passed in props in ${..}*/}
  return (
  <div>
  <div className="section editor">
    <Editor language="xml"
          displayType="HTML"
          value={html}
          onChange={setHtml}/>
    <Editor     language="css"
          displayType="CSS"
          value={css}
          onChange={setCss}/>
    <Editor   language="javascript"
          displayType="JS"
          value={js}
          onChange={setJs}/>


  </div>
  <div className="section">
    <iframe
    srcDoc={srcDoc}
    title="output"
    sandbox="allow-scripts" //prevent accessing cookies
    frameBorder="0"
    width="100%"
    height="100%"

    />
  </div>
    <Footer/>
  </div>
  );
}

export default App;
