import { useRef } from "react";
import { blockPropsType, QuoteBlock as QuoteBlockType } from "../../types/block";

const QuoteBlock = ({ block, handleBlur, handleKeyDown, handleInput }: { block: QuoteBlockType } & blockPropsType) => {
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
                className="outline-none pl-2 italic w-full min-h-[1.5rem] leading-7 border-l-4 border-l-white"
                data-placeholder="I think therefore i am..."
            >
                {block.content}
            </div>
        </div>
    )
};
export default QuoteBlock;