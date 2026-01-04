export type SlashCommand = {
    id: string;
    label: string;
    description: string;
    type: "paragraph" | "heading" | "code";
    level?: 1 | 2 | 3;
};
export const SLASH_COMMANDS: SlashCommand[] = [
    {
      id: "paragraph",
      label: "Text",
      description: "Just start writing",
      type: "paragraph",
    },
    {
      id: "h1",
      label: "Heading 1",
      description: "Big section heading",
      type: "heading",
      level: 1,
    },
    {
      id: "h2",
      label: "Heading 2",
      description: "Medium section heading",
      type: "heading",
      level: 2,
    },
    {
        id: 'h3',
        label: 'Heading 3',
        description: 'Small section heding',
        type: 'heading',
        level: 3
    },
    {
      id: "code",
      label: "Code",
      description: "Code block",
      type: "code",
    },
  ];
  
