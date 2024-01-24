## Setup

Install github Desktop: https://desktop.github.com/
Download/Clone: https://github.com/envman/pedistal
Install node.js (LTS): https://nodejs.org/en
Install dependencies, in a terminal/prompt window cd to kiosk directory and run:
npm install

### Importing data
- Copy spreadsheet (.xlsl file) into kiosk directory (Where data.xlsx is)
- Copy folder of photos into kiosk directory (Where photos_1 is)
- In a terminal/command prompt window run node import-data.js filename.xlsx photo_directory

The site folder is then ready for copying to the iPad

### Local debugging
You can run the site on your local machine with
node run.js

Then open http://localhost:8080