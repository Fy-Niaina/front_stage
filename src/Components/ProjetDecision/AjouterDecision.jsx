import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { getFolders } from "../../services/api/folderApi";

export default function AjouterDecision({ isOpen, onClose, decision, onSave, onSaved }) {
  const [folders, setFolders] = useState([]);
  const [formData, setFormData] = useState({
    folder_id: "",
    type_decision: "",
    numero_visa: "",
    decision_agent: "",
    budget: "",
    allocated_amount: "",
    numero_decision: "",
    code_imputation: "",
    remark: "",
    date_decision: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getFolders();
        setFolders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des dossiers", err);
      }
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    if (decision) {
      setFormData({
        folder_id: decision.folder_id || "",
        type_decision: decision.type_decision || "",
        numero_visa: decision.numero_visa || "",
        decision_agent: decision.decision_agent || "",
        budget: decision.budget || "",
        allocated_amount: decision.allocated_amount || "",
        numero_decision: decision.numero_decision || "",
        code_imputation: decision.code_imputation || "",
        remark: decision.remark || "",
        date_decision: decision.date_decision || "",
      });
    } else {
      setFormData({
        folder_id: "",
        type_decision: "",
        numero_visa: "",
        decision_agent: "",
        budget: "",
        allocated_amount: "",
        numero_decision: "",
        code_imputation: "",
        remark: "",
        date_decision: "",
      });
    }
  }, [decision, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await onSave(formData);
      onSaved?.();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{decision ? "Modifier Décision" : "Ajouter Décision"}</h2>
            {decision && <p className="text-sm text-gray-600">ID : <strong>{decision.id}</strong></p>}
          </div>
          <button onClick={onClose}><FiX /></button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dossier <span className="text-red-500">*</span></label>
            <select
              name="folder_id"
              value={formData.folder_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Sélectionner un dossier</option>
              {folders.map(f => (
                <option key={f.id} value={f.id}>
                  {f.matricule} – {f.deceased_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Type de décision</span>
              <input name="type_decision" value={formData.type_decision} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Numéro de visa</span>
              <input name="numero_visa" value={formData.numero_visa} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Agent décisionnaire</span>
              <input name="decision_agent" value={formData.decision_agent} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Budget</span>
              <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Montant alloué</span>
              <input type="number" name="allocated_amount" value={formData.allocated_amount} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Numéro décision</span>
              <input name="numero_decision" value={formData.numero_decision} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Code imputation</span>
              <input name="code_imputation" value={formData.code_imputation} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-1">Date de la décision</span>
              <input type="date" name="date_decision" value={formData.date_decision} onChange={handleChange} className="w-full p-2 border rounded" required />
            </label>

            <label className="flex flex-col col-span-1 md:col-span-2">
              <span className="text-sm mb-1">Remarque</span>
              <textarea name="remark" value={formData.remark} onChange={handleChange} className="w-full p-2 border rounded" />
            </label>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Annuler</button>
            <button type="submit" disabled={loading} className="bg-[#76bc21] text-white px-4 py-2 rounded flex items-center gap-2">
              <FiSave /> {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}