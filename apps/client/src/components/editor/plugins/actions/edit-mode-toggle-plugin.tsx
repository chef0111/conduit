import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { LockIcon, UnlockIcon } from 'lucide-react';
import { useState } from 'react';

export function EditModeTogglePlugin() {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={'ghost'}
            onClick={() => {
              editor.setEditable(!editor.isEditable());
              setIsEditable(editor.isEditable());
            }}
            title="Read-Only Mode"
            aria-label={`${!isEditable ? 'Unlock' : 'Lock'} read-only mode`}
            size={'sm'}
            className="p-2"
          >
            {isEditable ? (
              <LockIcon className="size-4" />
            ) : (
              <UnlockIcon className="size-4" />
            )}
          </Button>
        }
      />
      <TooltipContent>
        {isEditable ? 'View Only Mode' : 'Edit Mode'}
      </TooltipContent>
    </Tooltip>
  );
}
