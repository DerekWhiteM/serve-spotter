import { Button } from "./button";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { Game } from "@/lib/game";
import { getInputElementByName } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";
import { Scoreboard } from "./scoreboard";
import { useState } from "react";

export function Sidebar({ game }: { game: Game }) {

    const [open, setOpen] = useState(false);
    const toggleOpen = () => (open ? setOpen(false) : setOpen(true));
    
    return (
        <div id="sidebar" className={`max-w-[16rem] bg-primary-foreground absolute h-full z-10`}>
            <div
                className="flex content-center bg-gray-100 text-gray-700 p-2 border-b rounded cursor-pointer hover:bg-gray-200"
                onClick={toggleOpen}
            >
                {open ? <ChevronsLeft className="m-auto" /> : <ChevronsRight className="m-auto" />}
            </div>
            <h1
                className={`text-[1.8rem] text-center relative ${
                    open ? "w-auto" : "w-0 overflow-hidden text-nowrap"
                }`}
            >
                Serve Spotter
            </h1>
            <div className={`flex flex-col ${open ? "w-auto" : "w-0 overflow-hidden text-nowrap"}`}>
                <div>
                    <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                        How to play
                    </h2>
                    <div className="px-2 py-4">
                        Use the left and right arrow keys to return each serve as quickly as you
                        can.
                    </div>
                </div>
                <div>
                    <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                        Configuration
                    </h2>
                    <div className="px-2 py-6">
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
                                const frequency = Number(getInputElementByName("frequency").value);
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
                        <Button
                            className="w-full mt-[0.236rem] border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                            variant="secondary"
                            onClick={() => game.reset()}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
                <Scoreboard />
            </div>
        </div>
    );
}
