import { create } from "zustand";
import { Block, blockTypes } from "../types/block";
import { loadBlocks, saveBlocks } from "./storeHelper";

type EditorState = {
    blocks: Block[];
    updateBlock: (id: string, content: string) => void;
    insertBlockAfter: (id: string) => string;
    deleteBlock: (id: string) => string;
    replaceBlock: (id: string, newBlock: Block) => void;
    moveBlock: (fromId: string, toId: string) => void;
};
const initialBlocks: Block[] = loadBlocks() ?? [
    {
        id: crypto.randomUUID(),
        type: blockTypes.PARAGRAPH,
        content: "",
        level: 1
    }
];
export const useEditorStore = create<EditorState>((set) => ({
    blocks: initialBlocks,
    updateBlock: (id, content) =>
        set((state) => {
            const newBlocks = state.blocks.map((block) =>
                block.id === id ? { ...block, content } : block
            )
            saveBlocks(newBlocks);
            return { blocks: newBlocks }
        }),
    insertBlockAfter: (id) => {
        let newId = crypto.randomUUID();
        set((state) => {
            const index = state.blocks.findIndex((b) => b.id === id);
            if (index === -1) return state;
            const newBlock: Block = {
                id: newId,
                type: blockTypes.PARAGRAPH,
                content: "",
            };
            const blocks = [...state.blocks];
            blocks.splice(index + 1, 0, newBlock);
            saveBlocks(blocks);
            return { blocks };
        })
        return newId;
    },
    replaceBlock: (id: string, newBlock: Block) =>
        set((state) => {
            const blocks = state.blocks.map((b) =>
                b.id === id ? { ...newBlock, id } : b
            )
            saveBlocks(blocks);
            return { blocks }
        }),
    deleteBlock: (id) => {
        let blockTobeFocused = "";
        set((state) => {
            if (state.blocks.length === 1) return state;
            let currentBlockIndex = state.blocks.findIndex((block) => block.id === id);
            blockTobeFocused = currentBlockIndex > 0
                ? state.blocks?.find((_, index) => index === currentBlockIndex - 1)?.id || id
                : state.blocks?.find((_, index) => index === currentBlockIndex + 1)?.id || id;
            const updatedBlocks = state.blocks.filter((b) => b.id !== id);
            saveBlocks(updatedBlocks)
            return {
                blocks: updatedBlocks,
            };
        })
        return blockTobeFocused;
    },
    moveBlock: (fromId: string, toId: string) =>
        set((state) => {
            const oldIndex = state.blocks.findIndex(b => b.id === fromId);
            const newIndex = state.blocks.findIndex(b => b.id === toId);

            if (oldIndex === -1 || newIndex === -1) return state;

            const blocks = [...state.blocks];
            const [moved] = blocks.splice(oldIndex, 1);
            blocks.splice(newIndex, 0, moved);
            saveBlocks(blocks);
            return { blocks };
        })
}));
