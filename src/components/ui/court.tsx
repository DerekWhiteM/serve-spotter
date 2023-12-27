export function Court() {
    return (
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
    );
}
