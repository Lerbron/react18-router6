import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  $insertNodes,
  $isRootOrShadowRoot,
  $wrapNodeInElement,
  $createParagraphNode
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';


import { $createFootnoteNode } from '../../nodes/Footnote';

export const INSERT_FOOTNOTE_COMMAND = createCommand('INSERT_FOOTNOTE_COMMAND')



export default function FootnotePlugin({
  captionsEnabled,
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_FOOTNOTE_COMMAND,
        (payload) => {
          const footnoteNode = $createFootnoteNode({url: payload, footnoteClassName: editor._config.theme.footnote});
          $insertNodes([footnoteNode]);
          if ($isRootOrShadowRoot(footnoteNode.getParentOrThrow())) {
            if ($isRootOrShadowRoot(footnoteNode.getParentOrThrow())) {
              $wrapNodeInElement(footnoteNode, $createParagraphNode).selectEnd();
            }
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [captionsEnabled, editor]);

  return null;
}