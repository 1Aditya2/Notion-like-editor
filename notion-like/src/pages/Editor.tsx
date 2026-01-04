import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import BlockRenderer from "../components/BlockRenderer/BlockRenderer";
import { useEditorStore } from "../store/editorStore";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
function Editor() {
    const { blocks, moveBlock } = useEditorStore();
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        moveBlock(active.id as string, over.id as string);
    };
    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={blocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className='w-[65%] h-[70vh] overflow-auto rounded-lg p-1 flex flex-col justify-start gap-4'>
                    {blocks.map((block) => {
                        return (
                            <BlockRenderer key={block.id}
                                block={block}
                            />
                        );
                    })}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default Editor