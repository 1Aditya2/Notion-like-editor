import { useRef } from "react";
import { blockPropsType, CodeBlock as CodeBlockType } from "../../types/block";

export default function CodeBlock({ block, handleBlur, handleKeyDown, handleInput }: { block: CodeBlockType} & blockPropsType) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="group flex items-center justify-center text-" onKeyDown={(e) => handleKeyDown(e,ref)}>
      <div className="bg-neutral-900 px-2 py-1 w-full rounded-md">
        <div className="text-xs text-neutral-400 mb-2">
          {block.language}
        </div>
        <div
          ref={ref}
          contentEditable
          onInput={() => handleInput(ref)}
          suppressContentEditableWarning
          onBlur={() => handleBlur(ref)}
          spellCheck={false}
          data-block-id={block.id}
          data-placeholder="Write some code..."
          className="outline-none font-mono text-sm whitespace-pre-wrap"
        >
          {block.content}
        </div>
      </div>
    </div>
  );
}
