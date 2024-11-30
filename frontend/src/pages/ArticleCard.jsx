import {motion} from 'framer-motion';
import { fadeIn } from '../variants';

export const ArticleCard = () => {

    return (
        <div className='bg-[#CCDBEE] flex flex-col justify-center items-center px-20 py-32 gap-10 w-full text-[#44423F'>
          <h2 className='text-5xl text-start text-[#44423F] font-semibold'>Featured Articles</h2>

          <motion.div
          variants={fadeIn("right", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: false, amount: 0.5}}


          className='grid grid-rows-2 grid-flow-col gap-3'>

            <div className='p-5 rounded-xl flex justify-between gap-5 bg-[#233C67] shadow-lg col-start-1 col-span-2'>
              <div>
                <div className='bg-white p-5 flex flex-col rounded-xl'>
                  <p>Coping mechanisms for social anxiety</p>
                    <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                        &rarr;
                    </div>

                </div>
              </div>
              <img src={"../src/assets/undraw_with_love_re_1q3m.svg"} className='h-24'/>
            </div>


            <div className='p-5 rounded-xl flex flex-col bg-[#99AFD7] shadow-md'>
                <div>
                  <div className='bg-white p-5 flex flex-col rounded-xl'>
                    <p>Do and Donts of social anxiety</p>
                      <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                          &rarr;
                      </div>

                  </div>
                </div>

            </div>

            <div className='p-5 rounded-xl flex flex-col bg-[#6888BE] shadow-md'>
                <div>
                  <div className='bg-white p-5 flex flex-col rounded-xl'>
                    <p>The Science of Social Anxiety</p>
                      <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                          &rarr;
                      </div>

                  </div>
                </div>

            </div>

            <div className='p-5 rounded-xl flex flex-col justify-end bg-[#4470AD] shadow-md'>
                  <div>
                    <div className='bg-white p-5 flex flex-col rounded-xl'>
                      <p>The Link Between Social Anxiety and Other Mental Health Issues</p>
                        <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                            &rarr;
                        </div>

                    </div>
                  </div>

            </div>

            <div className='p-5 rounded-xl flex flex-col bg-[#99AFD7] shadow-md'>
                  <div>
                    <div className='bg-white p-5 flex flex-col rounded-xl'>
                      <p>Managing Social Anxiety in Professional Settings</p>
                        <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                            &rarr;
                        </div>

                    </div>
                  </div>


            </div>

            <div className='p-5 rounded-xl flex justify-between gap-5 bg-[#233C67] shadow-md row-start-2 col-start-3 col-end-5'>
                <div>
                  <div className='bg-white p-5 flex flex-col rounded-xl'>
                    <p>Social Anxiety in Adolescents: Recognizing and Addressing the Issue</p>
                      <div className='bg-[#233C67] h-5 w-5 p-3 rounded-3xl flex justify-center items-center text-white'>
                          &rarr;
                      </div>

                  </div>
                </div>
                <img src={"../src/assets/undraw_junior_soccer_6sop-2.svg"} className='h-20'/>

            </div>
          </motion.div>

          <motion.div
          variants={fadeIn("right", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: false, amount: 0.5}}
          className='flex justify-center'>
            <button className='bg-[#4470AD] text-white  p-5 rounded-full text-[18px] font-bold shadow-md hover:bg-[#5F8CC6] transition-all duration-300 ease-in-out'>View all articles</button>
          </motion.div>

        </div>
    )

}
