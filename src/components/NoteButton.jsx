import React, { ButtonHTMLAttributes } from "react";

function NoteButton({text = "randomNote", color = "white", backgroundColor = "lightskyblue", fontSize = 14, onClick = () => {}}) {
    const buttonStyle = {
        color: color,
        fontSize: fontSize + "px",
        backgroundColor: backgroundColor
    };


   
    return (
        <>
             <button onClick={onClick} style = {buttonStyle}> {text} </button>
        </>
       
        
    );
    

    
}


export default NoteButton;