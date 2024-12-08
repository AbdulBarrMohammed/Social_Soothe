import { ArticlesCard } from "../components/ArticlesCard"
import { articles } from "../data/articleData"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export function Articles () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
      };
    return (
        <div className="bg-[#CCDBEE] flex flex-col text-[#44423F] h-full">
            <div className="flex gap-1  justify-center items-center px-40 pt-24 mb-80">
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl">Articles</h1>
                    <h1 className="font-bold text-5xl w-4/5">Social Soothe articles for your social anxiety</h1>
                    <p className="w-4/5 text-xl">Feel free to read some of the articles that Social Soothe has to offer. These articles will help give advice, guidance and techniques
                        in your journey through dealing with social anxiety.
                    </p>
                </div>
                <img src={"../src/assets/undraw_friends_r511.svg"} className="h-80"/>

            </div>


            <div className="flex flex-col px-40 gap-10 pb-40">
                <h1 className="text-5xl font-bold">Provided articles</h1>
                <div className="w-full m-auto">
                    <Slider {...settings}>
                        {articles.map((article, index) => {
                                    return (
                                            <ArticlesCard article={article} index={index} />
                                        )
                                    })
                            }
                    </Slider>

                </div>
            </div>
            <div className="px-40 flex gap-20 py-40 bg-[#ACC8EA]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-5xl">Slow down your breathing</h1>
                    <p className="text-xl">Often times anxiety can lead a person to have faster heart rate and excess oxygen. Thats why it is recommended that
                        a person dealing with this should try and slow their breathing by taking slower breathes, that way it can decrease excess
                        oxygen coming in.
                    </p>
                    <div>
                        <button className="bg-[#4470AD] p-5 rounded-full text-[18px] font-bold shadow-md text-white hover:bg-[#5F8CC6] transition-all duration-300 ease-in-out">Learn more</button>
                    </div>

                </div>
                <img src={"../src/assets/undraw_a_whole_year_vnfm.svg"} className="h-80"/>

            </div>
            <footer className='bg-[#99AFD7] flex flex-col justify-center items-center px-10 py-20 gap-10 w-full'>
                    <div className='flex justify-around'>
                        <div className='flex flex-col gap-2 w-1/2'>
                            <p className='font-bold text-xl'>Your Mental Health matters</p>
                            <p className='text-[#44423F]'>If you are in a crisis or any other person life maybe in danger please don't use this site. Their are available resources that can give
                                you immediate help.
                            </p>
                        </div>
                        <div>
                        <button className='bg-[#44423F] text-white p-5 rounded-full text-[18px] font-bold shadow-md hover:bg-[#6B6864] transition-all duration-300 ease-in-out'>Resources</button>
                        </div>

                    </div>

            </footer>
            <footer className='bg-[#44423F] flex justify-between items-center text-white w-full px-10 py-10'>
                <div className='flex items-center gap-7'>
                    <p>&#169; Social Soothe</p>
                    <p>About</p>
                    <p>Privacy policy</p>
                    <p>Terms & conditions</p>

                </div>

                <ul className='flex items-center gap-2'>
                    <li><img src={"../src/assets/icons8-instagram-48.png"} className='h-8'/></li>
                    <li><img src={"../src/assets/icons8-facebook-48.png"} className='h-8'/></li>
                    <li><img src={"../src/assets/icons8-youtube-48.png"} className='h-8'/></li>
                    <li><img src={"../src/assets/icons8-twitter.svg"} className='h-8'/></li>
                    <li><img src={"../src/assets/icons8-tiktok-48.png"} className='h-8'/></li>
                </ul>
            </footer>
        </div>
    )
}
