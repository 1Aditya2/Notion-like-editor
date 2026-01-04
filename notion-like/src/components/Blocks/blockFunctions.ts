import { Block } from "../../types/block";
import { isBlockEmpty, moveCaretToEnd } from "../../utils/helper";
const focusOnNewBlock = (newBlockId: string, placeCaretToEnd: boolean = false) => {
    requestAnimationFrame(() => {
        const el = document.querySelector(
            `[data-block-id="${newBlockId}"]`
        ) as HTMLDivElement | null;
        el?.focus();
        if (el && placeCaretToEnd) {
            moveCaretToEnd(el);
        }
    });
}
export const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    insertBlockAfter: (id: string) => string,
    deleteBlock: (id: string) => string,
    blockId: string,
    blocks: Block[]
) => {
    console.log({ e });
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const newBlockId = insertBlockAfter(blockId);
        focusOnNewBlock(newBlockId);
    } else if (isBlockEmpty(ref) && e.key === 'Backspace') {
        const newBlockId = deleteBlock(blockId);
        focusOnNewBlock(newBlockId, true);
    } else if (e.key === "ArrowUp") {
        const currentBlockIndex = blocks.findIndex((b) => b.id === blockId);
        const newBlockId = currentBlockIndex > 0
          ? blocks.find((_, index) => index === currentBlockIndex - 1)?.id || blockId
          : blockId;
       focusOnNewBlock(newBlockId);
    } else if (e.key === 'ArrowDown') {
        const currentBlockIndex = blocks.findIndex((b) => b.id === blockId);
        const newBlockId = currentBlockIndex !== blocks?.length - 1
          ? blocks.find((_, index) => index === currentBlockIndex + 1)?.id || blockId
          : blockId;
        focusOnNewBlock(newBlockId);
    }
}