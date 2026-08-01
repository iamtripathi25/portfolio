import React, { useState } from 'react'

import { useScroll,useTransform } from 'framer-motion'
import searchUp from '../images/SearchDown.svg'

function ContactPage() {

    
  return (<>
  
    <div className=' mx-[2vw] mt-[25vh] mb-[5vh] font-Inter'>
        <h1 className='lg:text-[2.6vw] md:text-[3vw]   text-[4vw] font-semibold  tracking-tight text-center 2xl:leading-[5vh] xl:leading-[4vh] lg:leading-[3vh]  md:leading-[2.5vh] leading-[2.2vh] mb-[20vh]'>Eager to Embrace New Opportunities!<br/> Let's Collaborate for Success!</h1>
        <div className=' flex flex-row justify-between items-center text-[4vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.4vw]'>
            <div>
            <a target='_blank' href="https://twitter.com/Iamtripathi25" className='mx-[1vw] py-[0.5vh]   font-semibold '>Twitter</a>
            <a target='_blank' href="https://www.linkedin.com/in/iamtripathi25" className='mx-[1vw] py-[0.5vh]   font-semibold'>LinkedIn</a>
            <a target='_blank' href="https://github.com/iamtripathi25" className='mx-[1vw] py-[0.5vh]   font-semibold '>Github</a>
            
            </div>
            <div className=''>
            <a href="#" className='flex flex-row mx-[1vw] py-[0.5vh] hover:text-slate-500 '>
                <h1 className='xl:text-[1.2vw] lg:text-[2vw] md:text-[2.5vw] text-[4vw]'> Back to top</h1> 
            <img className='lg:w-[1.2vw] md:w-[1.7vw] w-[3vw] ml-[0.5vw] rotate-180' src={searchUp} alt="up" />
                
                </a>
            </div>
        </div>
    </div>

  </>
  )
}

export default ContactPage
