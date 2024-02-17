import React, { useState } from "react";
import Button from "./Button";

function Harmony({harmony = []}){


    return (
        <>
        
        {harmony.map((note, index) => {
           
    
            return note["chord"] === 0 ? (
            <Button key={index} text={note["note"]} onClick={() => handleMelodyClick(index)} />
            ) : (
            <Button key={index} text={`${note["note"]}\n\n${note["chord"]}`} onClick={() => handleMelodyClick(index)} />
            );
        })}
        </>
  );

}

export default Harmony;