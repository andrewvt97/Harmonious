import { useState } from 'react'
import '../styles/App.css'

function App() {
  
  return (
    
      <>
        <div className='header'>
          <p className='website-name'> Harmonious</p>
        </div>
        <div className='display'>
          <p className='melody-display'> La la la this is the melody</p>
          <p className='harmony-display'> lo lo lo this is the harmony</p>
          <div className='harmony-settings'> 
            <div className='interval-settings'>
                <p> Interval</p>
            </div>
            <div className='chord-note-settings'>
              <p> Chord Note</p>
            </div>
          </div>
        </div>
      </>
  
   
  );
}

export default App
