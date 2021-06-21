import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const manifest = JSON.parse(fs.readFileSync('./custom-elements.json'));
const markdown = customElementsManifestToMarkdown(manifest);

fs.writeFileSync('./README.md', markdown);
