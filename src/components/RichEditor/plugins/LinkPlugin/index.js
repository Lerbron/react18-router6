import {LinkNode, TOGGLE_LINK_COMMAND, toggleLink} from '../../nodes/LinkNode';
 import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
 import {COMMAND_PRIORITY_EDITOR} from 'lexical';
 import {useEffect} from 'react';

 export function LinkPlugin() {
   const [editor] = useLexicalComposerContext();

   useEffect(() => {
     if (!editor.hasNodes([LinkNode])) {
       throw new Error('LinkPlugin: LinkNode not registered on editor');
     }
   }, [editor]);
 
   useEffect(() => {
     return editor.registerCommand(
       TOGGLE_LINK_COMMAND,
       (payload) => {
         if (typeof payload === 'string' || payload === null) {
           toggleLink(payload,{}, editor);
         } else {
           const {url, target, rel} = payload;
           toggleLink(url, {rel, target}, editor);
         }
         return true;
       },
       COMMAND_PRIORITY_EDITOR,
     );
   }, [editor]);
 
   return null;
 }
 