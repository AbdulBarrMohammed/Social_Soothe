import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';
import Questions from './Questions';
import { ArticleCard } from './ArticleCard';

export function Landing() {

  return (
    <>
      {/* main section */}
      <div className="bg-[#CCDBEE] flex flex-col items-center text-[#44423F]">
        <div className='bg-[#F0F8FF] flex gap-10  justify-center items-center px-20 py-40 w-full'>
                <div className='w-2/4 flex gap-6 flex-col'>
                <h1 className='text-7xl font-semibold leading-[5rem] text-[#44423F]'>Helping You Navigate Social Anxiety.</h1>
                <p className='text-3xl leading-[2.6rem] text-[#44423F]'>Social Soothe will help with your social anxiety
                    when no one else will.
                </p>

                <Link to={`/journals`}>
                    <button className='bg-[#4470AD] text-white  p-5 rounded-full text-[18px] font-bold shadow-md' >Try it now</button>
                </Link>

                </div>
            <div>
              <img src={`../src/assets/walking_blue.svg`} className="h-96"  alt="Description" />
            </div>
        </div>

        {/* Social Soothe horizontal description section */}
        <motion.div
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once: false, amount: 0.5}}
        className='bg-[#CCDBEE] flex flex-wrap justify-center items-center px-20 py-40 gap-16 w-full'>
            <div className='flex flex-col gap-5 max-w-sm'>
              <div className='flex  items-center gap-5'>
                <img src={'../src/assets/undraw_smiley_face_re_9uid.svg'} className="h-28"/>
                <h2 className='font-bold text-2xl'>Write down your emotions</h2>
              </div>
              <p className='text-lg'>Write down and keep a journal of how your feeling each day when dealing with a social interaction, pick how it made you
              feel and explain why it made you feel that way
              </p>
            </div>

            <div className='flex flex-col gap-5 max-w-sm' >
              <div className='flex items-center gap-5'>

                <img src={'../src/assets/undraw_mindfulness_8gqa.svg'} className="h-32"/>
                <h2 className='font-bold text-2xl'>Take some breathing exercises</h2>
              </div>
              <p className='text-lg'>Learn to take deep breathes when dealing with social anxiety with different breathing techniques for different situations that can help a person feel a sense of calm
              </p>
            </div>

            <div className='flex flex-col gap-5 max-w-sm'>
              <div className='flex items-center gap-5'>
                <img src={'../src/assets/undraw_appreciate_it_re_yc8h.svg'} className="h-32"/>
                <h2 className='font-bold text-2xl'>Recieve daily affirmations</h2>
              </div>
              <p className='text-lg'>Check in everyday to recieve as many daily affirmations as you want to give you confidence throughout the day with dealing with social anxiety </p>
            </div>
        </motion.div>

        <Questions />


        {/* Social Soothe description section*/}
        <div className="bg-[#F0F8FF] flex flex-col justify-center items-center px-10 py-20 gap-10 w-full">
          <h2 className='text-5xl text-center py-10 font-medium'>Take our Social Soothe challenge</h2>
          <div className='flex flex-col gap-20 items-center justify-center'>

            <div className='flex gap-20 items-center justify-center max-w-2xl' data-aos="fade-up">
                <img src={"../src/assets/undraw_environment_iaus.svg"} className='w-1/3' />
                <div className='flex flex-col gap-5'>
                  <h2 className='text-3xl'>Start easy and slow</h2>
                  <p className='text-2xl'>Our challenge will gradually give you social interactions through different levels, start with easy challenges that will slowly get your social juices flowing</p>
                </div>
            </div>

            <img src={'../src/assets/arrow-down.svg'} className='h-20'/>


            <div className='flex gap-20 items-center justify-center max-w-2xl'  data-aos="fade-up">
              <img src={"../src/assets/undraw_gardening_re_e658.svg"} className='w-1/3' />
              <div className='flex flex-col gap-5'>
                <h2 className='text-3xl'>Grow gradually</h2>
                <p className='text-2xl'>Each step will gradually have you socially interact more, with each level, social interactions will require more talking
              and public exposure.</p>
              </div>
            </div>

            <img src={'../src/assets/arrow-down.svg'} className='h-20'/>

            <div className='flex gap-20 items-center justify-center max-w-2xl' data-aos="fade-up">
              <img src={"../src/assets/undraw_blooming_re_2kc4-2.svg"} className='w-1/3' />
              <div className='flex flex-col gap-5'>
                <h2 className='text-3xl'>Level Up</h2>
                <p className='text-2xl'>Complete each step to level up to gain a flower to help grow your social tree and help it sprout</p>
              </div>
            </div>

          </div>
        </div>


        {/* Social Soothe article section*/}
        <ArticleCard />




        <footer className='bg-[#99AFD7] flex flex-col justify-center items-center px-10 py-20 gap-10 w-full'>
          <div className='flex justify-around'>
            <div className='flex flex-col gap-2 w-1/2'>
              <p className='font-bold text-xl'>Your Mental Health matters</p>
              <p className='text-[#44423F]'>If you are in a crisis or any other person life maybe in danger please don't use this site. Their are available resources that can give
                you immediate help.
              </p>
            </div>
            <div>
              <button className='bg-[#44423F] text-white p-5 rounded-full text-[18px] font-bold shadow-md'>Resources</button>
            </div>

          </div>

        </footer>
        {/* Footer  bottom links and copyright*/}
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



    </>

  )
}
