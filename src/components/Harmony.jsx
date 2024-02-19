import React, { useState } from "react";
import Button from "./Button";

function Harmony({harmony = []}){


    return <>
        
        {
            harmony.map((note, index) => {
                let buttonText;

                if (note["chord"] === 0) {
                    buttonText = note["note"];
                } else {
                    buttonText = `${note["note"]}\n${note["chord"]}`; 
                }
                
                if (note["duration"] === 8){
                    buttonText = "♪" + "\n" + buttonText;
                }
                else if (note["duration"] === 4){
                    buttonText = "♩" + "\n" + buttonText;
                }
                else if (note["duration"] === 2){
                    buttonText = "𝅗𝅥" + "\n" + buttonText;
                }
                else if (note["duration"] === 1){
                    buttonText = "𝅝" + "\n" + buttonText;
                }


                return (
                <Button key={index} text={buttonText}  multiLine = {true} onClick={() => handleMelodyClick(index)} />
                );
            })
        }
    </>

}

export default Harmony;