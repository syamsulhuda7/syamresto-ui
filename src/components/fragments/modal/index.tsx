import { useState } from 'react';

export default function Modal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="px-4 py-2 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        Open modal
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg w-[400px] p-6 text-gray-900"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-lg font-semibold mb-2">Text in a modal</h2>
            <p className="text-gray-700 mb-4">
              Aliquid amet deserunt earum!
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
