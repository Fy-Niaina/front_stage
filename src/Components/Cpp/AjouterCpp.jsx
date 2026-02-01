import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { getFolders } from "../../services/api/folderApi";

export default function AjouterCpp({ isOpen, onClose, cessation, onSave, onSaved }) {
  const [folders, setFolders] = useState([]);
  const [formData, setFormData] = useState({
    folder_id: "",
    date_cessation: "",
    six_one: "",
    six_two: "",
    six_three: "",
    six_four: "",
    six_five: "",
    six_six: "",
    six_seven: "",
    six_eight: "",
    six_nine: "",
    six_ten: "",
    remark: ''
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
    if (cessation) {
      setFormData({
        folder_id: cessation.folder_id || "",
        remark: cessation.remark || "",
        date_cessation: cessation.date_cessation || "",
        six_one: cessation.six_one || "",
        six_two: cessation.six_two || "",
        six_three: cessation.six_three || "",
        six_four: cessation.six_four || "",
        six_five: cessation.six_five || "",
        six_six: cessation.six_six || "",
        six_seven: cessation.six_seven || "",
        six_eight: cessation.six_eight || "",
        six_nine: cessation.six_nine || "",
        six_ten: cessation.six_ten || ""
      });
    } else {
      setFormData({
        folder_id: "",
        deceased_name: "",
        amount: "",
        six_one: "",
        six_two: "",
        six_three: "",
        six_four: "",
        six_five: "",
        six_six: "",
        six_seven: "",
        six_eight: "",
        six_nine: "",
        six_ten: ""
      });
    }
  }, [cessation, isOpen]);

  const handleFolderChange = (e) => {
    const folderId = e.target.value;
    const folder = folders.find(f => f.id.toString() === folderId);
    setFormData({
      ...formData,
      folder_id: folderId,
      beneficiary: folder ? folder.beneficiary : ""
    });
  };

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
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{cessation ? "Modifier CPP" : "Ajouter CPP"}</h2>
            {cessation && <p className="text-sm text-gray-600">CPP : <strong>{cessation.id}</strong></p>}
          </div>
          <button onClick={onClose}><FiX /></button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Grid à 2 colonnes pour les premiers champs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                Date de la cessation <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date_cessation"
                value={formData.date_cessation}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">
                Dossier <span className="text-red-500">*</span>
              </label>
              <select
                name="folder_id"
                value={formData.folder_id}
                onChange={handleFolderChange}
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Sélectionner un dossier</option>
                {folders.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.matricule} – {f.deceased_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid à 2 colonnes pour les champs six_* */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { field: "six_one", label: "Champ 1" },
              { field: "six_two", label: "Champ 2" },
              { field: "six_three", label: "Champ 3" },
              { field: "six_four", label: "Champ 4" },
              { field: "six_five", label: "Champ 5" },
              { field: "six_six", label: "Champ 6" },
              { field: "six_seven", label: "Champ 7" },
              { field: "six_eight", label: "Champ 8" },
              { field: "six_nine", label: "Champ 9" },
              { field: "six_ten", label: "Champ 10" }
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="text-sm font-medium block mb-1">{label}</label>
                <input
                  type="text"
                  name={field}
                  placeholder={label}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Remarque en pleine largeur */}
          <div>
            <label className="block text-sm font-medium mb-1">Remarque</label>
            <textarea 
              name="remark" 
              value={formData.remark} 
              onChange={handleChange} 
              rows={3} 
              className="w-full p-3 border border-gray-300 rounded-xl" 
              placeholder="Observations éventuelles..." 
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="border px-6 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#76bc21] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#6aad1e] transition disabled:opacity-50"
            >
              <FiSave /> {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}