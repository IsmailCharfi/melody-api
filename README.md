# Melody Backend API

## Overview

The Melody Backend API handles requests for reserving music festival event tickets and generating tickets in either pkpass (for Apple users) or png (for Google users) format.

## Getting Started

To set up the Melody Backend API, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/IsmailCharfi/melody-api.git
```

2. Install dependencies:

```bash
cd melody-backend
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory of the project following the `.env.template` file.
   - Define the necessary environment variables (e.g., `PORT`, `DATABASE_URL`, etc.).

4. Start the server:

```bash
npm run start:dev
```

The API will now be accessible at `http://localhost:port`.

## Usage

The API provides several endpoints, including one for generating pkpass files and another for png files.

- For pkpass files, you will find a pkpass template under `/src/assets/pkpass-template` containing images and a `pass.json` file. Additionally, there is a `cert` directory containing the private key and the certificate (please note that the private key is pushed to GitHub only for visualization purposes; in production mode, the private key will be hidden). (Note: I couldn't generate the wwdr certificate.)

- For png files, you will find a `ticket.template.ejs` file under `/src/assets` which serves as the template for our png ticket. After rendering the HTML, it will be passed to Puppeteer, a headless browser, for screenshotting. (Note: Node v18+ is required to use Puppeteer. If Puppeteer is unable to detect a Chromium browser, you may need to run `node node_modules/puppeteer/install.mjs` or `js`) and finally a QR code will be generated containing event information.

## Additional Notes

- A SQL file is included under `/public` to facilitate the execution.
- email: ismail@charfi.me
- passowrd: test
