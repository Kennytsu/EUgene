import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { RegulatoryCard } from "@/components/shared/RegulatoryCard";
import { useLegislativeFiles, LegislativeFileItem } from "@/hooks/useMeetings";
import { LegislativeDetailSheet } from "@/components/shared/LegislativeDetailSheet";
import { cn } from "@/lib/utils";

// Define board columns based on legislative stages
const columns = [
  { id: 'preparatory', label: 'Preparatory', statuses: ['Preparatory phase in Parliament'] },
  { id: 'committee', label: 'Committee', statuses: ['Awaiting committee decision'] },
  { id: 'first-reading', label: '1st Reading', statuses: ['Awaiting Parliament\'s position in 1st reading', 'Awaiting Council\'s 1st reading position'] },
  { id: 'second-reading', label: '2nd Reading', statuses: ['Awaiting Parliament 2nd reading'] },
  { id: 'vote', label: 'Vote/Plenary', statuses: ['Awaiting plenary debate/vote', 'Awaiting Parliament\'s vote'] },
  { id: 'final', label: 'Final Stage', statuses: ['Awaiting signature of act', 'Awaiting final decision', 'Procedure completed, awaiting publication in Official Journal'] },
  { id: 'completed', label: 'Completed', statuses: ['Procedure completed', 'Procedure completed - delegated act enters into force', 'Procedure lapsed or withdrawn', 'Procedure rejected'] },
];

export default function Board() {
  const { data: legislativeItems = [], isLoading } = useLegislativeFiles(100);
  const [items, setItems] = useState<LegislativeFileItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<LegislativeFileItem | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<LegislativeFileItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (legislativeItems.length > 0) {
      setItems(legislativeItems);
    }
  }, [legislativeItems]);

  const getColumnItems = (statuses: string[]) => 
    items.filter(item => 
      item.legislativeStatus && statuses.some(s => 
        item.legislativeStatus?.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(item.legislativeStatus?.toLowerCase() || '')
      )
    );

  const handleDragStart = (item: LegislativeFileItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (columnId: string) => {
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const handleCardClick = (item: LegislativeFileItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border">
          <h1 className="text-lg font-semibold text-foreground">Legislative Board</h1>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading legislative files...
            </div>
          ) : (
            <div className="flex gap-4 min-w-max h-full">
              {columns.map((column) => {
                const columnItems = getColumnItems(column.statuses);
                const isOver = dragOverColumn === column.id;

                return (
                  <div
                    key={column.id}
                    className="w-72 flex-shrink-0 flex flex-col"
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(column.id)}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <h3 className="text-sm font-medium text-foreground">{column.label}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {columnItems.length}
                      </span>
                    </div>

                    {/* Column Content */}
                    <div
                      className={cn(
                        "flex-1 p-2 rounded-lg transition-colors space-y-2 overflow-y-auto",
                        isOver ? "bg-secondary" : "bg-muted/30"
                      )}
                    >
                      {columnItems.map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item)}
                          className={cn(
                            draggedItem?.id === item.id && "opacity-50"
                          )}
                        >
                          <RegulatoryCard 
                            item={item} 
                            compact 
                            draggable 
                            onClick={() => handleCardClick(item)}
                          />
                        </div>
                      ))}

                      {columnItems.length === 0 && (
                        <div className="flex items-center justify-center h-24 text-xs text-muted-foreground">
                          No items
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <LegislativeDetailSheet
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </AppLayout>
  );
}