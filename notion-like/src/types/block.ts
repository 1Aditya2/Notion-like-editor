import { RefObject } from "react";

export type Block = ParagraphBlock | HeadingBlock | CodeBlock;

type BaseBlock = {
  id: string;
  createdAt?: number;
};

export type ParagraphBlock = BaseBlock & {
  type: "paragraph";
  content: string;
};

export type HeadingBlock = BaseBlock & {
  type: "heading";
  level: 1 | 2 | 3;
  content: string;
};

export type CodeBlock = BaseBlock & {
  type: "code";
  language: string;
  content: string;
};
export type blockPropsType = {
  // block: CodeBlock | ParagraphBlock  | HeadingBlock;
  handleBlur: (ref: RefObject<HTMLDivElement|null>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement|null>) => void;
  handleInput: (ref: RefObject<HTMLDivElement|null>) => void;
}
  