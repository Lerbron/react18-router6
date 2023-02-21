import React, { useState, useRef, useEffect } from 'react';
import { $getRoot, $getSelection } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

import theme from './theme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
// import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
// import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import BindEditorPlugin from './plugins/BindEditorPlugin';
import { LinkPlugin } from './plugins/LinkPlugin';
import DefaultContentPlugin from './plugins/DefaultContentPlugin';
import InsertMetionPlugin from './plugins/InsertMetionPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import FootnotePlugin from './plugins/FootnotePlugin';
import CustomLinkPlugin from './plugins/CustomLinkPlugin';

import Placeholder from './components/Placeholder';

import nodes from './nodes';

import './index.scss'
import { useCallback } from 'react';
import { Button } from 'antd';

const defaultJson = {
  "root": {
    "children": [
      {
        "children": [
          {
            "children": [
              {
                "detail": 0,
                "format": 0,
                "mode": "normal",
                "style": "",
                "text": "@fd",
                "type": "text",
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "type": "mentionfirst",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}

const _defaultHtml = ``

function onError(error) {
  console.error(error);
}


export default function Editor() {


  const [html, setHtml] = useState('')
  const [defaultHtml, setDefaultHtml] = useState('')
  const editorRef = useRef(null)
  const scrollRef = useRef(null);

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [...nodes],
    // editable: false
  };



  const onChange = (editorState) => {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
      // console.log(root, selection);
    });
  }

  const bindEditor = useCallback((editor) => {
    editorRef.current = editor
  }, [])

  const onSave = () => {
    let editor = editorRef.current
    editor.update(() => {
      const editorState = editor.getEditorState();
      const json = editorState.toJSON()
      // const jsonString = JSON.stringify(editorState);
      console.log('json', json);

      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log('htmlString', htmlString);
      setHtml(htmlString)
    });
  };


  // useEffect(() => {
  //   setTimeout(() => {
  //     setDefaultHtml(_defaultHtml)
  //   }, 3000)
  // }, [])

  return (
    <>
      <div className='rich-editor-container' ref={scrollRef}>
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <div className='rich-editor-wrap'>
            <RichTextPlugin
              contentEditable={
                <div className="editor">
                  <ContentEditable className='content-editable-container' />
                </div>
              }
              placeholder={<Placeholder placeholder='Enter some text...' />}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <AutoLinkPlugin /> */}
          <LinkPlugin />
          <AutoScrollPlugin scrollRef={scrollRef} />
          <ListPlugin />
          <FloatingLinkEditorPlugin />
          {/* <FloatingTextFormatToolbarPlugin /> */}
          <ClickableLinkPlugin />
          <ImagesPlugin />
          <CodeActionMenuPlugin />
          <CodeHighlightPlugin />
          <InsertMetionPlugin />
          <BindEditorPlugin bindEditor={bindEditor} />
          <MentionsPlugin />
          <FootnotePlugin />
          <CustomLinkPlugin />
          <DefaultContentPlugin defaultHtml={defaultHtml} />
        </LexicalComposer>
      </div>
      <Button type='primary' onClick={onSave}>save</Button>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}