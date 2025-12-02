// DecisionDecesForm.jsx
import React, { useState } from 'react';
import { FiFileText, FiUser, FiCalendar, FiDollarSign, FiSave } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DecisionDecesForm() {
  const [formData, setFormData] = useState({
    numeroDecision: '',
    nomVeufVeuve: '',
    nomDefunt: '',
    numPension: '',
    dateDeces: '',
    budget: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
        <header className="mb-6">
        <h1 className="text-2xl font-extrabold">Décision d'attribution de secours au décès Pensions</h1>
        <p className='text-[#76bc21]'><Link to="/decisions">Aller à Soldes</Link></p>
      </header>
      <div className="max-w-3xl mx-auto bg-white border border-[#76bc21]/30 rounded-2xl shadow-md overflow-hidden">
        <div className="bg-[#76bc21] text-white py-4 px-6 flex items-center gap-3">
          <FiFileText className="w-6 h-6" />
          <h1 className="text-xl font-semibold">
            Décision d’octroi de secours aux décès
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Numéro de décision */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiFileText className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Numéro de Décision
            </label>
            <input
              type="text"
              name="numeroDecision"
              value={formData.numeroDecision}
              onChange={handleChange}
              placeholder="Ex: 2025-MEF/SG/DGBF/DSP/SRSP-1H"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Nom du veuf/veuve */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiUser className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Nom du Bénéficiaire
            </label>
            <input
              type="text"
              name="nomVeufVeuve"
              value={formData.nomVeufVeuve}
              onChange={handleChange}
              placeholder="Ex: Mme XXXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Nom du défunt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiUser className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Nom du Défunt
            </label>
            <input
              type="text"
              name="nomDefunt"
              value={formData.nomDefunt}
              onChange={handleChange}
              placeholder="Ex: YYYY"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Numéro de pension */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiFileText className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Numéro de Pension
            </label>
            <input
              type="text"
              name="numPension"
              value={formData.numPension}
              onChange={handleChange}
              placeholder="Ex: 08491866"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Date de décès */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiCalendar className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Date de Décès
            </label>
            <input
              type="date"
              name="dateDeces"
              value={formData.dateDeces}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiDollarSign className="inline-block w-4 h-4 mr-2 text-[#76bc21]" />
              Montant du Secours (Ariary)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Ex: 1056669"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#76bc21] focus:border-[#76bc21]"
              required
            />
          </div>

          {/* Bouton d'enregistrement */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#76bc21] text-white px-6 py-3 rounded-lg hover:bg-[#68a71d] transition-all font-medium"
            >
              <FiSave className="w-5 h-5" />
              Enregistrer 
            </button>
          </div>
        </form>

        {isSubmitted && (
          <div className="bg-green-50 border-t border-green-200 p-4 text-green-700 text-sm text-center">
            ✅ Données enregistrées avec succès !
          </div>
        )}
      </div>
    </div>
  );
}
