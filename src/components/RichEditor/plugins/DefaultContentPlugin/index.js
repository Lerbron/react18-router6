import React, { memo, useEffect } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, CLEAR_HISTORY_COMMAND } from 'lexical';
// import { selection } from '@lexical/selection';

// import { $generateNodesFromDOM } from "./lexicalHtml";


const isObject = obj => obj !== null && typeof obj === 'object'


const handleHtml = (html => {
  if (!html) return ''
  // 处理链接的icon
  let reg = /(<a\s.*>)(<img\s.*>)(<span>.*<\/span><\/a>)/gim
  html = html.replace(reg, ($0, $1, $2, $3) => {
    return `${$1}${$3}`
  })

  // 处理code
  let codeReg = /<code\sclass=.*>(.*)<\/code>/gim
  html = html.replace(codeReg, ($0) => {
    return `<p class="PlaygroundEditorTheme__paragraph">${$0}</p>`
  })
  console.log('html--->', html)
  return html
})

export default memo(props => {
  let { defaultHtml } = props
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (defaultHtml) {
      if (isObject(defaultHtml)) {

        const editorState = editor.parseEditorState(
          defaultHtml
        );
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
      } else {

        editor.update(() => {
          // const rootEl= editor.getRootElement()

          // rootEl.innerHTML= defaultHtml
          const parser = new DOMParser();
          const dom = parser.parseFromString(handleHtml(defaultHtml), 'text/html');
          const nodes = $generateNodesFromDOM(editor, dom);

          console.log('nodes----->', nodes)

          $getRoot().select();
          $insertNodes(nodes);

        });
      }
    }
  }, [defaultHtml])

  return null
})

