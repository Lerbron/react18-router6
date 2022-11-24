import { addClassNamesToElement } from '@lexical/utils';
import { DecoratorNode } from 'lexical';
import React from 'react';


const FootnoteComponent = (props) => {
  return (
    <></>
  )
}


export class FootnoteNode extends DecoratorNode {
  __url;
  __className;

  static getType() {
    return 'footnote';
  }
  static clone(node) {
    return new FootnoteNode(
      node.__url,
      node.__className,
      node.__key,
    );
  }

  constructor(url, footnoteClassName, key) {
    super(key);
    this.__url = url;
    this.__className= footnoteClassName
  }

  createDOM(config) {
    const element = document.createElement('span');
    addClassNamesToElement(element, config.theme.footnote);
    return element;
  }

  exportDOM() {
    const element = document.createElement('span');
    element.setAttribute('class', this.__className)
    element.setAttribute('data-url', this.__url)
    return { element };
  }

  updateDOM() {

    super.updateDOM
  }

  static importJSON(
    serializedNode,
  ) {
    const node = $createFootnoteNode({url: serializedNode.url, footnoteClassName: serializedNode.class});
    return node;
  }

  exportJSON() {
    return {
      type: 'footnote',
      url: this.__url,
      version: 1,
      class: this.__className
    };
  }

  decorate() {
    return (
      <FootnoteComponent />
    )
  }
}


export function $createFootnoteNode({
  url,
  footnoteClassName
}) {
  return new FootnoteNode(url, footnoteClassName);
}

export function $isFootnoteNode(
  node,
) {
  return node instanceof FootnoteNode;
}