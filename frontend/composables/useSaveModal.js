export const useSaveModalOpen = () => {
  return useState("isSaveModalOpen");
};

export const useToggleSaveModal = () => {
  const saveModalOpen = useState("isSaveModalOpen");
  saveModalOpen.value = !saveModalOpen.value;
};
