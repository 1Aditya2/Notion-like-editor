import { blockTypes } from "./block";

export type SlashCommand = {
    id: string;
    label: string;
    description: string;
    type: blockTypes;
    level?: 1 | 2 | 3;
};
export const SLASH_COMMANDS: SlashCommand[] = [
    {
      id: "paragraph",
      label: "Text",
      description: "Just start writing",
      type: blockTypes.PARAGRAPH,
    },
    {
      id: "h1",
      label: "Heading 1",
      description: "Big section heading",
      type: blockTypes.HEADING,
      level: 1,
    },
    {
      id: "h2",
      label: "Heading 2",
      description: "Medium section heading",
      type: blockTypes.HEADING,
      level: 2,
    },
    {
        id: 'h3',
        label: 'Heading 3',
        description: 'Small section heding',
        type: blockTypes.HEADING,
        level: 3
    },
    {
      id: "code",
      label: "Code",
      description: "Code block",
      type: blockTypes.CODE,
    },
    {
      id: "quote",
      label: "Quote ('')",
      description: "Write a quote",
      type: blockTypes.QUOTE,
    }
  ];
  
