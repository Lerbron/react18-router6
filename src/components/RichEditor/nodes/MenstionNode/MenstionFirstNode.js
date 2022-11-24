import {TextNode, ElementNode, $isRangeSelection, $isElementNode} from 'lexical';


export class MentionFirstNode extends ElementNode {
  static getType() {
    return 'mentionfirst';
  }

  static clone(node) {
    return new MentionFirstNode();
  }

  static importJSON(serializedNode) {
    const node = $createMentionFirstNode();
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'mentionfirst',
      version: 1,
    };
  }

  createDOM(config) {
    const dom= document.createElement('span')
    dom.className = 'mention-first';
    return dom;
  }

  updateDOM() {
    return false;
  }

  canInsertTextBefore() {
    return false;
  }
  // insertNewAfter(selection) {
  //   const element = this.getParentOrThrow().insertNewAfter(selection);
  //   if ($isElementNode(element)) {
  //     const _node = $createMentionFirstNode();
  //     element.append(_node);
  //     return _node;
  //   }
  //   return null;
  // }

  canInsertTextAfter() {
    return true;
  }
  setCanInsertTextAfter() {
    this.canInsertTextAfter= false
  }
  isInline() {
    return true;
  }

  isTextEntity() {
    return true;
  }
}

export function $createMentionFirstNode() {
  return new MentionFirstNode();
}

export function $isMentionFirstNode(
  node,
){
  return node instanceof MentionFirstNode;
}

