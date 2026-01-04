import { SLASH_COMMANDS, SlashCommand } from "../../types/command";

type Props = {
  onSelect: (command: SlashCommand) => void;
};

export default function SlashMenu({ onSelect }: Props) {
  return (
    <div className="absolute z-50 w-64 rounded-md border bg-[#252525] top-6 left-5 shadow-lg border-[#383836]">
      {SLASH_COMMANDS.map((cmd) => (
        <div
          key={cmd.id}
          onClick={() => onSelect(cmd)}
          className="cursor-pointer px-2 py-1 hover:bg-[#2e2e2e]"
        >
          <div className="font-medium">{cmd.label}</div>
          <div className="text-sm text-neutral-500">
            {cmd.description}
          </div>
        </div>
      ))}
    </div>
  );
}
