import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ setIsOpen, children, onConfirm }) {

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  
  const actionBar = (
    <div>
      <button
        className="bg-gray-500 text-white m-2 rounded p-2"
        onClick={() => setIsOpen(false)}>
        NO, CANCEL
      </button>
      <button
        className="bg-red-500 text-white m-2 rounded p-2"
        onClick={onConfirm}>
        YES, DELETE
      </button>

    </div>
  );

  return ReactDOM.createPortal(
    <div>
      <div
        className="fixed justify-center items-center inset-0 bg-gray-300 opacity-70">
      </div>
      <div className="fixed inset-40 p-10 bg-white w-1/3 rounded-3xl">
        <div className="flex flex-col justify-between h-full ">
          {children}
          <div className="flex justify-center">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );

}

export default Modal;
