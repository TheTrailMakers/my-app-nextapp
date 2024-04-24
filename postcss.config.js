module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/ttm2020/**',
      },
    ],
  },

};
