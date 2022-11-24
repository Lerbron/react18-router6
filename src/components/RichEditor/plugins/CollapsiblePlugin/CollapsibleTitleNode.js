import {
  $createParagraphNode,
  $isElementNode,
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  SerializedElementNode,
  Spread,
} from 'lexical';

import {$isCollapsibleContainerNode} from './CollapsibleContainerNode';
import {$isCollapsibleContentNode} from './CollapsibleContentNode';


export class CollapsibleTitleNode extends ElementNode {
  static getType() {
    return 'collapsible-title';
  }

  static clone(node) {
    return new CollapsibleTitleNode(node.__key);
  }

  createDOM(config, editor) {
    const dom = document.createElement('summary');
    dom.classList.add('Collapsible__title');
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
    return $createCollapsibleTitleNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'collapsible-title',
      version: 1,
    };
  }

  collapseAtStart(_selection) {
    this.getParentOrThrow().insertBefore(this);
    return true;
  }

  insertNewAfter() {
    const containerNode = this.getParentOrThrow();

    if (!$isCollapsibleContainerNode(containerNode)) {
      throw new Error(
        'CollapsibleTitleNode expects to be child of CollapsibleContainerNode',
      );
    }

    if (containerNode.getOpen()) {
      const contentNode = this.getNextSibling();
      if (!$isCollapsibleContentNode(contentNode)) {
        throw new Error(
          'CollapsibleTitleNode expects to have CollapsibleContentNode sibling',
        );
      }

      const firstChild = contentNode.getFirstChild();
      if ($isElementNode(firstChild)) {
        return firstChild;
      } else {
        const paragraph = $createParagraphNode();
        contentNode.append(paragraph);
        return paragraph;
      }
    } else {
      const paragraph = $createParagraphNode();
      containerNode.insertAfter(paragraph);
      return paragraph;
    }
  }
}

export function $createCollapsibleTitleNode() {
  return new CollapsibleTitleNode();
}

export function $isCollapsibleTitleNode(
  node,
) {
  return node instanceof CollapsibleTitleNode;
}
