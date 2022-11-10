# Andre's personal page

## About

This is Andre's personal page. It is responsive without depending on Bootstrap.

## Developing

Only once, install the ```node``` packages in which the project depends on:

```$ npm install```

Ensure the ```base_url``` in the file ```src/env/globals.js``` has the value ```http://localhost:8000/```.

Then, run the command:

```$ npm run-script clean ; npm run-script develop```

## Deploying

First, ensure the ```base_url``` in the file ```src/env/globals.js``` has the proper URL value. For deploying as the Github page of the repository *[REPO]* of the user *[USER]*, this value would likely be  ```https://[USER]].github.io/[REPO]/```.

Then, deploy it single command!

```$ npm run deploy```

**NOTE:** ensure that *Github page* the repository ```[REPO]``` is set up to serve the content of the branch *hg-page* and root folder (```/```).