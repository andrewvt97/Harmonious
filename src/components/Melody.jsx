import React, { useState } from "react";
import App from "./App";
import '../styles/App.css'
import Button from "./Button";

function Melody({melody = []}) {

    const handleMelodyClick = () => {};

    return <>
        {/* <ul>
        {melody.map((note, index) => (
          <li key={index}>{note["note"]} {note["chord"] !== 0 ? ":" + note["chord"] : null}</li>
        ))}
      </ul> */}

      {melody.map((note, index) => (
            
            note["chord"] === 0 ? (
            <Button key={index} text={note["note"]} onClick={() => handleMelodyClick()} />
            ): (
            <Button key={index} text={note["note"] + note["chord"]} onClick={() => handleMelodyClick()} />
            )
            
        ))}
    </>
}

export default Melody;