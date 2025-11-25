import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiUser, FiPhone, FiMapPin, FiHash } from "react-icons/fi";

export default function AjouterBeneficiaire({ isOpen, onClose, beneficiary, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    cin: '',
    nom: '',
    adresse: '',
    contact: '',
    statut: 'Actif'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Empêcher le défilement du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Initialiser le formulaire
  useEffect(() => {
    if (beneficiary) {
      setFormData(beneficiary);
    } else {
      setFormData({
        id: `B${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        cin: '',
        nom: '',
        adresse: '',
        contact: '',
        statut: 'Actif'
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [beneficiary, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cin.trim()) {
      newErrors.cin = 'Le numéro CIN est requis';
    } else if (formData.cin.length !== 8) {
      newErrors.cin = 'Le CIN doit contenir 8 chiffres';
    } else if (!/^\d+$/.test(formData.cin)) {
      newErrors.cin = 'Le CIN ne doit contenir que des chiffres';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
    } else if (formData.adresse.length < 10) {
      newErrors.adresse = "L'adresse semble trop courte";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Le numéro de téléphone est requis';
    } else if (!/^\d+$/.test(formData.contact)) {
      newErrors.contact = 'Le numéro ne doit contenir que des chiffres';
    } else if (formData.contact.length !== 10) {
      newErrors.contact = 'Le numéro doit contenir exactement 10 chiffres';
    } else if (!formData.contact.startsWith('03') && !formData.contact.startsWith('05') && !formData.contact.startsWith('06') && !formData.contact.startsWith('07')) {
      newErrors.contact = 'Le numéro doit commencer par 03, 05, 06 ou 07';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simuler un délai pour l'UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSave(formData);
      onClose();
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let filteredValue = value;
    if (name === 'contact' || name === 'cin') {
      filteredValue = value.replace(/\D/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: filteredValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95 sm:scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-[#76bc21]/10 rounded-lg">
              <FiUser className="w-4 h-4 sm:w-6 sm:h-6 text-[#76bc21]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {beneficiary ? 'Modifier le bénéficiaire' : 'Nouveau bénéficiaire'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 hidden xs:block">
                {beneficiary ? 'Modifiez les informations du bénéficiaire' : 'Ajoutez un nouveau bénéficiaire au système'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Fermer"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* ID (lecture seule) */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiHash className="w-4 h-4 text-[#76bc21]" />
                ID Bénéficiaire
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-mono text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Identifiant unique généré automatiquement</p>
            </div>

            {/* CIN */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiUser className="w-4 h-4 text-[#76bc21]" />
                Numéro CIN *
              </label>
              <input
                type="text"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                maxLength={8}
                className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors text-sm ${
                  errors.cin 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="12345678"
                inputMode="numeric"
              />
              {errors.cin ? (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.cin}
                </p>
              ) : (
                <p className="text-gray-500 text-xs mt-2">8 chiffres uniquement</p>
              )}
            </div>

            {/* Nom */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiUser className="w-4 h-4 text-[#76bc21]" />
                Nom complet *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors text-sm ${
                  errors.nom 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Jean Dupont"
              />
              {errors.nom && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.nom}
                </p>
              )}
            </div>

            {/* Adresse */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 text-[#76bc21]" />
                Adresse complète *
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors text-sm resize-none ${
                  errors.adresse 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="123 Rue Principale, 75001 Paris, France"
              />
              {errors.adresse ? (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.adresse}
                </p>
              ) : (
                <p className="text-gray-500 text-xs mt-2">Adresse postale complète</p>
              )}
            </div>

            {/* Contact - Numéro de téléphone */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 text-[#76bc21]" />
                Numéro de téléphone *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">+33</span>
                </div>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  maxLength={10}
                  className={`w-full pl-12 pr-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors text-sm ${
                    errors.contact 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="612345678"
                  inputMode="tel"
                />
              </div>
              {errors.contact ? (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.contact}
                </p>
              ) : (
                <p className="text-gray-500 text-xs mt-2">10 chiffres (ex: 0612345678)</p>
              )}
            </div>

            {/* Statut */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut du bénéficiaire
              </label>
              <div className="relative">
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-colors text-sm appearance-none bg-white"
                >
                  <option value="Actif">✅ Actif</option>
                  <option value="En attente">⏳ En attente</option>
                  <option value="Rejeté">❌ Rejeté</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                {formData.statut === 'Actif' && 'Le bénéficiaire peut recevoir des aides'}
                {formData.statut === 'En attente' && 'En attente de validation des documents'}
                {formData.statut === 'Rejeté' && 'Le dossier a été rejeté'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200 sticky bottom-0 bg-white pb-2 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex-1 xs:flex-none"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-[#76bc21] text-white rounded-lg hover:bg-[#5a8f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium flex-1 xs:flex-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {beneficiary ? 'Modification...' : 'Création...'}
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  {beneficiary ? 'Modifier' : 'Créer'} le bénéficiaire
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}