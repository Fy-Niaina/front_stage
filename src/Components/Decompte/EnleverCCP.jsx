// Decompte/EnleverCCP.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiMinus, FiDollarSign } from "react-icons/fi";

export default function EnleverCCP({ 
  isOpen, 
  onClose, 
  decompte, 
  onSave 
}) {
  const [enleverMontant, setEnleverMontant] = useState('');
  const [ancienTotal, setAncienTotal] = useState(0);
  const [nouveauTotal, setNouveauTotal] = useState(0);

  // Calculer le montant total actuel
  const calculateTotalAmount = (decompte) => {
    if (!decompte) return 0;
    
    let total = 900;
    for (let i = 601; i <= 610; i++) {
      const fieldKey = `field${i}`;
      if (decompte[fieldKey]) {
        // Pour field602, on soustrait au lieu d'ajouter
        if (fieldKey === 'field602') {
          total -= parseFloat(decompte[fieldKey]) || 0;
        } else {
          total += parseFloat(decompte[fieldKey]) || 0;
        }
      }
    }
    return Math.max(0, total);
  };

  // Calculer le nouveau total après soustraction
  const calculateNewTotal = (currentTotal, subtractAmount) => {
    const subtract = parseFloat(subtractAmount) || 0;
    return Math.max(0, currentTotal - subtract);
  };

  useEffect(() => {
    if (decompte && isOpen) {
      const totalActuel = calculateTotalAmount(decompte);
      setAncienTotal(totalActuel);
      setNouveauTotal(totalActuel);
      
      // Pré-remplir avec la valeur existante de field602 si elle existe
      if (decompte.field602) {
        setEnleverMontant(decompte.field602);
        const nouveau = calculateNewTotal(totalActuel, decompte.field602);
        setNouveauTotal(nouveau);
      } else {
        // Ajouter une valeur d'exemple pour la simulation (10% du total actuel)
        const exempleMontant = (totalActuel * 0.1).toFixed(2);
        setEnleverMontant(exempleMontant);
        
        // Calculer le nouveau total avec l'exemple
        const nouveau = calculateNewTotal(totalActuel, exempleMontant);
        setNouveauTotal(nouveau);
      }
    }
  }, [decompte, isOpen]);

  useEffect(() => {
    if (enleverMontant !== '') {
      const nouveau = calculateNewTotal(ancienTotal, enleverMontant);
      setNouveauTotal(nouveau);
    } else {
      setNouveauTotal(ancienTotal);
    }
  }, [enleverMontant, ancienTotal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!enleverMontant || parseFloat(enleverMontant) <= 0) {
      alert("Veuillez saisir un montant valide à enlever");
      return;
    }

    if (parseFloat(enleverMontant) > ancienTotal) {
      alert("Le montant à enlever ne peut pas être supérieur au total actuel");
      return;
    }

    // Créer l'objet avec le nouveau field602
    const updatedFields = {
      field602: enleverMontant
    };

    onSave(updatedFields);
    setEnleverMontant('');
    onClose();
  };

  const handleClose = () => {
    setEnleverMontant('');
    onClose();
  };

  // Fonction pour appliquer un pourcentage rapidement
  const applyPercentage = (percentage) => {
    const montant = (ancienTotal * (percentage / 100)).toFixed(2);
    setEnleverMontant(montant);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <FiMinus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Enlever CCP</h2>
              <p className="text-sm text-gray-500">Soustraire un montant du total</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations du décompte */}
          {decompte && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">ID:</span>
                <span className="text-sm font-semibold text-[#76bc21]">{decompte.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Nom:</span>
                <span className="text-sm text-gray-900">{decompte.nom}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">CIN:</span>
                <span className="text-sm font-mono text-gray-700">{decompte.cin}</span>
              </div>
            </div>
          )}

          {/* Montants */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-700">Total actuel:</span>
              <span className="text-lg font-bold text-blue-700">
                {new Intl.NumberFormat('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(ancienTotal)} Ar
              </span>
            </div>

            {/* Boutons de pourcentage rapide */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Pourcentages rapides:
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => applyPercentage(10)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  10%
                </button>
                <button
                  type="button"
                  onClick={() => applyPercentage(25)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  25%
                </button>
                <button
                  type="button"
                  onClick={() => applyPercentage(50)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  50%
                </button>
                <button
                  type="button"
                  onClick={() => applyPercentage(75)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  75%
                </button>
              </div>
            </div>

            {/* Champ de saisie */}
            <div className="space-y-2">
              <label htmlFor="enleverMontant" className="block text-sm font-medium text-gray-700">
                Montant à enlever (CCP 602)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="enleverMontant"
                  step="0.01"
                  min="0"
                  max={ancienTotal}
                  value={enleverMontant}
                  onChange={(e) => setEnleverMontant(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21] transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Montant maximum: {ancienTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar
              </p>
            </div>

            {/* Simulation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Simulation:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Total actuel:</span>
                  <span className="font-medium">{ancienTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Montant à enlever:</span>
                  <span className="font-medium text-red-600">- {enleverMontant ? parseFloat(enleverMontant).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) : '0.00'} Ar</span>
                </div>
                <div className="flex justify-between border-t border-yellow-200 pt-2">
                  <span className="text-yellow-700 font-medium">Nouveau total:</span>
                  <span className="font-bold text-green-600">{nouveauTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!enleverMontant || parseFloat(enleverMontant) <= 0}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Enlever le montant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}