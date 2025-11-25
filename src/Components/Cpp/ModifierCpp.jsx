// Components/ModifierCpp/ModifierCpp.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiSave } from "react-icons/fi";

export default function ModifierCpp({ isOpen, onClose, cpp, onSave }) {
  const [formData, setFormData] = useState({
    field601: '',
    field602: '',
    field603: '',
    field604: '',
    field605: '',
    field606: '',
    field607: '',
    field608: '',
    field609: '',
    field610: ''
  });

  // Initialiser le formulaire avec les données du CPP
  useEffect(() => {
    if (cpp) {
      setFormData({
        field601: cpp.field601 || '',
        field602: cpp.field602 || '',
        field603: cpp.field603 || '',
        field604: cpp.field604 || '',
        field605: cpp.field605 || '',
        field606: cpp.field606 || '',
        field607: cpp.field607 || '',
        field608: cpp.field608 || '',
        field609: cpp.field609 || '',
        field610: cpp.field610 || ''
      });
    }
  }, [cpp, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sauvegarder avec les données existantes du CPP + les champs modifiés
    const updatedCpp = {
      ...cpp,
      ...formData
    };

    onSave(updatedCpp);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen || !cpp) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#76bc21]/10 rounded-lg">
              <FiSave className="w-6 h-6 text-[#76bc21]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Modifier le Certificat
              </h2>
              <p className="text-sm text-gray-600">
                CPP: <strong>{cpp.id}</strong> - {cpp.nom}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 601 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              601
            </label>
            <input
              type="text"
              name="field601"
              value={formData.field601}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 601"
            />
          </div>

          {/* 602 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              602
            </label>
            <input
              type="text"
              name="field602"
              value={formData.field602}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 602"
            />
          </div>

          {/* 603 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              603
            </label>
            <input
              type="text"
              name="field603"
              value={formData.field603}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 603"
            />
          </div>

          {/* 604 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              604
            </label>
            <input
              type="text"
              name="field604"
              value={formData.field604}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 604"
            />
          </div>

          {/* 605 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              605
            </label>
            <input
              type="text"
              name="field605"
              value={formData.field605}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 605"
            />
          </div>

          {/* 606 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              606
            </label>
            <input
              type="text"
              name="field606"
              value={formData.field606}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 606"
            />
          </div>

          {/* 607 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              607
            </label>
            <input
              type="text"
              name="field607"
              value={formData.field607}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 607"
            />
          </div>

          {/* 608 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              608
            </label>
            <input
              type="text"
              name="field608"
              value={formData.field608}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 608"
            />
          </div>

          {/* 609 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              609
            </label>
            <input
              type="text"
              name="field609"
              value={formData.field609}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 609"
            />
          </div>

          {/* 610 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              610
            </label>
            <input
              type="text"
              name="field610"
              value={formData.field610}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors"
              placeholder="Entrez la valeur pour 610"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#76bc21] text-white rounded-lg hover:bg-[#5a8f1a] transition-colors"
            >
              <FiSave className="w-4 h-4" />
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}