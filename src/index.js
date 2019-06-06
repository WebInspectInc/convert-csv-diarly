import { createReadStream, writeFile, mkdirp } from "fs-extra";
import parse from "csv-parse";
import mapKeys from "lodash/mapKeys";
import formatDate from "date-fns/format";
import dedent from "dedent";

// Input CSV file
const CSV_PATH = `${__dirname}/../example.csv`;

// Output Markdown folder
const MARKDOWN_DIR = `${__dirname}/../markdown-posts`;

// Filenames of Markdown files
const getMarkdownPath = post => `${MARKDOWN_DIR}/${post.published_on}.md`;

// Template for Markdown files
const renderMarkdown = post => dedent`
  ${post.body}\n\n
`;

const stream = createReadStream(CSV_PATH);

let dates_done = [];

const parser = parse({ columns: true }, (error, posts) => {
  if (error) throw new Error(error);
  if (!Array.isArray(posts)) throw new Error("Incorrect CSV format");

  mkdirp(MARKDOWN_DIR);

  posts.forEach(post => {
    let file_index = post.completed_on;

    if (dates_done.indexOf(file_index) === -1) {
      let convertedPost = '';
      posts.forEach(post1 => {
        if (post1.completed_on === file_index) {
          convertedPost = renderMarkdown(post1) + convertedPost;
        }
      });

      const filepath = getMarkdownPath(post);
      dates_done.push(file_index);

      writeFile(filepath, convertedPost, error => {
        if (error) throw new Error(`Could not create ${filepath}`);
        console.log(`Created ${filepath}`);
      });
    }
  });
});

stream.pipe(parser);
