import { useEffect } from "react";

const useEscapeKey = (isActive, closeActiveModal, modalRef) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlayClick = (e) => {
      console.log("e.target:", e.target);
      console.log("modalRef.current:", modalRef?.current);

      if (modalRef?.current && e.target === modalRef.current) {
        console.log("Overlay clicked, closing modal...");
        closeActiveModal();
      } else {
        console.log("Clicked inside the modal content, ignoring...");
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isActive, closeActiveModal, modalRef]);
};

export default useEscapeKey;
