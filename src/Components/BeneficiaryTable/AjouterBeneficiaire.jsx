import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiUser, FiPhone, FiMapPin, FiHash, FiMessageSquare, FiInfo } from "react-icons/fi";

export default function AjouterBeneficiaire({ isOpen, onClose, beneficiary, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    firstname: '', // Ajouté
    cin: '',
    sexe: 'Femme', // Ajouté (défaut selon 'in:Femme,Homme')
    contact: '',
    adresse: '',
    state: 'Actif', // Corrigé (était statut)
    remark: '' // Ajouté
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (beneficiary) {
        setFormData(beneficiary);
      } else {
        setFormData({
          name: '',
          firstname: '',
          cin: '',
          sexe: 'Femme',
          contact: '',
          adresse: '',
          state: 'Actif',
          remark: ''
        });
      }
      setErrors({});
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, beneficiary]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.cin.trim()) {
      newErrors.cin = 'Le CIN est requis';
    } else if (formData.cin.length > 12) {
      newErrors.cin = 'Le CIN ne doit pas dépasser 12 caractères';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Le contact est requis';
    } else if (formData.contact.length !== 10) {
      newErrors.contact = 'Le contact doit avoir 10 chiffres';
    }

    if (!['Actif', 'Inactif'].includes(formData.state)) {
        newErrors.state = 'Statut invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
        onClose();
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiUser className="text-[#76bc21]" />
            {beneficiary ? 'Modifier' : 'Nouveau'} Bénéficiaire
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium mb-1">Nom *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} 
                className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium mb-1">Prénom</label>
              <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>

            {/* CIN */}
            <div>
              <label className="block text-sm font-medium mb-1">CIN *</label>
              <input type="text" name="cin" value={formData.cin} onChange={handleChange} maxLength={12}
                className={`w-full p-2 border rounded-lg ${errors.cin ? 'border-red-500' : 'border-gray-300'}`} />
            </div>

            {/* Sexe */}
            <div>
              <label className="block text-sm font-medium mb-1">Sexe *</label>
              <select name="sexe" value={formData.sexe} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
              </select>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium mb-1">Contact * (10 chiffres)</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} maxLength={10}
                className={`w-full p-2 border rounded-lg ${errors.contact ? 'border-red-500' : 'border-gray-300'}`} />
            </div>

            {/* Statut (State) */}
            <div>
              <label className="block text-sm font-medium mb-1">État *</label>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <textarea name="adresse" value={formData.adresse} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          {/* Remarque */}
          <div>
            <label className="block text-sm font-medium mb-1">Remarque</label>
            <textarea name="remark" value={formData.remark} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Observations éventuelles..." />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Annuler</button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-[#76bc21] text-white rounded-lg hover:bg-[#5a8f1a] disabled:opacity-50">
              {isSubmitting ? 'Enregistrement...' : <><FiSave /> Enregistrer</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}