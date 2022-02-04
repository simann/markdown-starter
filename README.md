# Markdown Starter
This repository is an basic example on how to setup an project that compiles markdown to html. It uses the (Github gfm style)[https://github.github.com/gfm/] proivded by (sindresorhus)[https://github.com/sindresorhus] in his project (github-markdown-css)[https://github.com/sindresorhus/github-markdown-css].

# Folder Structure
Everything that is used in development is located in the `src` folder. Obviously `css` contains the stylesheets, `scripts` the js files and `html` an HTML template. Besides that there are 2 other folders: `content` & `images`. In `content` is an sample markdown file `index.md`, that is used with the current webpack setup. Every image that i used in the `index.md` is in the `images` folder and referenced from there.

# Commands

## npm run watch
Used for development. The command starts the webpack dev server, which provides hot reloading and opens your browser with the current version of the webpage. Entrypoint is `./src/scripts/index.js`.

## npm run build 
Builds the project and puts everything under the `/dist` folder. Output will be generated as gzip and brotli aswell.