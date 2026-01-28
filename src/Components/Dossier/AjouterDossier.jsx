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
    deceased_poste: "",
    deceased_cin: "",
    deceased_job: "",
    deceased_pension: "",
    deceased_name: "",
    date_death: "",
    status: "en_cours",
    remark: ""
  });

  /* ================= INIT ================= */
  useEffect(() => {
    if (dossier) {
      setFormData({
        matricule: dossier.matricule || "",
        deceased_pension: dossier.deceased_pension || "",
        deceased_job: dossier.deceased_job || "",
        deceased_cin: dossier.deceased_cin || "",
        deceased_poste: dossier.deceased_poste || "",
        deceased_name: dossier.deceased_name || "",
        upload_date: dossier.upload_date || "",
        date_death: dossier.date_death || "",
        status: dossier.status || "en_cours",
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

  if (!formData.matricule || !formData.upload_date || !formData.date_death) {
    setError("Veuillez remplir tous les champs obligatoires");
    return;
  }

  setLoading(true);
  try {
    const dataToSend = {
      matricule: formData.matricule,
      upload_date: formData.upload_date,
      date_death: formData.date_death,
      deceased_job: formData.deceased_job,
      deceased_cin: formData.deceased_cin,
      deceased_pension: formData.deceased_pension,
      deceased_poste: formData.deceased_poste,
      deceased_name: formData.deceased_name,
      status: formData.status,
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
           <div>
            <label className="text-sm font-medium">
              Date du décès <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date_death"
              value={formData.date_death}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl"
            />
          </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium mb-1">Nom du défunt*</label>
              <input type="text" name="deceased_name" value={formData.deceased_name} onChange={handleChange} 
                className={`w-full p-2 border rounded-lg`} />
              {/* {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>} */}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium mb-1">Travail du défunt</label>
              <input type="text" name="deceased_job" value={formData.deceased_job} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>

            {/* deceased_poste */}
            <div>
              <label className="block text-sm font-medium mb-1">Poste du défunt *</label>
              <input type="text" name="deceased_poste" value={formData.deceased_poste} onChange={handleChange} maxLength={12}
                className={`w-full p-2 border rounded-lg`} />
            </div>

           {/* deceased_poste */}
            <div>
              <label className="block text-sm font-medium mb-1">CIN du défunt*</label>
              <input type="text" name="deceased_cin" value={formData.deceased_cin} onChange={handleChange} maxLength={12}
                className={`w-full p-2 border rounded-lg`} />
            </div>
          </div>
          {/* ETAT */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium mb-1">Pension du défunt*</label>
              <input type="text" name="deceased_pension" value={formData.deceased_pension} onChange={handleChange} 
                className={`w-full p-2 border rounded-lg`} />
              {/* {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>} */}
            </div>

            {/* Prénom */}
        <div>
            <label className="block text-sm font-medium mb-1">État du dossier</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            className={`w-full p-2 border rounded-lg`}
            >
              <option value="valide">Validé</option>
              <option value="en_cours">En cours</option>
              <option value="rejete">Rejété</option>
            </select>
          </div>
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
