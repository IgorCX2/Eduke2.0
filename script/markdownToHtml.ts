import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).use(remarkGfm).use(remarkBreaks).process(markdown)
  return result.toString()
}