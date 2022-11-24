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

