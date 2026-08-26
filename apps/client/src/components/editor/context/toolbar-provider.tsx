import type { LexicalEditor } from 'lexical';
import { createContext, type JSX, useContext } from 'react';

const ToolbarContext = createContext<{
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element
  ) => void;
}>({
  activeEditor: {} as LexicalEditor,
  $updateToolbar: () => {},
  blockType: 'paragraph',
  setBlockType: () => {},
  showModal: () => {},
});

export function ToolbarProvider({
  activeEditor,
  $updateToolbar,
  blockType,
  setBlockType,
  showModal,
  children,
}: {
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element
  ) => void;
  children: React.ReactNode;
}) {
  return (
    <ToolbarContext.Provider
      value={{
        activeEditor,
        $updateToolbar,
        blockType,
        setBlockType,
        showModal,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbarContext() {
  return useContext(ToolbarContext);
}
