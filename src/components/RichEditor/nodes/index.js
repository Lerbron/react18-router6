import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { ImageNode } from './ImageNode';
import { MentionNode } from './MenstionNode'
import { FootnoteNode } from './Footnote';
import { LinkNode } from './LinkNode';
import { MentionFirstNode } from './MenstionNode/MenstionFirstNode';


import {
  QuoteNode
} from '@lexical/rich-text';


const nodes = [
  LinkNode,
  ImageNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeHighlightNode,
  CodeNode,
  MentionNode,
  FootnoteNode,
  MentionFirstNode
];

export default nodes;