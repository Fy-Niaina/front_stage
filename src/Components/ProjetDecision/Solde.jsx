import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function FormulaireDecisionDeces() {
  const [form, setForm] = useState({
    visaNumber: "",
    decisionNumber: "",
    matricule: "",
    nomDefunt: "",
    dateDeces: "",
    lieuDeces: "",
    beneficiaireNom: "",
    beneficiaireCIN: "",
    lienAvecDefunt: "",
    budgetLibelle: "",
    codeImputation: "",
    montantAttribue: "",
    observations: "",
    dateDecision: "",
    agent: "",
  });

  const formRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validation simple
    if (!form.decisionNumber || !form.nomDefunt) {
      alert("Le numéro de décision et le nom du défunt sont obligatoires.");
      return;
    }
    alert("Formulaire prêt — utilise 'Exporter en PDF' ou 'Télécharger JSON'.");
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(form, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decision_deces_${form.decisionNumber || "nouveau"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printPreview() {
    // Ouvre l'aperçu impression du navigateur pour générer un PDF via 'Imprimer en PDF'
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold">Décision d'attribution de secours au décès Soldes</h1>
        <p className="text-[#76bc21]"><Link to="/decisions-pensions">Aller à Pensions</Link></p>
      </header>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-[#76bc21]">Numéro de décision</span>
            <input name="decisionNumber" value={form.decisionNumber} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Ex: MEF/SG/.." />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-[#76bc21]">Numéro Visa</span>
            <input name="visaNumber" value={form.visaNumber} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Visa CF" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-[#76bc21]">Matricule</span>
            <input name="matricule" value={form.matricule} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Ex: 447.254" />
          </label>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-[#76bc21]">Nom et prénom du défunt</span>
            <input name="nomDefunt" value={form.nomDefunt} onChange={handleChange} className="mt-1 p-2 border rounded" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-[#76bc21]">Date du décès</span>
            <input type="date" name="dateDeces" value={form.dateDeces} onChange={handleChange} className="mt-1 p-2 border rounded" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className="text-sm font-medium text-[#76bc21]">Lieu du décès</span>
            <input name="lieuDeces" value={form.lieuDeces} onChange={handleChange} className="mt-1 p-2 border rounded" />
          </label>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-medium mb-3">Bénéficiaire (Veuve / Veuf)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-[#76bc21]">Nom et prénom</span>
              <input name="beneficiaireNom" value={form.beneficiaireNom} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-[#76bc21]">CIN / N° d'identité</span>
              <input name="beneficiaireCIN" value={form.beneficiaireCIN} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-[#76bc21]">Lien avec le défunt</span>
              <input name="lienAvecDefunt" value={form.lienAvecDefunt} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Ex: épouse" />
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-[#76bc21]">Budget / Imputation</span>
            <input name="budgetLibelle" value={form.budgetLibelle} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="GENERAL" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-[#76bc21]">Code imputation</span>
            <input name="codeImputation" value={form.codeImputation} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="00-81-9-110" />
          </label>

          <label className="flex flex-col"> 
            <span className="text-sm text-[#76bc21]">Montant attribué (Ar)</span>
            <input name="montantAttribue" value={form.montantAttribue} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Ex: 1000000" />
          </label>
        </section>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Observations / Motif</span>
          <textarea name="observations" value={form.observations} onChange={handleChange} className="mt-1 p-2 border rounded" rows={4} />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-[#76bc21]">Date de la décision</span>
            <input type="date" name="dateDecision" value={form.dateDecision} onChange={handleChange} className="mt-1 p-2 border rounded" />
          </label>
 
          <label className="flex flex-col md:col-span-2">
            <span className="text-sm text-[#76bc21]">Nom de l'agent</span>
            <input name="agent" value={form.agent} onChange={handleChange} className="mt-1 p-2 border rounded" placeholder="Nom et fonction" />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 justify-end mt-4">
          <button type="submit" className="px-4 py-2 rounded-2xl bg- text-white">Enregistrer</button>
        </div>
      </form>

    </div>
  );
}
