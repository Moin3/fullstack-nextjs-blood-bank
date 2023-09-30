import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
interface IModal{
    isOpen:boolean,
     onClose:()=>void,
     children:React.ReactNode
}

const Modal = ({ isOpen, onClose, children }:IModal) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-10 relative">
            <button
              onClick={onClose}
              className="absolute lg:top-6 md:top-6 top-10 lg:right-6 md:right-6 right-14 text-gray-500 hover:text-gray-700"
            >
           < AiOutlineClose/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
