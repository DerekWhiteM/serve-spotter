import { getScreenDimensions } from "@/utils";
import { useEffect, useState } from "react";

export function useScreenDimensions() {
    const [dimensions, setDimensions] = useState(getScreenDimensions());
    function handleResize() {
        setDimensions(getScreenDimensions());
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return dimensions;
}
