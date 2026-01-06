import { RefObject } from "react";

export type Block = ParagraphBlock | HeadingBlock | CodeBlock | QuoteBlock;

type BaseBlock = {
  id: string;
  createdAt?: number;
};
export enum blockTypes {
  PARAGRAPH = 'paragraph',
  HEADING = 'heading',
  CODE = 'code',
  QUOTE = 'quote'
};
export type QuoteBlock = BaseBlock & {
  type: blockTypes.QUOTE;
  content: string
}
export type ParagraphBlock = BaseBlock & {
  type: blockTypes.PARAGRAPH;
  content: string;
};

export type HeadingBlock = BaseBlock & {
  type: blockTypes.HEADING;
  level: 1 | 2 | 3;
  content: string;
};

export type CodeBlock = BaseBlock & {
  type: blockTypes.CODE;
  language: string;
  content: string;
};
export type blockPropsType = {
  block: Block;
  handleBlur: (ref: RefObject<HTMLDivElement|null>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement|null>) => void;
  handleInput: (ref: RefObject<HTMLDivElement|null>) => void;
}
  