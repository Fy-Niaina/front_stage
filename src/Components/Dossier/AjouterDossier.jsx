import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { addFolder, updateFolder } from "../../services/api/folderApi";
import { getBeneficiaries } from "../../services/api/beneficiaryApi";

export default function AjouterDossier({ isOpen, onClose, dossier, onSaved }) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    matricule: "",
    upload_date: "",
    beneficiary_id: "",
    folder_state: "Actif",
    remark: ""
  });

  /* ================= INIT ================= */
  useEffect(() => {
    if (dossier) {
      setFormData({
        matricule: dossier.matricule || "",
        upload_date: dossier.upload_date || "",
        beneficiary_id: dossier.beneficiary_id || "",
        folder_state: dossier.folder_state || "Actif",
        remark: dossier.remark || ""
      });
    }
  }, [dossier]);

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const data = await getBeneficiaries();
      setBeneficiaries(Array.isArray(data) ? data : []);
    } catch {
      setError("Impossible de charger les bénéficiaires");
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!formData.matricule || !formData.upload_date || !formData.beneficiary_id) {
    setError("Veuillez remplir tous les champs obligatoires");
    return;
  }

  setLoading(true);
  try {
    const dataToSend = {
      matricule: formData.matricule,
      upload_date: formData.upload_date,
      beneficiary_id: formData.beneficiary_id,
      folder_state: formData.folder_state,
      remark: formData.remark
    };

    if (dossier) {
      console.log("Updating folder:", dossier.id, dataToSend);
      await updateFolder(dossier.id, dataToSend); 
    } else {
      await addFolder(dataToSend);
    }

    onSaved?.();
    onClose();
  } catch (err) {
    console.error("Erreur backend:", err.response?.data || err.message);
    setError("Erreur lors de l'enregistrement du dossier");
  } finally {
    setLoading(false);
  }
};


  if (!isOpen) return null;

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {dossier ? "Modifier le dossier" : "Ajouter un dossier"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* MATRICULE */}
          <div>
            <label className="text-sm font-medium">
              Matricule <span className="text-red-500">*</span>
            </label>
            <input
              name="matricule"
              value={formData.matricule}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
            />
          </div>

          {/* DATE UPLOAD */}
          <div>
            <label className="text-sm font-medium">
              Date de dépôt <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="upload_date"
              value={formData.upload_date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
            />
          </div>

          {/* BENEFICIAIRE */}
          <div>
            <label className="text-sm font-medium">
              Bénéficiaire <span className="text-red-500">*</span>
            </label>
            <select
              name="beneficiary_id"
              value={formData.beneficiary_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
            >
              <option value="">-- Sélectionner --</option>
              {beneficiaries.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} {b.firstname} ({b.cin})
                </option>
              ))}
            </select>
          </div>

          {/* ETAT */}
          <div>
            <label className="text-sm font-medium">État du dossier</label>
            <select
              name="folder_state"
              value={formData.folder_state}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          {/* REMARQUE */}
          <div>
            <label className="text-sm font-medium">Remarque</label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-3 border rounded-xl"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 border rounded-xl">
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#76bc21] text-white px-6 py-2 rounded-xl"
            >
              <FiSave />
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
