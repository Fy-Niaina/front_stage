import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { getFolders } from "../../services/api/folderApi";

export default function AjouterCpp({ isOpen, onClose, cessation, onSave, onSaved }) {
  const [folders, setFolders] = useState([]);
  const [formData, setFormData] = useState({
    folder_id: "",
    // beneficiary: "",
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
        // beneficiary: cessation.beneficiary || "",
        deceased_name: cessation.deceased_name || "",
        amount: cessation.amount || "",
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
        // beneficiary: "",
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

  // Quand on change le dossier, mettre à jour le beneficiary automatiquement
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
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

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

          {/* Dropdown Dossier */}
          <select
            name="folder_id"
            value={formData.folder_id}
            onChange={handleFolderChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Sélectionner un dossier</option>
            {folders.map(f => (
              <option key={f.id} value={f.id}>
                {f.matricule} – {f.beneficiary.name}
              </option>
            ))}
          </select>

          {/* Beneficiary auto-rempli
          <input
            type="text"
            name="beneficiary"
            placeholder="Bénéficiaire"
            value={formData.beneficiary.cin}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
          /> */}

          {/* Les autres champs */}
          <input
            type="text"
            name="deceased_name"
            placeholder="Nom du décédé"
            value={formData.deceased_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="amount"
            placeholder="Montant"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {[
            "six_one","six_two","six_three","six_four","six_five",
            "six_six","six_seven","six_eight","six_nine","six_ten"
          ].map((field, idx) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={`Champ ${idx + 1}`}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ))}

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