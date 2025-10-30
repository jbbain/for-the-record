import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function Root(){
  useEffect(()=> {
    document.body.classList.add('has-fixed-header');
    return ()=> document.body.classList.remove('has-fixed-header');
  },[]);
  return <App/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><Root/></React.StrictMode>
)
