import { articles } from "../pages/articleData"

export function ArticlesCard({article, index}) {
    return (
        <div className="flex flex-col gap-2 w-48 text-[#44423F] font-bold">
            <div className="flex items-center justify-center bg-[#6888BE] w-60 h-60 cursor-pointer rounded-2xl shadow-md">
                <img src={article.img} className="h-28 hover:h-52 transition-all duration-300 ease-in-out" />
            </div>
            <p className="">{article.title}</p>
        </div>

    )
}
