/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const {stringToList} = require("./src/libs/general.js");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


/*
{
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: "Personal page",
    short_name: "Page",
    start_url: "/page",
    background_color: "#6b37bf",
    theme_color: "#6b37bf",
    // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
    // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
    display: "standalone",
    icon: "static/favicon-blue.png" // This path is relative to the root of the site.
  }
},
*/

module.exports = {
  /* Your site config here */
  /* pathPrefix: `/my`, */
  pathPrefix: process.env.PATH_PREFIX,

  flags: {
    DEV_SSR: false
  },

  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${__dirname}/locales`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `globale`,
        path: `./globales/`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: stringToList(process.env.LANGUAGES_ACRONYMS),
        defaultLanguage: process.env.LANGUAGE_DEFAULT,
        // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
        trailingSlash: 'always',
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:uid',
            getLanguageFromPath: true,
            excludeLanguages: ['es']
          },
          {
            matchPath: '/preview',
            languages: ['en']
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet'
  ]
}
