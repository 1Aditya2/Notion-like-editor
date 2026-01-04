import { useRef } from "react";
import { blockPropsType, ParagraphBlock as ParaGraphBlockType } from "../../types/block"
const ParagraphBlock = ({ block, handleBlur, handleKeyDown, handleInput }: { block: ParaGraphBlockType } & blockPropsType) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className="group flex items-start gap-2 relative" onKeyDown={(e) => handleKeyDown(e, ref)}>
            <div
                ref={ref}
                contentEditable
                suppressContentEditableWarning
                onBlur={() => handleBlur(ref)}
                onInput={() => handleInput(ref)}
                data-block-id={block.id}
                className="outline-none w-full min-h-[1.5rem] leading-7"
                data-placeholder="Type Something..."
            >
                {block.content}
            </div>
        </div>
    )
}

export default ParagraphBlock