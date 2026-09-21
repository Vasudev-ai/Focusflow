export const registerEscapeKeyHandler = (isOpen, onClose) => {
  if (!isOpen) return undefined;

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose();
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
};
