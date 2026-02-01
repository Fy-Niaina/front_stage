import React, { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { assignBeneficiaires } from "../../services/api/folderApi";

export default function AssignBeneficiairesModal({
  isOpen,
  onClose,
  folderId,
  allBeneficiaires,
  currentBeneficiaires,
  onSaved
}) {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentBeneficiaires) {
      setSelected(
        currentBeneficiaires.map(b => ({
          id: b.id,
          role: b.pivot?.role || ""
        }))
      );
    }
  }, [currentBeneficiaires, isOpen]);

  const toggle = (ben) => {
    const exists = selected.find(b => b.id === ben.id);
    if (exists) {
      setSelected(selected.filter(b => b.id !== ben.id));
    } else {
      setSelected([...selected, { id: ben.id, role: "" }]);
    }
  };

  const updateRole = (id, role) => {
    setSelected(selected.map(b =>
      b.id === id ? { ...b, role } : b
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await assignBeneficiaires(folderId, {
        beneficiaires: selected
      });
      onSaved();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Gérer les bénéficiaires</h3>
          <button onClick={onClose}><FiX /></button>
        </div>

        {/* Liste */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {allBeneficiaires.map(ben => {
            const checked = selected.find(b => b.id === ben.id);
            return (
              <div key={ben.id} className="border p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!checked}
                    onChange={() => toggle(ben)}
                  />
                  <span className="font-semibold">
                    {ben.name} {ben.firstname}
                  </span>
                </div>

                {checked && (
                  <input
                    className="mt-2 w-full border rounded p-2 text-sm"
                    placeholder="Rôle (Conjoint, Enfant, Tuteur...)"
                    value={checked.role}
                    onChange={e => updateRole(ben.id, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiSave /> {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}