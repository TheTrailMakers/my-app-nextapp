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

        {
          protocol: 'https',
          hostname: 'www.thegreatoutdoorsmag.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'alpkit.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'assets.icebreaker.com',
          pathname: '**',
        },

      ],
    },

};

export default nextConfig;
