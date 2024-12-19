

export function About() {
    return (
        <div className="bg-[#CCDBEE] flex flex-col text-[rgb(68,66,63)] h-screen pt-28">
            <div className="flex flex-wrap gap-20 items-center justify-center pb-60 px-20">
                <div className="w-3/5 flex flex-col gap-5">
                    <h2 className="text-2xl">About us</h2>
                    <h1 className="text-5xl font-bold">Helping those with social anxiety when no one else will</h1>
                    <p className="text-xl">Social Soothes mission to help those struggling with social anxiety better cope with it and offer a plat form
                        for those people with social anxiety that are being unheard, there are not many mental health websites
                        that specifically cater to those with social anxiety and that is fully free, but social soothe is hear to change that.
                    </p>
                    <div>
                        <button className="bg-[#4470AD] rounded-full font-bold text-[18px] text-white shadow-md p-5">Sign up For free</button>
                    </div>
                </div>
                <div>
                    <img src={"../src/assets/hiking.svg"} className="w-80"/>
                </div>
            </div>

            <div className="bg-[#ACC8EA] w-screen px-40 pb-40 flex gap-20 py-20 items-center justify-center">
                <div>
                    <img src={"../src/assets/undraw_The_world_is_mine_re_j5cr.svg"} className="h-80"/>
                </div>
                <div className="flex flex-col gap-5 w-3/5">
                    <h1 className="text-5xl font-bold">Built to help you soothe and help you grow for everyone</h1>
                    <p className="text-xl">Here in social soothe this platform can be used for anybody no matter the gender or race. No one
                        should feel that they are alone or feel ashamed of having social anxiety or feed into the pressure of societies
                        unfair social norms.
                    </p>
                </div>


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
