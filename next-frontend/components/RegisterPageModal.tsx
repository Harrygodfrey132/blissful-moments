import React from "react";

interface RegisterPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterPageModal: React.FC<RegisterPageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Register Your Page</h2>
        <p className="text-sm text-gray-600 mb-6">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium maiores delectus ducimus alias aspernatur ex officiis, laudantium laborum ipsum optio at ad, perferendis, itaque facere eaque deleniti saepe possimus quas.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageModal;
