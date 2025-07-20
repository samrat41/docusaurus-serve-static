# docusaurus-serve-static

A simple CLI tool to statically serve Docusaurus production builds—respecting custom baseUrl values defined in `docusaurus.config.js`—without requiring duplicated folder structures. Ideal for testing or deploying locally.

## Installation

Install locally in your project:

```sh
npm install docusaurus-serve-static
```

Or, for global usage:

```sh
npm install -g docusaurus-serve-static
```

## Usage

### Serve a Docusaurus build

```sh
npx docusaurus-serve-static -d build -p 3000 -b /docs/
```
- `-d, --dir <folder>`: Build folder to serve (default: `dist`)
- `-p, --port <number>`: Port to run the server on (default: `3000`)
- `-b, --baseUrl <url>`: Base URL to serve under (default: `/`). baseUrl should be the same that is specified in your docusaurus.config.js to build your production assets.

Example:
```sh
npx docusaurus-serve-static -d build -p 4000 -b /test/
```

## Features
- Serves static files with correct baseUrl
- Redirects unmatched routes to `index.html`
- Opens the served site in your default browser automatically

## License
MIT

## Author's Note
Created and maintained by Samrat Pulluri.

This project was inspired by real-world needs while working with Docusaurus on personal projects. I often needed to serve production assets with a custom baseUrl from environments where the original `docusaurus.config.js` was unavailable. This tool solves that problem, making local testing and deployment much easier.

Special thanks to the Docusaurus team for building such an outstanding documentation framework—it's been invaluable for my work ❤️. If you find this module helpful or have suggestions, contributions and feedback are always welcome!

Happy documenting! ❤️

