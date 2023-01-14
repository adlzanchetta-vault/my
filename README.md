# Andre's personal page

## About

This is Andre's personal page. It is responsive without depending on Bootstrap.

## Developing

### Installing dependencies

Only once, install the ```node``` packages in which the project depends on:

```bash
$ npm install
```

If an error message pops up saying that the *package-lock.json* file was created with an old version of npm, take into consideration that it was generated using ```nodejs 12.22.9``` and ```npm 8.19.2```.

### Running locally for development

Ensure the ```base_url``` in the file ```src/env/globals.js``` has the value ```http://localhost:8000/```.

Then, run the command:

```bash
$ npm run-script clean_dev
```

## Customize

Folders holding customizable files are:

- ```globales```
- ```locales```
- ```static```
- ```src/styles```

Besites, in the root folder there are:

- ```.env.development```
- ```.env.production```

## Deploying

For deploying as the Github page of the repository *[REPO]* of the user *[USER]*, ensure that:

- file ```src/env/globals.js```: attribute ```base_url``` has value like ```https://[USER].github.io/[REPO]/```;
- file ```gatsby-config.js```: attribute ```pathPrefix``` has value like ```/[REPO]```.

Then, deploy it single command!

```bash
$ npm run deploy
```

**NOTE:** ensure that *Github page* the repository ```[REPO]``` is set up to serve the content of the branch *hg-page* and root folder (```/```).