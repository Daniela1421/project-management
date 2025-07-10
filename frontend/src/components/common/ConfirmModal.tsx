import React from "react";

type Props = {
  show: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h3 className="text-lg font-semibold mb-2">{title || "Confirmar acción"}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
