import * as React from "react";

export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(false);
    function onChange(event: MediaQueryListEvent) {
        setValue(event.matches);
    }
    React.useEffect(() => {
        const result = matchMedia(query);
        result.addEventListener("change", onChange);
        setValue(result.matches);
        return () => result.removeEventListener("change", onChange);
    }, [query]);
    return value;
}
