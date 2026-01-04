import { useRef } from "react";
import { blockPropsType, HeadingBlock as HeadingBlockType } from "../../types/block";
import { sizeMap } from "../../utils/constant";

export default function HeadingBlock({ block, handleBlur, handleKeyDown, handleInput }: { block: HeadingBlockType} & blockPropsType) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className="group flex items-center justify-center gap-2 mb-2 relative" onKeyDown={(e) => handleKeyDown(e,ref)}>
            <div
                ref={ref}
                data-block-id={block.id}
                contentEditable
                onInput={() => handleInput(ref)}
                suppressContentEditableWarning
                onBlur={() => handleBlur(ref)}
                className={`outline-none w-full leading-tight ${sizeMap[block.level]}`}
                data-placeholder={`Heading ${block.level}`}
            >
                {block.content}
            </div>
        </div>
    );
}
