import { useRef } from "react";
import { modals } from "@mantine/modals";

export function useModal() {
  const modalIdRef = useRef(null);

  const openConfirm = ({ content }) => {
    modalIdRef.current = modals.open({
      centered: true,
      withCloseButton: false,
      children: content || null,
    });
  };

  const onClose = () => {
    if (modalIdRef.current) {
      modals.close(modalIdRef.current);
      modalIdRef.current = null; // clear after closing
    }
  };

  return { openConfirm, onClose };
}
