// Components/VoirCpp/VoirCpp.jsx
import React from 'react';
import { FiX, FiFileText, FiUser, FiPhone, FiMapPin, FiCalendar, FiCreditCard } from "react-icons/fi";

export default function VoirCpp({ isOpen, onClose, cpp }) {
  if (!isOpen || !cpp) return null;

  const getStatusColor = (statut) => {
    switch (statut) {
      case "Validé": return "bg-green-100 text-green-800 border-green-200";
      case "En cours": return "bg-blue-100 text-blue-800 border-blue-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejeté": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Fonction pour afficher les champs 601-610 seulement s'ils ont des valeurs
  const renderField = (fieldNumber, value) => {
    if (!value) return null;
    
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <FiFileText className="w-5 h-5 text-gray-500" />
          <label className="block text-sm font-medium text-gray-700">
            {fieldNumber}
          </label>
        </div>
        <p className="text-gray-900">{value}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <FiFileText className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Détails du Certificat CPP
              </h3>
              <p className="text-sm text-gray-600">
                Informations complètes du certificat de cessation de paiement
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiCreditCard className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">ID CPP</label>
              </div>
              <p className="text-lg font-bold text-gray-900">{cpp.id}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiUser className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">N° CIN</label>
              </div>
              <p className="text-lg font-mono font-bold text-gray-900">{cpp.cin}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiUser className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
              </div>
              <p className="text-lg font-bold text-gray-900">{cpp.nom}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiPhone className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Contact</label>
              </div>
              <p className="text-lg font-bold text-gray-900">{cpp.contact}</p>
            </div>

            <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiMapPin className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
              </div>
              <p className="text-gray-900">{cpp.adresse}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiCalendar className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Date création</label>
              </div>
              <p className="text-gray-900">{formatDate(cpp.dateCreation)}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FiFileText className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Statut</label>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(cpp.statut)}`}>
                {cpp.statut}
              </span>
            </div>
          </div>

          {/* Champs 601-610 (affichés seulement s'ils ont des valeurs) */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <FiFileText className="w-5 h-5" />
              Champs Spécifiques CPP
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("601", cpp.field601)}
              {renderField("602", cpp.field602)}
              {renderField("603", cpp.field603)}
              {renderField("604", cpp.field604)}
              {renderField("605", cpp.field605)}
              {renderField("606", cpp.field606)}
              {renderField("607", cpp.field607)}
              {renderField("608", cpp.field608)}
              {renderField("609", cpp.field609)}
              {renderField("610", cpp.field610)}
            </div>
            
            {/* Message si aucun champ spécifique n'est rempli */}
            {!cpp.field601 && !cpp.field602 && !cpp.field603 && !cpp.field604 && !cpp.field605 && 
             !cpp.field606 && !cpp.field607 && !cpp.field608 && !cpp.field609 && !cpp.field610 && (
              <div className="text-center py-4 text-gray-500">
                <p>Aucun champ spécifique n'a été renseigné pour ce certificat.</p>
                <p className="text-sm mt-1">Utilisez le bouton "Modifier" pour ajouter des informations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}