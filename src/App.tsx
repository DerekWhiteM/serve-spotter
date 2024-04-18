import "./index.css";
import { Court } from "./components/court";
import { Game } from "./game";
import { Sidebar } from "./components/sidebar";

function App() {
    const game = new Game();
    return (
        <>
            <Sidebar game={game} />
            <Court game={game} />
        </>
    );
}

export default App;
