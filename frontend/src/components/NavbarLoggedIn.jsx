import { Link } from "react-router-dom"
import { pageDataLoggedIn } from "./pageData"

export function NavbarLoggedIn() {
    //bg-[#F9F6F4]
    return (
        <>
        <nav className='bg-[rgb(68,112,173)] pt-14 sticky top-0 text-white z-40'>
            <ul className='p-3 flex w-full items-center justify-center'>
                    {pageDataLoggedIn.map((page) => {
                        return (

                                <Link to={page.path} className='text-lg flex items-center hover:bg-[#D1CCC9] rounded-xl transition duration-300 ease-in-out'>
                                    <div className='flex gap-2 px-10 py-2 items-center'>
                                        <img src={page.img} className='h-7'/>
                                        <li className='font-semibold text-base'>
                                            {page.name}
                                        </li>
                                    </div>
                                </Link>


                        );

                    })}

            </ul>
      </nav>

        </>
    )
}
