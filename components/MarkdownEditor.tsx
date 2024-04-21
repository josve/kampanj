'use client';

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  quotePlugin,
  UndoRedo,
  linkDialogPlugin,
  linkPlugin,
  ListsToggle,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  InsertThematicBreak,
  CreateLink,
} from '@mdxeditor/editor';
import { FC } from 'react';

interface EditorProps {
  markdown: string;
  onChange: any;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const MarkdownEditor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  return (
    <MDXEditor
      ref={editorRef}
      onChange={onChange}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        linkPlugin(),
        listsPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <ListsToggle />
              <InsertThematicBreak />
              <CreateLink />
              <UndoRedo />
            </>
          ),
        }),
      ]}
    />
  );
};

export default MarkdownEditor;
