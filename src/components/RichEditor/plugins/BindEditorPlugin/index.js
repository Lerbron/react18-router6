import React, { memo, useEffect } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


export default memo(props => {
  let { bindEditor }= props
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    bindEditor && bindEditor(editor)
  }, [editor])

  return null
})

