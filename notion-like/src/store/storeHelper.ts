import { Block } from "../types/block";

const STORAGE_KEY = 'block_storage_key';
export const loadBlocks = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
        return null;
    } catch (e) {
        alert('Cannot load blocks! Try later!');
        return null;
    }
}
export const saveBlocks = (blocks: Block[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch (error) {
        alert('Cannot save blocks!Try later!');
    }
}