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

import { $createLinkNode } from '../../nodes/LinkNode';

export const INSERT_CUSTOM_LINK_COMMAND= createCommand('INSERT_CUSTOM_LINK_COMMAND')


export default function CustomLinkPlugin({
  captionsEnabled,
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_CUSTOM_LINK_COMMAND,
        (payload) => {
          const linkNode = $createLinkNode(payload);
          $insertNodes([linkNode]);
          if ($isRootOrShadowRoot(linkNode.getParentOrThrow())) {
            if ($isRootOrShadowRoot(linkNode.getParentOrThrow())) {
              $wrapNodeInElement(linkNode, $createParagraphNode).selectEnd();
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