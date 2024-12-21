import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css"
import { saFacts } from '../data/factsData';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  // Used to state to open social anxiety question drop down button
  const [isDropdown, setIsDropdown] = useState(false); const [isDropdownTwo, setIsDropdownTwo] = useState(false); const [isDropdownThree, setIsDropdownThree] = useState(false);
  const [isDropdownFour, setIsDropdownFour] = useState(false);
  const [isDropdownFive, setIsDropdownFive] = useState(false);
  const [isDropdownSix, setIsDropdownSix] = useState(false);
  const [isDropdownSeven, setIsDropdownSeven] = useState(false);

  const navigate = useNavigate()

  //scroll animations
  useEffect(() => {
    AOS.init({duration:1200})
  })


  function handleClick() {
    navigate('/login')

  }


    return (
        <div className='flex flex-col bg-[#F0F8FF] px-20 py-20 justify-center items-center w-full'>
          <h2 className='text-5xl text-center leading-[4rem] py-16' data-aos="fade-up">Social anxiety questions</h2>
          <div className='p-3 border-y border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">What is social anxiety?</h2>
              <button onClick={() => setIsDropdown((prev) => !prev)}>

                {!isDropdown ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdown && (

                <p>{saFacts[0]}</p>
              )}
          </div>


          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">What are the symptoms social anxiety?</h2>
              <button onClick={() => setIsDropdownTwo((prev) => !prev)}>

                {!isDropdownTwo ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownTwo && (

                <p>{saFacts[1]}</p>
              )}
          </div>

          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">What are the causes of social anxiety?</h2>
              <button onClick={() => setIsDropdownThree((prev) => !prev)}>

                {!isDropdown ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownThree && (
                  <p>{saFacts[2]}</p>
              )}
          </div>

          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">How many people have social anxiety?</h2>
              <button onClick={() => setIsDropdownFour((prev) => !prev)}>

                {!isDropdownFour ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownFour && (
                <p>{saFacts[3]}</p>

              )}
          </div>

          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">What treatments are available for social anxiety?</h2>
              <button onClick={() => setIsDropdownFive((prev) => !prev)}>

                {!isDropdownFive ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownFive && (
                <p>{saFacts[4]}</p>

              )}
          </div>

          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">How is social anxiety diagnosed?</h2>
              <button onClick={() => setIsDropdownSix((prev) => !prev)}>

                {!isDropdownSix ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownSix && (
                <p>{saFacts[5]}</p>

              )}
          </div>
          <div className='p-3 border-b border-[#44423F] w-3/4 flex flex-col'>
            <div className='flex justify-between items-center gap-10'>
              <h2 className='text-xl' data-aos="fade-up">Is social anxiety the same as shyness?</h2>
              <button onClick={() => setIsDropdownSeven((prev) => !prev)}>

                {!isDropdownSeven ? (
                  <img src={'../src/assets/chevron-down.svg'} className='h-10' />

                ): (
                  <img src={'../src/assets/chevron-up.svg'} className='h-10' />

                )}
              </button>

            </div>
              {isDropdownSeven && (
                <p>{saFacts[6]}</p>

              )}
          </div>

          <button onClick={handleClick}className='mt-16 bg-[#4470AD] text-white p-5 rounded-full text-[18px] font-bold shadow-md hover:bg-[#5F8CC6] transition-all duration-300 ease-in-out'>Get started</button>


        </div>
    )

  }

  export default Questions
