/**
 * @description: markdown-it && markdown-it-images-preview
 * @
*/
import { mavonEditor } from 'mavon-editor'
import MarkdownIt from 'markdown-it'
import { imgSize } from "@mdit/plugin-img-size";

const md = mavonEditor.getMarkdownIt()
console.log('markdown-it', md)
md.use(imgSize)


export {md}
