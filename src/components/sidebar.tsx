import { Button } from "./button";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { Game } from "@/game";
import { getInputElementByName } from "@/utils";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";

export function Sidebar({ game }: { game: Game }) {
    const [open, setOpen] = useState(false);
    function toggleOpen() {
        open ? setOpen(false) : setOpen(true);
    }
    return (
        <>
            {!open && (
                <div
                    className="flex content-center bg-background text-gray-700 p-2 border-b rounded cursor-pointer hover:bg-muted absolute"
                    onClick={toggleOpen}
                >
                    <ChevronsRight />
                </div>
            )}
            <div
                id="sidebar"
                className="max-w-[16rem] bg-background absolute h-full z-10 overflow-y-scroll"
            >
                {open && (
                    <div
                        className="flex content-center bg-background text-gray-700 p-2 rounded cursor-pointer hover:bg-muted"
                        onClick={toggleOpen}
                    >
                        <ChevronsLeft className="m-auto" />
                    </div>
                )}
                <div
                    className={`flex flex-col overflow-y-scroll ${
                        open ? "w-auto" : "w-0 overflow-hidden text-nowrap"
                    }`}
                >
                    <div>
                        <h2 className="bg-muted font-semibold text-secondary-foreground px-4 py-[0.236rem] border-y">
                            How to play
                        </h2>
                        <div className="px-4 py-4">
                            Click the left or right side of the court to return each serve as
                            quickly as you can. Arrow keys work too.
                        </div>
                    </div>
                    <div>
                        <h2 className="bg-secondary text-secondary-foreground font-semibold px-4 py-[0.236rem] border-y">
                            Configuration
                        </h2>
                        <div className="p-4">
                            <ul className="flex flex-col gap-[0.382rem] mb-4">
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="speed">Speed (1-10)</Label>
                                    <Input
                                        name="speed"
                                        type="number"
                                        size={8}
                                        defaultValue={5}
                                        min={1}
                                        max={10}
                                        className="text-primary"
                                    />
                                </li>
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="frequency">Frequency (ms)</Label>
                                    <Input
                                        name="frequency"
                                        type="number"
                                        size={8}
                                        defaultValue={1000}
                                        min={100}
                                        max={10000}
                                        className="text-primary"
                                    />
                                </li>
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="rounds">Rounds (1-10)</Label>
                                    <Input
                                        name="rounds"
                                        type="number"
                                        size={8}
                                        defaultValue={3}
                                        min={1}
                                        max={10}
                                        className="text-primary"
                                    />
                                </li>
                            </ul>
                            <Button
                                className="bg-primary w-full mt-[0.236rem]"
                                onClick={() => {
                                    toggleOpen();
                                    const speed = Number(getInputElementByName("speed").value);
                                    const frequency = Number(
                                        getInputElementByName("frequency").value
                                    );
                                    const rounds = Number(getInputElementByName("rounds").value);
                                    game.setSpeed(speed);
                                    game.setFrequency(frequency);
                                    game.setRounds(rounds);
                                    game.start();
                                    setTimeout(() => game.serve(), frequency);
                                }}
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="bg-secondary font-semibold text-secondary-foreground px-4 py-[0.236rem] border-y">
                            Scoreboard
                        </h2>
                        <div className="p-4">
                            <table id="scoreboard" className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="font-semibold">Round</th>
                                        <th className="font-semibold">Time (ms)</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div id="avg" className="w-full font-semibold mt-4"></div>
                            <div id="bestScore" className="w-full font-semibold mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
