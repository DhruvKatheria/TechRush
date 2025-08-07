import React from 'react';

const MessageModal = ({ message, onConfirm, onCancel, showCancel = false, inputPlaceholder = '', onInputChange, inputValue }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
        <p className="text-lg font-semibold text-gray-800 mb-4 text-center">{message}</p>
        {inputPlaceholder && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => onInputChange && onInputChange(e.target.value)}
          />
        )}
        <div className="flex justify-end space-x-3">
          {showCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;