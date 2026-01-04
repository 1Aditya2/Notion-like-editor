import { Block } from "../types/block";

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
    if (blockType === 'paragraph') {
        return {
            id: crypto.randomUUID(),
            type: "paragraph",
            content: "",
        }
    } else if (blockType === 'code') {
        return {
            id: crypto.randomUUID(),
            type: "code",
            content: "",
            language: 'code'
        }
    } else if (blockType === 'heading') {
        return {
            id: crypto.randomUUID(),
            type: "heading",
            content: '',
            level
        }
    }
    return {
        id: crypto.randomUUID(),
        type: "paragraph",
        content: "",
    }
}