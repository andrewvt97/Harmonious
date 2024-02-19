import React, { ButtonHTMLAttributes } from "react";

function Button({text = "randomNote", color = "white", backgroundColor = "lightskyblue", fontSize = 14, active = false, multiLine = false, onClick = () => {}}) {
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
            border: 4 + "px solid black"
            
            // border-radius: 10px;
            // padding: 10px 30px;       
        }
    }


   
    if (multiLine) {
        // Split the text by newline characters to get an array of lines
        const lines = text.split('\n');
    
        return (
          <button onClick={onClick} style={buttonStyle}>
            {lines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < lines.length - 1 && <br />} {/* Add line breaks between lines */}
              </React.Fragment>
            ))}
          </button>
        );
      } else {
        // Render the text as is for single line
        return (
          <button onClick={onClick} style={buttonStyle}>
            {text}
          </button>
        );
      }
    };
    


export default Button;
