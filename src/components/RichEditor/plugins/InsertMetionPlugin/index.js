import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { createCommand, COMMAND_PRIORITY_EDITOR, $createTextNode, $insertNodes, $getSelection, $isRangeSelection } from 'lexical'
import React, { useEffect } from 'react';
// import { $createMentionFirstNode } from '../../nodes/MenstionNode/MenstionFirstNode';

export const INSERT_MENTION_COMMAND= createCommand('INSERT_MENTION_COMMAND')

export default () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let insert= editor.registerCommand(
      INSERT_MENTION_COMMAND,
      (payload) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          $insertNodes([$createTextNode(' @')])
          return null;
        }
        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();
        const selectionOffset = anchor.offset;
        const textContent = anchorNode.getTextContent()
        const reg= /\s$/
        let text= ' @'
        if (reg.test(textContent) || selectionOffset == 0) {
          text= '@'
        }
        
        $insertNodes([$createTextNode(text)])
        
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
    return insert
  }, [editor])
  return null
}