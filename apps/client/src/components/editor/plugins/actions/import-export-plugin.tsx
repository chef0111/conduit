import { exportFile, importFile } from '@lexical/file';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { DownloadIcon, UploadIcon } from 'lucide-react';

export function ImportExportPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant={'ghost'}
              onClick={() => importFile(editor)}
              title="Import"
              aria-label="Import editor state from JSON"
              size={'sm'}
              className="p-2"
            >
              <UploadIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Import Content</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant={'ghost'}
              onClick={() =>
                exportFile(editor, {
                  fileName: `Editor ${new Date().toISOString()}`,
                  source: 'Editor',
                })
              }
              title="Export"
              aria-label="Export editor state to JSON"
              size={'sm'}
              className="p-2"
            >
              <DownloadIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Export Content</TooltipContent>
      </Tooltip>
    </>
  );
}
