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

        {
          protocol: 'https',
          hostname: 'images.ctfassets.net',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'www.plasticsoupfoundation.org',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'cdn11.bigcommerce.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'marmotau.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 'cdn2.apstatic.com',
          pathname: '**',
        },

        {
          protocol: 'https',
          hostname: 's3.us-east-1.amazonaws.com',
          pathname: '**',
        },

      ],
    },

};

export default nextConfig;
