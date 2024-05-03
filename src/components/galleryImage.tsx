import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function GalleryImage({Img, Name, PageLink} : any) {

  const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"
  return (
    <div className=' snap-center max-w-60 max-h-60 flex-shrink-0 m-2'>
        <Link href={PageLink || '/contact'}>
        <Image
            src={Img || default_Image}
            alt={Name}
            height={400}
            width={400}
            className='w-60 h-60 object-cover'
        >

        </Image>
        </Link>
    </div>
  )
}

export default GalleryImage