import { AppContext } from "@/app-context";
import { Button } from "./button";
import { Game } from "@/lib/game";
import { getInputElementById } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";
import { LoginDialog } from "./login-dialog";
import { pb } from "@/lib/pocketbase";
import { Scoreboard } from "./scoreboard";
import { useContext } from "react";

export function Sidebar({ game }: { game: Game | undefined }) {
    const { user, setUser } = useContext(AppContext);
    return (
        <div className="max-w-[16rem] h-full flex flex-col overflow-y-auto">
            <h1 className="text-[1.8rem] text-center mx-auto p-4">Serve Spotter</h1>
            <div>
                <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                    Guide
                </h2>
                <div className="px-4 py-6">
                    Use the left and right arrow keys to return each serve as quickly as you can.
                </div>
            </div>
            <div>
                <h2 className="text-center bg-secondary text-secondary-foreground py-[0.236rem]">
                    Configuration
                </h2>
                <div className="px-4 py-6">
                    <ul className="flex flex-col gap-[0.382rem] mb-4">
                        <li className="flex justify-between items-center gap-[0.236rem]">
                            <Label htmlFor="speed">Speed (1-10)</Label>
                            <Input
                                id="speed"
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
                                id="frequency"
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
                                id="rounds"
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
                            const speed = Number(getInputElementById("speed").value);
                            const frequency = Number(getInputElementById("frequency").value);
                            const rounds = Number(getInputElementById("rounds").value);
                            game?.setSpeed(speed);
                            game?.setFrequency(frequency);
                            game?.setRounds(rounds);
                            game?.start();
                            setTimeout(() => game?.serve(), frequency);
                        }}
                    >
                        Start
                    </Button>
                    <Button
                        className="w-full mt-[0.236rem] border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                        variant="secondary"
                        onClick={() => game?.reset()}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <Scoreboard />
            {user ? (
                <Button
                    className="w-full p-4 text-center mt-auto"
                    variant="outline"
                    onClick={() => {
                        pb.authStore.clear();
                        setUser?.(null);
                    }}
                >
                    Logout
                </Button>
            ) : (
                <LoginDialog className="w-full p-4 text-center mt-auto" />
            )}
        </div>
    );
}
