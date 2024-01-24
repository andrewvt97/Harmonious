import React, { useState } from "react";

function Melody({melody = []}) {

    return <>
        <ul>
        {melody.map((note, index) => (
          <li key={index}>{note[0]} {note[1] !== 0 ? ":" + note[1] : null}</li>
        ))}
      </ul>
    </>
}

export default Melody;