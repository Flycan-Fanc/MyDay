/**
 * @description: markdown-it && markdown-it-images-preview
 * @
*/
import { mavonEditor } from 'mavon-editor'
import MarkdownIt from 'markdown-it'
import markdownItImagesPreview from 'markdown-it-images-preview'
import interact from "interactjs";

const md = mavonEditor.getMarkdownIt()
console.log('markdown-it', md)
md.use(markdownItImagesPreview)
  .use((md) => {
    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx]
      const src = token.attrs[token.attrIndex("src")][1]
      const alt = token.content
      const sizeMatch = src.match(/\s*=\s*(\d+)x(\d+)$/)

      if (sizeMatch) {
        const width = sizeMatch[1]
        const height = sizeMatch[2]
        return `<img src="${src}" alt="${alt}" width="${width}" height="${height}">`
      }
      return `<img src="${src}" alt="${alt}">`
    }
  })


export {md, interact}
