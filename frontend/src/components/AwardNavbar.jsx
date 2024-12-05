import { Link } from "react-router-dom";

export function AwardNavbar() {
    return (
        <div className="bg-[#ACC8EA] px-10 py-5 text-[#44423F]">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Use your leafs to earn awards</h1>
                <h2 className="text-2xl font-medium">Choose some of the options below to better your experience in social sooth</h2>
                <div className="flex gap-5 pt-3 text-white">
                    <Link to={"/awards/Sounds"} className="bg-[#6888BE] p-4 rounded-xl shadow-md">
                        Breathing exercise sounds
                    </Link>
                    <Link to={"/awards/Colors"} className="bg-[#6888BE] p-4 rounded-xl shadow-md">
                        Color schemes
                    </Link>
                    <Link to={"/awards/Fonts"} className=" bg-[#6888BE] p-4 rounded-xl shadow-md">
                        Fonts
                    </Link>
                </div>
            </div>
        </div>
    )
}
