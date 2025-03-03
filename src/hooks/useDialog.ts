import { useState } from 'react';

export default function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return {
    isDialogOpen,
    openDialog: () => setIsDialogOpen(true),
    closeDialog: () => setIsDialogOpen(false),
  };
}
