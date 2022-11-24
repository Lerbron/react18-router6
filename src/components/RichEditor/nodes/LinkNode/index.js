import {addClassNamesToElement} from '@lexical/utils';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  createCommand,
  ElementNode,
  $createTextNode
} from 'lexical';

/** @noInheritDoc */
export class LinkNode extends ElementNode {
  /** @internal */
  __url;
  /** @internal */
  __target;
  /** @internal */
  __rel;

  static getType() {
    return 'link';
  }

  static clone(node) {
    return new LinkNode(
      node.__url,
      {rel: node.__rel, target: node.__target},
      node.__key,
    );
  }

  constructor(url, attributes = {}, key) {
    super(key);
    const {target = null, rel = null} = attributes;
    this.__url = url;
    this.__target = target;
    this.__rel = rel;
  }

  createDOM(config) {
    const element = document.createElement('a');
    element.href = this.__url;
    if (this.__target !== null) {
      element.target = this.__target;
    }
    if (this.__rel !== null) {
      element.rel = this.__rel;
    }

    addClassNamesToElement(element, config.theme.link);

    return element;
  }

  updateDOM(
    prevNode,
    anchor,
    config,
  ) {
    const url = this.__url;
    const target = this.__target;
    const rel = this.__rel;
    if (url !== prevNode.__url) {
      anchor.href = url;
    }

    if (target !== prevNode.__target) {
      if (target) {
        anchor.target = target;
      } else {
        anchor.removeAttribute('target');
      }
    }

    if (rel !== prevNode.__rel) {
      if (rel) {
        anchor.rel = rel;
      } else {
        anchor.removeAttribute('rel');
      }
    }
    return false;
  }

  static importDOM() {
    return {
      a: (node) => ({
        conversion: convertAnchorElement,
        priority: 1,
      }),
    };
  }

  static importJSON(
    serializedNode,
  ) {
    const node = $createLinkNode(serializedNode.url, {
      rel: serializedNode.rel,
      target: serializedNode.target,
    });
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      rel: this.getRel(),
      target: this.getTarget(),
      type: 'link',
      url: this.getURL(),
      version: 1,
    };
  }

  getURL() {
    return this.getLatest().__url;
  }

  setURL(url) {
    const writable = this.getWritable();
    writable.__url = url;
  }

  getTarget() {
    return this.getLatest().__target;
  }

  setTarget(target) {
    const writable = this.getWritable();
    writable.__target = target;
  }

  getRel() {
    return this.getLatest().__rel;
  }

  setRel(rel) {
    const writable = this.getWritable();
    writable.__rel = rel;
  }

  insertNewAfter(selection) {
    const element = this.getParentOrThrow().insertNewAfter(selection);
    if ($isElementNode(element)) {
      const linkNode = $createLinkNode(this.__url, {
        rel: this.__rel,
        target: this.__target,
      });
      element.append(linkNode);
      return linkNode;
    }
    return null;
  }

  canInsertTextBefore() {
    return false;
  }

  canInsertTextAfter() {
    return false;
  }

  canBeEmpty() {
    return false;
  }

  isInline() {
    return true;
  }

  extractWithChild(
    child,
    selection,
    destination,
  ) {
    if (!$isRangeSelection(selection)) {
      return false;
    }

    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();

    return (
      this.isParentOf(anchorNode) &&
      this.isParentOf(focusNode) &&
      selection.getTextContent().length > 0
    );
  }
}

function convertAnchorElement(domNode) {
  let node = null;
  if (domNode instanceof HTMLAnchorElement) {
    const content = domNode.textContent;
    if (content !== null && content !== '') {
      node = $createLinkNode(domNode.getAttribute('href') || '', {
        rel: domNode.getAttribute('rel'),
        target: domNode.getAttribute('target'),
      });
    }
  }
  return {node};
}

export function $createLinkNode(
  url,
  attributes,
) {
  return new LinkNode(url, attributes);
}

export function $isLinkNode(
  node,
){
  return node instanceof LinkNode;
}



export const TOGGLE_LINK_COMMAND= createCommand('TOGGLE_LINK_COMMAND');

export function toggleLink(
  url,
  attributes = {},
  editor
) {
  const {target, rel} = attributes;
  const selection = $getSelection();
  let textContent= selection.getTextContent()


  if (!$isRangeSelection(selection)) {
    return;
  }
  const nodes = selection.extract();

  if (url === null) {
    // Remove LinkNodes
    nodes.forEach((node) => {
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        const children = parent.getChildren();

        for (let i = 0; i < children.length; i++) {
          parent.insertBefore(children[i]);
        }

        parent.remove();
      }
    });
  } else {
    // Add or merge LinkNodes
    if (nodes.length === 1) {
      const firstNode = nodes[0];

      if (firstNode.__type.toLocaleLowerCase() == 'paragraph' || textContent == '') {
        let linkNode = $createLinkNode(url, {rel, target});
        let textNode= $createTextNode(url)
        linkNode.append(textNode)
        let parentNode= firstNode
        while(!parentNode.append) {
          parentNode= parentNode.getParent()
        }
        parentNode.append(linkNode)
        linkNode.select()

        // setTimeout(() => {
        //   editor.update(() => {

        //     textNode.setTextContent('百度一下')
        //   })
        // }, 3000)
        return null
      }

      // if the first node is a LinkNode or if its
      // parent is a LinkNode, we update the URL, target and rel.
      const linkNode = $isLinkNode(firstNode)
        ? firstNode
        : $getLinkAncestor(firstNode);
      if (linkNode !== null) {
        linkNode.setURL(url);
        if (target !== undefined) {
          linkNode.setTarget(target);
        }
        if (rel !== undefined) {
          linkNode.setRel(rel);
        }
        return;
      }
    }

    let prevParent = null;
    let linkNode = null;

    nodes.forEach((node) => {
      const parent = node.getParent();

      if (
        parent === linkNode ||
        parent === null ||
        ($isElementNode(node) && !node.isInline())
      ) {
        return;
      }

      if ($isLinkNode(parent)) {
        linkNode = parent;
        parent.setURL(url);
        if (target !== undefined) {
          parent.setTarget(target);
        }
        if (rel !== undefined) {
          parent.setRel(rel);
        }
        return;
      }

      if (!parent.is(prevParent)) {
        prevParent = parent;
        linkNode = $createLinkNode(url, {rel, target});

        if ($isLinkNode(parent)) {
          if (node.getPreviousSibling() === null) {
            parent.insertBefore(linkNode);
          } else {
            parent.insertAfter(linkNode);
          }
        } else {
          node.insertBefore(linkNode);
        }
      }

      if ($isLinkNode(node)) {
        if (node.is(linkNode)) {
          return;
        }
        if (linkNode !== null) {
          const children = node.getChildren();

          for (let i = 0; i < children.length; i++) {
            linkNode.append(children[i]);
          }
        }

        node.remove();
        return;
      }

      if (linkNode !== null) {
        linkNode.append(node);
      }
    });
  }
}

function $getLinkAncestor(node) {
  return $getAncestor(node, (ancestor) => $isLinkNode(ancestor));
}

function $getAncestor(
  node,
  predicate,
){
  let parent= node;
  while (
    parent !== null &&
    (parent = parent.getParent()) !== null &&
    !predicate(parent)
  );
  return parent;
}
