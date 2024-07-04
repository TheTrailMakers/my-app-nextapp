import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function GalleryImage({Img, Name} : any) {

  const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"
  return (
    <div className='snap-center mx-2 w-auto h-full flex-shrink-0 '>

        <Image
            src={Img || default_Image}
            alt={Name}
            height={320}
            width={320}
            className=' h-96 object-cover rounded-2xl'
        >

        </Image>
    </div>
  )
}

export default GalleryImage