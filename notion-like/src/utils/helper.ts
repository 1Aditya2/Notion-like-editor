import { Block, blockTypes } from "../types/block";

type CallbackFunction<Args extends any[]> = (...args: Args) => void;

type DebouncedFunction<Args extends any[]> = (...args: Args) => void;

export const debounce = <Args extends any[]>(
    callback: CallbackFunction<Args>,
    delay: number
): DebouncedFunction<Args> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: Args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};
export function moveCaretToEnd(el: HTMLElement) {
    el?.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);

    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
};
export const normalizeContent = (ref: any) => {
    return String(ref.current?.innerText.replace(/\n/g, "").trim());
};
export const isBlockEmpty = (ref: any) => {
    if (!ref.current) return true;
    const text = ref.current.innerText.replace(/\n/g, "").trim();
    return text === "";
};
export const createNewBlock = (blockType: string, level: 1 | 2 | 3): Block => {
    if (blockType === blockTypes.PARAGRAPH) {
        return {
            id: crypto.randomUUID(),
            type: blockTypes.PARAGRAPH,
            content: "",
        }
    } else if (blockType === blockTypes.CODE) {
        return {
            id: crypto.randomUUID(),
            type: blockTypes.CODE,
            content: "",
            language: 'code'
        }
    } else if (blockType === blockTypes.HEADING) {
        return {
            id: crypto.randomUUID(),
            type: blockTypes.HEADING,
            content: '',
            level
        }
    } else if (blockType === blockTypes.QUOTE) {
        return {
            id: crypto.randomUUID(),
            type: blockTypes.QUOTE,
            content: "",
        }
    }
    return {
        id: crypto.randomUUID(),
        type: blockTypes.PARAGRAPH,
        content: "",
    }
}