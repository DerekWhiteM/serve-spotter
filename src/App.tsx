import "./index.css";
import { Button } from "./components/ui/button";
import { Game } from "./lib/game";
import { getInputElementByName } from "./lib/utils";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Scoreboard } from "./lib/scoreboard";

function App() {
    const scoreboard = new Scoreboard("scoreboard", "avg");
    const game = new Game("ball", scoreboard);
    return (
        <>
            <div className="bg-[#1b1b1b] max-w-[16rem] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                <h1 className="text-[1.8rem] text-center m-auto p-4 text-white">Serve Spotter</h1>
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-center bg-[#292929] py-[0.236rem] text-white">Guide</h2>
                        <div className="px-4 py-6 text-white">
                            Click on the left or right side of the court (arrow keys work too) to
                            return each serve as quicly as you can.
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center bg-[#292929] py-[0.236rem] text-white">Configuration</h2>
                        <div className="px-4 py-6">
                            <ul className="flex flex-col gap-[0.236rem] mb-4">
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="speed" className="text-white">Speed (1-10)</Label>
                                    <Input
                                        name="speed"
                                        type="number"
                                        size={8}
                                        defaultValue={5}
                                        min={1}
                                        max={10}
                                    />
                                </li>
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="frequency" className="text-white">Frequency (ms)</Label>
                                    <Input
                                        name="frequency"
                                        type="number"
                                        size={8}
                                        defaultValue={1000}
                                        min={100}
                                        max={10000}
                                    />
                                </li>
                                <li className="flex justify-between items-center gap-[0.236rem]">
                                    <Label htmlFor="rounds" className="text-white">Rounds (1-10)</Label>
                                    <Input
                                        name="rounds"
                                        type="number"
                                        size={8}
                                        defaultValue={3}
                                        min={1}
                                        max={10}
                                    />
                                </li>
                            </ul>
                            <Button
                                className="w-full mt-[0.236rem] text-white"
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
                            <Button className="w-full mt-[0.236rem]" variant="secondary" onClick={() => game.reset()}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center bg-[#292929] py-[0.236rem] text-white">Scoreboard</h2>
                        <div className="px-4 py-6">
                            <table id="scoreboard" className="w-full text-center text-white">
                                <thead>
                                    <th>Round</th>
                                    <th>Score</th>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div id="avg" className="w-full text-center font-bold mt-4 text-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[425px] h-[850px] border relative m-auto border-solid border-[white]">
                <div id="ball" className="absolute h-5 w-5 bg-[#FFD700] m-auto rounded-[10px] left-[202px] -top-2.5"></div>
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
                        <div className="h-full w-full" onClick={() => game.return("ad")}></div>
                        <div className="h-full w-full" onClick={() => game.return("deuce")}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
