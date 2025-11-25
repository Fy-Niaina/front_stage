import React, { useState } from 'react';

export default function FormulaireVisaDeces() {
  const [formData, setFormData] = useState({
    numeroVisa: '',
    dateVisa: new Date().toISOString().slice(0, 10),
    delegue: 'Le Délégué Régional du Contrôle Financier - Ihorombe',
    nomVeufVeuve: '',
    nomDefunt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Formulaire soumis avec succès !\nVisa N°: ${formData.numeroVisa}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 "> 
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl ">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800 ">
          Décision de Secours au Décès
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 ">Numéro de Visa :</label>
            <input
              type="text"
              name="numeroVisa"
              value={formData.numeroVisa}
              onChange={handleChange}
              placeholder="Ex: N°145/DRCF/IH"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Date du Visa :</label>
            <input
              type="date"
              name="dateVisa"
              value={formData.dateVisa}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Délégué Régional :</label>
            <input
              type="text"
              name="delegue"
              value={formData.delegue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom du Veuf / Veuve :</label>
            <input
              type="text"
              name="nomVeufVeuve"
              value={formData.nomVeufVeuve}
              onChange={handleChange}
              placeholder="Ex: Mme NINA Razafy Savavy"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom du Défunt :</label>
            <input
              type="text"
              name="nomDefunt"
              value={formData.nomDefunt}
              onChange={handleChange}
              placeholder="Ex: MAHAZOMADY Martin"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enregistrer le Visa
          </button>
        </form>
      </div>
    </div>
  );
}
