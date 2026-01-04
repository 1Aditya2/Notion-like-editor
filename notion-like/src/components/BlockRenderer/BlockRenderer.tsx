import { Block } from "../../types/block";
import ParagraphBlock from "../Blocks/ParagraphBlock";
import HeadingBlock from "../Blocks/HeadingBlock";
import CodeBlock from "../Blocks/CodeBlock";
import { useEditorStore } from "../../store/editorStore";
import { RefObject, useState } from "react";
import { keyDownHandler } from "../Blocks/blockFunctions";
import SlashMenu from "../SlashCommand/SlashCommandUI";
import { createNewBlock } from "../../utils/helper";
import { SlashCommand } from "../../types/command";
import BlockWrapper from "../Blocks/BlockWrapper";

type Props = {
  block: Block;
};

export default function BlockRenderer({ block }: Props) {
  const { blocks, updateBlock, insertBlockAfter, deleteBlock, replaceBlock } = useEditorStore();
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);

  const handleBlur = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    updateBlock(block.id, ref.current?.innerText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>,
    ref: RefObject<HTMLDivElement | null>) => {
    keyDownHandler(e, ref, insertBlockAfter, deleteBlock, block.id, blocks);
  };

  const handleInput = (ref: RefObject<HTMLDivElement | null>) => {
    const text = ref.current?.innerText || "";
    if (text.startsWith("/")) {
      setIsSlashMenuOpen(true);
    } else {
      setIsSlashMenuOpen(false);
    }
  }

  const callOnSelect = ({ type, level = 1 }: SlashCommand) => {
    const newBlock = createNewBlock(type, level);
    replaceBlock(block.id, newBlock);
    setIsSlashMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.querySelector(
        `[data-block-id="${block.id}"]`
      ) as HTMLDivElement | null;
      el?.focus();
    });
  }

  const renderBlock = () => {
    switch (block.type) {
      case "paragraph":
        return <ParagraphBlock block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown} />;
      case "heading":
        return <HeadingBlock block={block}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown} />;
      case 'code':
        return <CodeBlock
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
        {isSlashMenuOpen && <SlashMenu onSelect={callOnSelect} />}
      </div>
    </BlockWrapper>
  );
}
