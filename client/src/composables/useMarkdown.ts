import {  Ref } from "vue"
import marked from "marked"
import hljs from "highlight.js"

export function useMarkdown() {

  const options : marked.MarkedOptions =  {
    // takes function that return code with syntax hightlighting
    highlight: (code: string) => hljs.highlightAuto(code).value
  }

  const update = (value: string) => marked.parse(value, options)

  return {
    update
  }

}