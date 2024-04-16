import "./index.css";
import { Court } from "./components/ui/court";
import { Game } from "./lib/game";
import { Scoreboard } from "./lib/scoreboard";
import { Sidebar } from "./components/ui/sidebar";

function App() {
    const scoreboard = new Scoreboard("scoreboard", "avg", "bestScore");
    const game = new Game(scoreboard);
    return (
        <>
            <Sidebar game={game} />
            <Court />
        </>
    );
}

export default App;
