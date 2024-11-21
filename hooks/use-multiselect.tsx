import { useState } from "react";

export default function useMultiSelect<T>(values: T[] = [], keyExtractor: (item: T) => string) {
  const [selectedItems, setSelectedItems] = useState<T[]>(values);

  function handleSelectChange(item: T) {
    const key = keyExtractor(item);
    const selectedKeys = selectedItems.map(keyExtractor);

    if (!selectedKeys.includes(key)) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((i) => keyExtractor(i) !== key));
    }
  }

  function isOptionSelected(item: T): boolean {
    const key = keyExtractor(item);
    return selectedItems.map(keyExtractor).includes(key);
  }

  function clearSelectedItems() {
    setSelectedItems([]);
  }

  return { selectedItems, handleSelectChange, isOptionSelected, clearSelectedItems };
}
