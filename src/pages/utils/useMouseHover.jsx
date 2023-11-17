import { useState,useEffect } from "react";

const useMousePosition = () =>{
    const [ mousePostion,setMousePosition] = useState({ x : null, y : null });
    const updateMousePosition = e =>{
        setMousePosition({x : e.clientX,y : e.clientY});
    }
    useEffect(()=>{
        window.addEventListener("mousemove",updateMousePosition);
        return () => window.removeEventListener("mousemove",updateMousePosition);
    },[]);

    return mousePostion;
}
export default useMousePosition;