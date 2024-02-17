import React, { ButtonHTMLAttributes } from "react";

function Button({text = "randomNote", color = "white", backgroundColor = "lightskyblue", fontSize = 14, active = false, onClick = () => {}}) {
    let buttonStyle;
    if (!active){
        buttonStyle = {
            color: color,
            fontSize: fontSize + "px",
            backgroundColor: backgroundColor
        };
    }
    else{
        buttonStyle = {
            color: "black",
            fontSize: fontSize + "px",
            backgroundColor: backgroundColor,
            fontWeight: "bold",
            border: 4 + "px solid black",
            // border-radius: 10px;
            // padding: 10px 30px;       
        }
    }


   
    return (
        <>
             <button onClick={onClick} style = {buttonStyle}> {text} </button>
        </>
       
        
    );
    

    
}


export default Button;