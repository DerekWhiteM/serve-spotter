export function Scoreboard() {
    return (
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
                <div id="avg" className="w-full text-center font-bold mt-4"></div>
                <div id="bestScore" className="w-full text-center font-bold mt-4"></div>
            </div>
        </div>
    );
}
