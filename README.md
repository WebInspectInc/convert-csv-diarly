# Convert CSV to Diarly

This is a Node script to convert CSV files to Diarly Markdown files. I used to journal with [iDoneThis](https://idonethis.com/), which isn't strictly for journaling, and they use CSVs to backup your entries. Not only do they use CSVs, but they also have multiple entries per date, which is not something that Diarly supports. So I modified this library so that it will take a CSV with multiple entries per date and append them, allowing for a single Markdown file for every day in your CSV file.

This code is mostly taken from the excellent work done by the good people at [Ninjality](https://github.com/ninjality).

## Install

1. Clone this repository: `git clone https://github.com/WebInspectInc/convert-csv-markdown.git`
2. Install dependencies: `npm install` or `yarn install` [(learn about yarn)](https://yarnpkg.com/)

## Usage

The entire script is in `src/index.js`. Anything configurable is declared at the top, so make sure to update `CSV_PATH`, `MARKDOWN_DIR`, `getMarkdownPath`, and `renderMarkdown` as needed.

The `example.csv` file is what will be used to convert posts into Markdown. Make sure to keep the same format, with the first line being the column names. It's also important to reference these column names correctly in the script.

You can run `npm run convert` or `yarn convert` to run the script, which by default will create `.md` files in the `markdown-posts` folder.

## Credits

Many thanks to the creators of [Noderize](https://noderize.js.org/) and [csv-parse](https://github.com/adaltas/node-csv-parse) for allowing easier development of this script. We hope to update it in the future as an interactive CLI script that you can install globally through npm, but for now we hope this makes your migrations less painful!
