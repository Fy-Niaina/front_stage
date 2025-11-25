// Components/ConfirmationModal/ConfirmationModal.jsx
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmation de suppression",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ?",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  type = "danger"
}) {
  if (!isOpen) return null;

  const getIconColor = () => {
    return type === "danger" ? "text-red-500" : "text-yellow-500";
  };

  const getButtonColor = () => {
    return type === "danger" 
      ? "bg-red-500 hover:bg-red-600 focus:ring-red-500" 
      : "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${getIconColor()}/10 rounded-lg border ${getIconColor()}/20`}>
              <FiAlertTriangle className={`w-6 h-6 ${getIconColor()}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-gray-600 text-center">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 ${getButtonColor()} text-white rounded-lg transition-colors font-medium focus:ring-2 focus:ring-offset-2`}
          >
            <FiTrash2 className="w-4 h-4" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}