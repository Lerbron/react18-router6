import React, { memo, useEffect, useState, useCallback } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  Button,
  Space
} from 'antd'

import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';

import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  $wrapNodes,
} from '@lexical/selection';

import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';

import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

import { INSERT_MENTION_COMMAND } from "../InsertMetionPlugin";
import { INSERT_FOOTNOTE_COMMAND } from "../FootnotePlugin";
import { INSERT_CUSTOM_LINK_COMMAND } from "../CustomLinkPlugin";

// import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '../../nodes/LinkNode';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';

import {
  INSERT_IMAGE_COMMAND,
  InsertImageDialog,
  InsertImagePayload,
} from '../ImagesPlugin';
import { IS_APPLE } from './../../shared/environment';

import useModal from '../../hooks/useModal';


import { sanitizeUrl } from '../../utils/sanitizeUrl';
import { getSelectedNode } from '../../utils/getSelectedNode';
import DropDown, { DropDownItem } from '../../components/DropDown';


const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};

function getCodeLanguageOptions() {
  const options = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

function dropDownActiveClass(active) {
  if (active) return 'active dropdown-item-active';
  else return '';
}


import './index.scss'


function Divider() {
  return <div className="divider" />;
}

export default memo((props) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [blockType, setBlockType] = useState('paragraph');
  const [modal, showModal] = useModal();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [pageUp, setPageUp]= useState(false)


  const onPageUp= useCallback(() => {
    setPageUp(true)
  }, [])

  const onPageDown= useCallback(() => {
    setPageUp(false)
  }, [])

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://www.baidu.com'));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);


  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $wrapNodes(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  const onCodeLanguageSelect = useCallback(
    (value) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey],
  );


  const onInsertMention= useCallback(() => {
    editor.dispatchCommand(INSERT_MENTION_COMMAND)
  }, [editor])


  const onInsertFootnote= useCallback(() => {
    editor.dispatchCommand(INSERT_FOOTNOTE_COMMAND, 'https://www.baidu.com')
  }, [editor])


  const onInsertCustomLink= useCallback(() => {
    editor.dispatchCommand(INSERT_CUSTOM_LINK_COMMAND, 'https://www.baidu.com')
  }, [editor])


  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);


      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : '',
            );
            return;
          }
        }
      }

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsRTL($isParentElementRTL(selection));


    }
  }, [activeEditor]);


  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);


  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [activeEditor, editor, updateToolbar]);


  return (
    <div className="rich-editor-toolbar-wrap">

      <div className={`toolbar-container ${pageUp ? 'page-up' : ''}`}>
        <div className="toolbar-top">
          <Button onClick={onPageUp}>T</Button>
          <Button
            onClick={() => {
              showModal('Insert Image', (onClose) => (
                <InsertImageDialog
                  activeEditor={activeEditor}
                  onClose={onClose}
                />
              ));
            }}
            type={'default'}
          >
            Image
          </Button>
        </div>
        <div className="toolbar-bottom">

          <Space>
            <Button onClick={onPageDown}>back</Button>
            <Button
              disabled={!canUndo}
              onClick={() => {
                activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
              }}
              title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
              className="toolbar-item spaced"
            >
              Undo
            </Button>
            <Button
              disabled={!canRedo}
              onClick={() => {
                activeEditor.dispatchCommand(REDO_COMMAND, undefined);
              }}
              title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
              className="toolbar-item"
            >
              Redo
            </Button>

            {blockType != 'code' && (
              <>
                <Button
                  type={isBold ? 'primary' : 'default'}
                  onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                  }}
                >
                  B
                </Button>

                <Button
                  type={isItalic ? 'primary' : 'default'}
                  onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                  }}
                >
                  I
                </Button>

                <Button
                  onClick={insertLink}
                  type={isLink ? 'primary' : 'default'}
                >
                  L
                </Button>

                <Button
                  type={blockType == 'bullet' ? 'primary' : 'default'}
                  onClick={formatBulletList}
                >
                  Bullet List
                </Button>

                <Button
                  type={blockType == 'number' ? 'primary' : 'default'}
                  onClick={formatNumberedList}
                >
                  Numbered List
                </Button>

                <Button
                  type={blockType == 'quote' ? 'primary' : 'default'}
                  onClick={formatQuote}
                >
                  Quote
                </Button>
              </>
            )}

            <Button
              type="default"
              onClick={onInsertMention}
            >
              @
            </Button>

            <Button
              type="default"
              onClick={onInsertFootnote}
            >
              footnote
            </Button>

            <Button
              type={blockType == 'code' ? 'primary' : 'default'}
              onClick={formatCode}
            >
              Code Block
            </Button>

            {blockType == 'code' && (
              <>
                <DropDown
                  buttonClassName="toolbar-item code-language"
                  buttonLabel={getLanguageFriendlyName(codeLanguage)}
                  buttonAriaLabel="Select language">
                  {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
                    return (
                      <DropDownItem
                        className={`item ${dropDownActiveClass(
                          value === codeLanguage,
                        )}`}
                        onClick={() => onCodeLanguageSelect(value)}
                        key={value}>
                        <span className="text">{name}</span>
                      </DropDownItem>
                    );
                  })}
                </DropDown>
              </>
            )}

            <DropDown
              buttonLabel="Align"
              buttonIconClassName="icon left-align"
              buttonClassName="toolbar-item spaced alignment"
              buttonAriaLabel="Formatting options for text alignment"
            >
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                }}
                className="item">
                <i className="icon left-align" />
                <span className="text">Left Align</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                }}
                className="item">
                <i className="icon center-align" />
                <span className="text">Center Align</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                }}
                className="item">
                <i className="icon right-align" />
                <span className="text">Right Align</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                }}
                className="item">
                <i className="icon justify-align" />
                <span className="text">Justify Align</span>
              </DropDownItem>
              <Divider />
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                }}
                className="item">
                <i className={'icon ' + (isRTL ? 'indent' : 'outdent')} />
                <span className="text">Outdent</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                }}
                className="item">
                <i className={'icon ' + (isRTL ? 'outdent' : 'indent')} />
                <span className="text">Indent</span>
              </DropDownItem>
            </DropDown>


            

          </Space>
        </div>

        {modal}

      </div>
    </div>
  )
})