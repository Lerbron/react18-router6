import {
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalNode,
  SerializedElementNode,
  Spread,
} from 'lexical';


export class CollapsibleContentNode extends ElementNode {
  static getType() {
    return 'collapsible-content';
  }

  static clone(node) {
    return new CollapsibleContentNode(node.__key);
  }

  createDOM(config) {
    const dom = document.createElement('div');
    dom.classList.add('Collapsible__content');
    return dom;
  }

  updateDOM(prevNode, dom) {
    return false;
  }

  static importDOM() {
    return {};
  }

  static importJSON(
    serializedNode,
  ) {
    return $createCollapsibleContentNode();
  }

  isShadowRoot() {
    return true;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'collapsible-content',
      version: 1,
    };
  }
}

export function $createCollapsibleContentNode() {
  return new CollapsibleContentNode();
}

export function $isCollapsibleContentNode(
  node,
) {
  return node instanceof CollapsibleContentNode;
}
