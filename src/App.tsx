import "./index.css";
import { AppContext } from "./app-context";
import { Court } from "./components/ui/court";
import { Game } from "./lib/game";
import { pb } from "./lib/pocketbase";
import { Scoreboard } from "./lib/scoreboard";
import { Sidebar } from "./components/ui/sidebar";
import { useState } from "react";

function App() {
    const scoreboard = new Scoreboard("scoreboard", "avg", "bestScore");
    const game = new Game("ball", scoreboard);
    const [user, setUser] = useState(pb.authStore.model);
    return (
        <AppContext.Provider value={{ user, setUser }}>
            <Sidebar game={game} />
            <Court />
        </AppContext.Provider>
    );
}

export default App;
