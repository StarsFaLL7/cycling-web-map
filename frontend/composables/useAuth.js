export const useAuthOpen = () => {
  return useState("isAuthOpen");
};

export const useToggleAuth = () => {
  const authOpen = useState("isAuthOpen");
  authOpen.value = !authOpen.value;
};
