import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { getFolders } from "../../services/api/folderApi";

export default function AjouterSecours({ isOpen, onClose, secours, onSave, onSaved }) {
  const [folders, setFolders] = useState([]);
  const [formData, setFormData] = useState({
    folder_id: "",
    numero_secours: "",
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

  // Remplir le formulaire si édition
  useEffect(() => {
    if (secours) {
      setFormData({
        folder_id: secours.folder_id || "",
        numero_secours: secours.numero_secours || "",
      });
    } else {
      setFormData({ folder_id: "", numero_secours: "" });
    }
  }, [secours, isOpen]);

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
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{secours ? "Modifier Secours" : "Ajouter Secours"}</h2>
            {secours && <p className="text-sm text-gray-600">ID : <strong>{secours.id}</strong></p>}
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
            >
              <option value="">Sélectionner un dossier</option>
              {folders.map(f => (
                <option key={f.id} value={f.id}>
                  {f.matricule} – {f.deceased_name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex flex-col">
            <span className="text-sm mb-1">Numéro de Secours <span className="text-red-500">*</span></span>
            <input
              name="numero_secours"
              value={formData.numero_secours}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>

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