import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactDOM from "react-dom";
import IconButton from "../Forms/IconButton/IconButton";

interface ModalProps {
  children: React.ReactNode;
  title: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function Modal({
  children,
  onClose,
  isOpen,
  title,
}: ModalProps) {
  const portalElement = document.getElementById("portal");
  if (portalElement == null || !isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center">
      <section className="p-6 bg-white rounded-sm z-50">
        <section className="flex justify-between items-center text-xl my-3">
          {title}
          <IconButton onClick={onClose}>
            <AiOutlineClose name="close" />
          </IconButton>
        </section>

        {children}
      </section>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>
    </div>,
    portalElement
  );
}
