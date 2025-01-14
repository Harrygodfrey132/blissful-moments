import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Allow children to be passed into the modal
}

const ModalEdit: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white md:px-12 px-6 py-10 rounded shadow w-full m-4 md:w-1/2">
        {/* Modal Content */}
        {children}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded font-semibold bg-gray-300 text-gray-600 hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
