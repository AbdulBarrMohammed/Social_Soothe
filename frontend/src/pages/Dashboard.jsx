import { LineGraph } from "../data/Line.jsx"


export function Dashboard() {
    return (
        <>
            <div className="flex flex-col px-20 py-10">
                <p>This is a dashbaord</p>
                <LineGraph />
            </div>
        </>
    )
}
