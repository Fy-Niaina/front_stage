import React, { useEffect } from 'react';
import { FiX, FiUser, FiPhone, FiMapPin, FiCreditCard, FiFlag, FiFileText, FiCalendar, FiFolder, FiDownload } from "react-icons/fi";

export default function VoirBeneficiaire({ isOpen, onClose, beneficiary }) {
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !beneficiary) return null;

  const getStatusColor = (statut) => {
    switch (statut) {
      case "Actif": return "bg-green-100 text-green-800 border-green-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejeté": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (statut) => {
    switch (statut) {
      case "Actif": return "✅";
      case "En attente": return "⏳";
      case "Rejeté": return "❌";
      default: return "📋";
    }
  };

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  };

  // Données supplémentaires simulées
  const additionalInfo = {
    dateCreation: "15 Jan 2024",
    derniereMaj: "20 Jan 2024",
    documents: 3,
    dossiersActifs: 2,
    dernierDocument: "Certificat de résidence"
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95 sm:scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <FiUser className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Détails du bénéficiaire
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 hidden xs:block">
                Informations complètes du bénéficiaire
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Photo de profil et statut */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                {beneficiary.nom.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center text-xs ${getStatusColor(beneficiary.statut)}`}>
                {getStatusIcon(beneficiary.statut)}
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3">
              {beneficiary.nom}
            </h3>
            <p className="text-sm text-gray-600">ID: {beneficiary.id}</p>
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* ID Bénéficiaire */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  ID Bénéficiaire
                </label>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 font-mono">
                {beneficiary.id}
              </p>
            </div>

            {/* Numéro CIN */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  Numéro CIN
                </label>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 font-mono">
                {beneficiary.cin}
              </p>
            </div>

            {/* Nom complet */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                {beneficiary.nom}
              </p>
            </div>

            {/* Adresse */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  Adresse complète
                </label>
              </div>
              <div className="bg-white px-3 py-2 rounded border border-gray-300 min-h-[60px]">
                <p className="text-gray-900 text-sm sm:text-base leading-relaxed">
                  {beneficiary.adresse}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
              </div>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-300">
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {formatPhoneNumber(beneficiary.contact)}
                </p>
                <a 
                  href={`tel:${beneficiary.contact}`}
                  className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Appeler"
                >
                  <FiPhone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Statut */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <FiFlag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                  Statut du dossier
                </label>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1.5 sm:py-2 rounded-full text-sm font-medium border ${getStatusColor(beneficiary.statut)}`}>
                  {getStatusIcon(beneficiary.statut)} {beneficiary.statut}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  {beneficiary.statut === 'Actif' && '✅ Dossier actif et valide'}
                  {beneficiary.statut === 'En attente' && '⏳ En cours de validation'}
                  {beneficiary.statut === 'Rejeté' && '❌ Dossier rejeté'}
                </span>
              </div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <FiFolder className="w-4 h-4" />
              Informations supplémentaires
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
              <div className="bg-white/50 rounded p-2 sm:p-3">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <FiCalendar className="w-3 h-3" />
                  <span className="text-xs font-medium">Création</span>
                </div>
                <p className="text-blue-900 font-semibold text-sm">{additionalInfo.dateCreation}</p>
              </div>
              <div className="bg-white/50 rounded p-2 sm:p-3">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <FiCalendar className="w-3 h-3" />
                  <span className="text-xs font-medium">Mise à jour</span>
                </div>
                <p className="text-blue-900 font-semibold text-sm">{additionalInfo.derniereMaj}</p>
              </div>
              <div className="bg-white/50 rounded p-2 sm:p-3">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <FiFileText className="w-3 h-3" />
                  <span className="text-xs font-medium">Documents</span>
                </div>
                <p className="text-blue-900 font-semibold text-sm">{additionalInfo.documents} fichiers</p>
              </div>
              <div className="bg-white/50 rounded p-2 sm:p-3">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <FiFolder className="w-3 h-3" />
                  <span className="text-xs font-medium">Dossiers actifs</span>
                </div>
                <p className="text-blue-900 font-semibold text-sm">{additionalInfo.dossiersActifs} dossiers</p>
              </div>
            </div>
            
            {/* Dernier document */}
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-700 font-medium mb-1">Dernier document ajouté</p>
                  <p className="text-sm text-blue-900">{additionalInfo.dernierDocument}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs">
                  <FiDownload className="w-3 h-3" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Actions rapides</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <FiFileText className="w-4 h-4 text-gray-600 group-hover:text-blue-500" />
                <span className="text-xs text-gray-700 group-hover:text-blue-700">Documents</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-300 hover:border-green-500 hover:bg-green-50 transition-colors group">
                <FiFolder className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
                <span className="text-xs text-gray-700 group-hover:text-green-700">Dossiers</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                <FiCalendar className="w-4 h-4 text-gray-600 group-hover:text-purple-500" />
                <span className="text-xs text-gray-700 group-hover:text-purple-700">Historique</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors group">
                <FiDownload className="w-4 h-4 text-gray-600 group-hover:text-orange-500" />
                <span className="text-xs text-gray-700 group-hover:text-orange-700">Exporter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200 bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex-1 sm:flex-none"
          >
            Fermer
          </button>
          <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm flex-1 sm:flex-none">
            <FiDownload className="w-4 h-4" />
            Exporter la fiche
          </button>
        </div>
      </div>
    </div>
  );
}