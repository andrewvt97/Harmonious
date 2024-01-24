import React, { useState } from "react";
import App from "./App";
import '../styles/App.css'

function Melody({melody = []}) {

    return <>
        <ul>
        {melody.map((note, index) => (
          <li key={index}>{note["note"]} {note["chord"] !== 0 ? ":" + note["chord"] : null}</li>
        ))}
      </ul>
    </>
}

export default Melody;