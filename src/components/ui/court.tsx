import { Game } from "@/lib/game";
import { useEffect, useState } from "react";
import { useScreenDimensions } from "@/hooks/use-screen-dimensions";

export function Court({ game }: { game: Game }) {
    const screenDimensions = useScreenDimensions();
    const [courtDimensions, setCourtDimensions] = useState({
        height: "",
        width: "",
    });

    useEffect(() => {
        if (screenDimensions.height / screenDimensions.width > 1.66) {
            setCourtDimensions({
                height: "h-[150vw]",
                width: "w-[75vw]",
            });
        } else {
            setCourtDimensions({
                height: "h-[90vh]",
                width: "w-[45vh]",
            });
        }
    }, [screenDimensions]);

    return (
        <div className="w-full flex">
            <div
                id="court"
                className={`${courtDimensions.width} ${courtDimensions.height} max-w-[425px] max-h-[850px] border relative m-auto border-solid border-[white]`}
            >
                <div
                    id="ball"
                    className="absolute h-[20px] w-[20px] bg-[#FFD700] m-auto rounded-[10px] left-[calc(50%-10px)]"
                ></div>
                <div className="flex flex-col h-full">
                    <div className="h-full w-full"></div>
                    <div className="flex h-full w-full border-y-[white] border-t border-solid border-b">
                        <div className="h-full w-full border-r-[white] border-r border-solid"></div>
                        <div className="h-full w-full"></div>
                    </div>
                    <div className="flex h-full w-full border-y-[white] border-t border-solid border-b">
                        <div className="h-full w-full border-r-[white] border-r border-solid" onClick={() => game.return("ad")}></div>
                        <div className="h-full w-full" onClick={() => game.return("deuce")}></div>
                    </div>
                    <div className="flex h-full w-full">
                        <div className="h-full w-full" onClick={() => game.return("ad")}></div>
                        <div className="h-full w-full" onClick={() => game.return("deuce")}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
