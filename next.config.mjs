/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**',
        },
        
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'foresthistory.org',
          pathname: '**',
        },


        
      ],
    },

};

export default nextConfig;
