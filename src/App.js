import { useEffect, useState, useRef } from 'react';
import React  from 'react';
import Pricing from './components/Pricing';

function App() {

  useEffect(() => {
        fetch('/api/add-liquid-tags', {
            headers: {
                'Authorization': (document.getElementsByTagName("meta")["jwt-token"]?document.getElementsByTagName("meta")["jwt-token"].getAttribute("content"):'')
            },
        });

  }, [])

  return (
    <div className="App">
        <div className='pricing-quick-start-v2'>
            <Pricing />
        </div>   
    </div>
  );
}

export default App;
