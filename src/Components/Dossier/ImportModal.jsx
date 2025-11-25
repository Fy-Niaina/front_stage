// Components/ImportModal/ImportModal.jsx
import React, { useState } from 'react';
import { FiX, FiUpload, FiFile, FiCheck, FiFolder } from "react-icons/fi";

export default function ImportModal({ isOpen, onClose, dossier, onImport }) {
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const documentTypes = [
    "La demande avec adresse et contacts exacts, adressée au Directeur de la Solde et des Pensions",
    "Acte de décès",
    "Acte de mariage",
    "Certificat de non-séparation de corps et de non-divorce délivré par le Fokontany",
    "Acte de tutelle",
    "Ordonnance de tutelle délivrée par le Tribunal",
    "Acte de naissance de chaque enfant mineur (moins de 21 ans)",
    "Photocopie de la CIN certifiée du demandeur",
    "Photocopie de l'avis de cessation de paiement de la caisse",
    "Certificat de vie (de moins de 3 mois) de la veuve dépendant de la décision de paiement des veuves"
  ];

  const handleDocumentToggle = (docType) => {
    setSelectedDocuments(prev => ({
      ...prev,
      [docType]: !prev[docType]
    }));
  };

  const handleFileUpload = (docType, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [docType]: file
      }));
    }
  };

  const handleConfirmImport = () => {
    const importedDocs = Object.keys(selectedDocuments)
      .filter(docType => selectedDocuments[docType] && uploadedFiles[docType])
      .map(docType => ({
        type: docType,
        file: uploadedFiles[docType],
        date: new Date().toISOString()
      }));

    if (importedDocs.length > 0) {
      onImport(importedDocs);
      onClose();
      setSelectedDocuments({});
      setUploadedFiles({});
    }
  };

  const getUploadedCount = () => {
    return Object.keys(uploadedFiles).length;
  };

  const getSelectedCount = () => {
    return Object.values(selectedDocuments).filter(Boolean).length;
  };

  if (!isOpen || !dossier) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <FiUpload className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Importer des documents
              </h3>
              <p className="text-sm text-gray-600">
                Dossier: <strong>{dossier.id}</strong> - {dossier.nom}
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

        {/* Progress Summary */}
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{getSelectedCount()}</div>
                <div className="text-sm text-blue-700">Sélectionnés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{getUploadedCount()}</div>
                <div className="text-sm text-green-700">Importés</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Progression</div>
              <div className="text-lg font-bold text-gray-900">
                {getUploadedCount()}/{getSelectedCount()} documents
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="p-6">
          <div className="space-y-4">
            {documentTypes.map((docType, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={!!selectedDocuments[docType]}
                    onChange={() => handleDocumentToggle(docType)}
                    className="mt-1 text-purple-500 focus:ring-purple-500"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiFile className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <label className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                        {docType}
                      </label>
                    </div>

                    {selectedDocuments[docType] && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {uploadedFiles[docType] ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-green-600">
                              <FiCheck className="w-4 h-4" />
                              <div>
                                <div className="text-sm font-medium">{uploadedFiles[docType].name}</div>
                                <div className="text-xs text-green-500">
                                  Taille: {(uploadedFiles[docType].size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const newFiles = { ...uploadedFiles };
                                delete newFiles[docType];
                                setUploadedFiles(newFiles);
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Changer
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(docType, e)}
                              className="hidden"
                              id={`file-upload-${index}`}
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                            <label
                              htmlFor={`file-upload-${index}`}
                              className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              Choisir un fichier
                            </label>
                            <span className="text-xs text-gray-500">
                              Formats: PDF, JPG, PNG, DOC
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={getUploadedCount() === 0}
            className="flex items-center gap-2 px-6 py-2 bg-[#76bc21] text-white rounded-lg hover:bg-[#5a8f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <FiUpload className="w-4 h-4" />
            Importer ({getUploadedCount()} documents)
          </button>
        </div>
      </div>
    </div>
  );
}