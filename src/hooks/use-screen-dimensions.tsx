import { useEffect, useState } from "react";

export function useScreenDimensions() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    useEffect(() => {
        const handleResize = () => {
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return dimensions;
}