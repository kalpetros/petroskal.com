module.exports = {
  siteMetadata: {
    title: `Petros Kalogiannakis`,
    description: `Personal website`,
    github: "https://github.com/kalpetros",
    keybase: "https://keybase.io/kalpetros",
    author: `Petros Kalogiannakis`,
    twitter: "https://twitter.com/kalpetross",
    linkedin: "https://www.linkedin.com/in/kalpetros/",
    stackoverflow: "https://stackoverflow.com/users/2005799/kalpetros",
    email: "kalpetros@pm.me",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Petros Kalogiannakis`,
        short_name: `@kalpetross`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/assets/avatar.jpeg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              prompt: {
                user: "user",
                host: "localhost",
                global: true,
              },
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `${__dirname}/src/utils/typography`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: false,
        respectDNT: true,
        exclude: [],
        pageTransitionDelay: 0,
        defer: true,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
        timeout: 3500,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
