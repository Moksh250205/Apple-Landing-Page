import { useState } from "react";
import { createContext } from "react";
import { useGLTF } from '@react-three/drei';

export const ColorContext = createContext({});

export const ColorContextProvider = ({children}) => {
    const { materials } = useGLTF("/scene.gltf");
    const [currentColor, setCurrentColor] = useState({
        color:"#9BB5CE",
        text:"Sierra Blue",
        rgbColor:"155, 181, 206",
        gradientStart: "#8BB0D9",
        gradientEnd: "#B5D0E9",
    })

    let changeColorContext = (colorObj) => {
        // Add default gradient values if not provided
        if (!colorObj.gradientStart) {
            const lightenColor = (color, percent) => {
                let num = parseInt(color.replace("#", ""), 16),
                    amt = Math.round(2.55 * percent),
                    R = (num >> 16) + amt,
                    G = ((num >> 8) & 0x00FF) + amt,
                    B = (num & 0x0000FF) + amt;
                return "#" + (
                    0x1000000 + 
                    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
                    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
                    (B < 255 ? (B < 1 ? 0 : B) : 255)
                ).toString(16).slice(1);
            };
            
            const darkenColor = (color, percent) => {
                let num = parseInt(color.replace("#", ""), 16),
                    amt = Math.round(2.55 * percent),
                    R = (num >> 16) - amt,
                    G = ((num >> 8) & 0x00FF) - amt,
                    B = (num & 0x0000FF) - amt;
                return "#" + (
                    0x1000000 + 
                    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
                    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
                    (B < 255 ? (B < 1 ? 0 : B) : 255)
                ).toString(16).slice(1);
            };
            
            colorObj.gradientStart = lightenColor(colorObj.color, 10);
            colorObj.gradientEnd = darkenColor(colorObj.color, 10);
        }

        materials.Body.color.set(colorObj.color);
        setCurrentColor(colorObj);
      }

    return(
        <ColorContext.Provider value={{currentColor, changeColorContext}}>
            {children}
        </ColorContext.Provider>
    )
}