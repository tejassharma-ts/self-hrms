import { useState } from "react";

export default function useSelectItems(values: string[] = []) {
  const [selectedItems, setSelectedItems] = useState<string[]>(values);

  function handleSelectChange(value: string) {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
    }
  }

  function isOptionSelected(value: string): boolean {
    return selectedItems.includes(value);
  }

  function clearSelectedItems() {
    setSelectedItems([]);
  }

  return { selectedItems, handleSelectChange, isOptionSelected, clearSelectedItems };
}
