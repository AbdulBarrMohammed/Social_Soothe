import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function BreatheIntro() {
    return (
        <>
            <div className="flex flex-col items-center pt-10 gap-10 bg-[#ACC8EA] h-screen">
                <h1 className="font-bold text-2xl">Choose a breathing exercise</h1>

                <div className="flex gap-10 text-emojiSadWord">
                    <Link to={"/breathe/3/3/3"} className="bg-emojiSad flex flex-col items-center justify-center p-4 h-56 w-56 text-center rounded-3xl cursor-pointer shadow-md">

                        <p className="font-bold text-lg">3-3-3 breathing exercise:</p>
                        <p className="font-bold text-lg">For stress</p>
                    </Link>
                    <Link to={"/breathe/4/2/6"} className="bg-emojiSad flex flex-col items-center justify-center p-4 h-56 w-56 text-center rounded-3xl cursor-pointer shadow-md">
                        <p className="font-bold text-lg">4-2-6 breathing exercise:</p>
                        <p className="font-bold text-lg">To steady nerves</p>
                    </Link>
                    <Link to={"/breathe/4/7/8"} className="bg-emojiSad flex flex-col items-center justify-center p-4 h-56 w-56 text-center rounded-3xl cursor-pointer shadow-md">
                        <p className="font-bold text-lg">4-7-8 breathing exercise:</p>
                        <p className="font-bold text-lg">For overall Anxiety</p>
                    </Link>
                    <Link to={"/breathe/4/7/8"} className="bg-emojiSad flex flex-col items-center justify-center p-4 h-56 w-56 text-center rounded-3xl cursor-pointer shadow-md">
                        <p className="font-bold text-lg">Just breathe:</p>
                        <p className="font-bold text-lg">For self meditation</p>
                    </Link>

                </div>
                <img src="../src/assets/balloons.svg" className="h-60 pt-10"/>
            </div>
        </>
    )
}
