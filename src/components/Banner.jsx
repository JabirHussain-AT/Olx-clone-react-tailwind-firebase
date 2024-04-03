import React from 'react'
import adBanner from '../../public/AdBanner.png'

const Banner = () => {
  return (
    <div className='flex items-center object-fill justify-center h-72 w-full'>
       <img src={adBanner} alt="" />
        </div>
  )
}

export default Banner