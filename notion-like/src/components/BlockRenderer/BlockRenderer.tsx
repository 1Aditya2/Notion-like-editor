import { Block, blockTypes } from "../../types/block";
import ParagraphBlock from "../Blocks/ParagraphBlock";
import HeadingBlock from "../Blocks/HeadingBlock";
import CodeBlock from "../Blocks/CodeBlock";
import { useEditorStore } from "../../store/editorStore";
import { RefObject, useState } from "react";
import { focusOnNewBlock, keyDownHandler } from "../Blocks/blockFunctions";
import SlashMenu from "../SlashCommand/SlashCommandUI";
import { createNewBlock } from "../../utils/helper";
import { SlashCommand } from "../../types/command";
import BlockWrapper from "../Blocks/BlockWrapper";
import QuoteBlock from "../Blocks/QuoteBlock";

export default function BlockRenderer({ block }: { block: Block }) {
  const { blocks, updateBlock, insertBlockAfter, deleteBlock, replaceBlock } = useEditorStore();
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);

  const handleBlur = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    updateBlock(block.id, ref.current?.innerText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>,
    ref: RefObject<HTMLDivElement | null>) => {
      if (!isSlashMenuOpen) {
        keyDownHandler(e, ref, insertBlockAfter, deleteBlock, block.id, blocks);
      }
  };

  const handleInput = (ref: RefObject<HTMLDivElement | null>) => {
    const text = ref.current?.innerText || "";
    if (text.startsWith("/") && text.length === 1) {
      setIsSlashMenuOpen(true);
    } else {
      setIsSlashMenuOpen(false);
    }
  }

  const callOnSelect = ({ type, level = 1 }: SlashCommand) => {
    const newBlock = createNewBlock(type, level);
    replaceBlock(block.id, newBlock);
    setIsSlashMenuOpen(false);
    focusOnNewBlock(newBlock.id, true);
  }

  const renderBlock = () => {
    switch (block.type) {
      case blockTypes.PARAGRAPH:
        return <ParagraphBlock block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown} />;
      case blockTypes.HEADING:
        return <HeadingBlock block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown} />;
      case blockTypes.CODE:
        return <CodeBlock
          block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
        />
      case blockTypes.QUOTE:
        return <QuoteBlock
          block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
        />
      default:
        return null;
    }
  }
  return (
    <BlockWrapper id={block.id}>
      <div className="relative">
        {renderBlock()}
        {isSlashMenuOpen && <SlashMenu onSelect={callOnSelect} onClose={() => setIsSlashMenuOpen(false)}/>}
      </div>
    </BlockWrapper>
  );
}
