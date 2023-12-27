import "./index.css";
import { Button } from "./components/ui/button";
import { Game } from "./lib/game";
import { getInputElementByName } from "./lib/utils";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Scoreboard } from "./lib/scoreboard";

function App() {
    const scoreboard = new Scoreboard("scoreboard", "avg", "bestScore");
    const game = new Game("ball", scoreboard);
    return (
        <>
            <div className="max-w-[16rem]">
                <h1 className="text-[1.8rem] text-center m-auto p-4">Serve Spotter</h1>
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">Guide</h2>
                        <div className="px-4 py-6">
                            Use the left and right arrow keys to return each serve as quickly as you
                            can.
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                            Configuration
                        </h2>
                        <div className="px-4 py-6">
                            <ul className="flex flex-col gap-[0.382rem] mb-4">
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="speed">
                                        Speed (1-10)
                                    </Label>
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
                                    <Label htmlFor="frequency">
                                        Frequency (ms)
                                    </Label>
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
                                    <Label htmlFor="rounds">
                                        Rounds (1-10)
                                    </Label>
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
                            <Button
                                className="w-full mt-[0.236rem] border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                                variant="secondary"
                                onClick={() => game.reset()}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                            Scoreboard
                        </h2>
                        <div className="px-4 py-6">
                            <table id="scoreboard" className="w-full text-center">
                                <thead>
                                    <tr>
                                        <th>Round</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div
                                id="avg"
                                className="w-full text-center font-bold mt-4"
                            ></div>
                            <div
                                id="bestScore"
                                className="w-full text-center font-bold mt-4"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-primary w-full flex">
                <div className="w-[425px] h-[850px] border relative m-auto border-solid border-[white]">
                    <div
                        id="ball"
                        className="absolute h-5 w-5 bg-[#FFD700] m-auto rounded-[10px] left-[202px] -top-2.5"
                    ></div>
                    <div className="flex flex-col h-full">
                        <div className="h-full w-full"></div>
                        <div className="flex h-full w-full border-y-[white] border-t border-solid border-b">
                            <div className="h-full w-full border-r-[white] border-r border-solid"></div>
                            <div className="h-full w-full"></div>
                        </div>
                        <div className="flex h-full w-full border-y-[white] border-t border-solid border-b">
                            <div className="h-full w-full border-r-[white] border-r border-solid"></div>
                            <div className="h-full w-full"></div>
                        </div>
                        <div className="flex h-full w-full">
                            <div className="h-full w-full"></div>
                            <div className="h-full w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
