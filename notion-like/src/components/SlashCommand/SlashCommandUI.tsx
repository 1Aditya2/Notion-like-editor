import { useEffect, useRef, useState } from "react";
import { SLASH_COMMANDS, SlashCommand } from "../../types/command";

type Props = {
  onSelect: (command: SlashCommand) => void;
  onClose: () => void;
};

export default function SlashMenu({ onSelect, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((curr) => (curr + 1) % SLASH_COMMANDS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((curr) => curr !== 0 ? curr - 1 : SLASH_COMMANDS.length-1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onSelect(SLASH_COMMANDS[active])
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [active, onClose, onSelect]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute z-50 w-64 rounded-md border bg-[#252525] top-6 left-5 shadow-lg border-[#383836]" >
      {SLASH_COMMANDS.map((cmd, index) => (
        <div
          key={cmd.id}
          onClick={() => onSelect(cmd)}
          onMouseEnter={() => setActive(index)}
          className={`cursor-pointer px-2 py-1 ${active === index ? 'bg-[#2e2e2e]' : ''}`}
        >
          <div className="font-medium">{cmd.label}</div>
          <div className="text-sm text-neutral-500">
            {cmd.description}
          </div>
        </div>
      ))}
       <div
          key={'slash'}
          className="p-1 border-t-[1px] border-[#383836]"
        >
          <div className="text-sm text-neutral-500">
            Press "esc" to type slash here!
          </div>
        </div>
    </div>
  );
}
