import React, { useState } from "react";

// Décision d'octroi de Secours aux décès
// Composant React autonome (fichier unique)
// Texte principal en couleur #76bc21

export default function DecisionSecours() {
  const textColor = "#76bc21";

  // Valeurs par défaut (modifiable par l'utilisateur)
  const [visaNumber, setVisaNumber] = useState("");
  const [visaDate, setVisaDate] = useState("");
  const [decisionNumber, setDecisionNumber] = useState("");
  const [decisionDate, setDecisionDate] = useState("22 octobre 2025"); // date d'aujourd'hui Ihosy le 22 octobre 2025
  const [decedentName, setDecedentName] = useState("");
  const [pensionNumber, setPensionNumber] = useState("");
  const [budget, setBudget] = useState("");

  function handleReset() {
    setVisaNumber("");
    setVisaDate("");
    setDecisionNumber("");
    setDecisionDate("22 octobre 2025");
    setDecedentName("");
    setPensionNumber("");
    setBudget("");
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8" style={{ border: `1px solid ${textColor}30` }}>
        {/* En-tête */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold" style={{ color: textColor }}>
            Décision d'octroi de Secours aux décès
          </h1>
          <p className="mt-1 text-sm" style={{ color: textColor }}>
            Ihosy, le {decisionDate}
          </p>
        </header>

        {/* Formulaire/affichage */}
        <section className="grid grid-cols-1 gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Numéro de visa</span>
              <input
                value={visaNumber}
                onChange={(e) => setVisaNumber(e.target.value)}
                placeholder="Ex: VISA-2025-001"
                className="p-2 border rounded"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Date du visa</span>
              <input
                type="date"
                value={visaDate}
                onChange={(e) => setVisaDate(e.target.value)}
                className="p-2 border rounded"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Numéro donné par le bureau de secours</span>
              <input
                value={decisionNumber}
                onChange={(e) => setDecisionNumber(e.target.value)}
                placeholder="Ex: DS-2025-1001"
                className="p-2 border rounded"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Date de la décision</span>
              <input
                type="date"
                value={decisionDate}
                onChange={(e) => setDecisionDate(e.target.value)}
                className="p-2 border rounded"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Nom du Bénéficiaire</span>
              <input
                value={decedentName}
                onChange={(e) => setDecedentName(e.target.value)}
                placeholder="Nom du veuf/veuve"
                className="p-2 border rounded"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1" style={{ color: textColor }}>Numéro de pension</span>
              <input
                value={pensionNumber}
                onChange={(e) => setPensionNumber(e.target.value)}
                placeholder="Num pension"
                className="p-2 border rounded"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-sm mb-1" style={{ color: textColor }}>Budget alloué</span>
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ex: 150000 MGA"
              className="p-2 border rounded"
            />
          </label>
        </section>


        {/* Actions */}
        <footer className="mt-6 flex gap-3 justify-end">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded shadow-sm border"
            style={{ background: textColor, color: '#fff' }}
          >
            Enregistrer
          </button>
        </footer>

      </div>
    </div>
  );
}
