import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
};

export default function BlockWrapper({ id, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group flex gap-2 justify-center items-center">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab opacity-0 group-hover:opacity-100 select-none"
      >
        ⋮⋮
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
