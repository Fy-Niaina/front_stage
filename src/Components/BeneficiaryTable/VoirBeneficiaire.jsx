import React, { useEffect } from 'react';
import { 
  FiX, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiCreditCard, 
  FiFlag, 
  FiFileText, 
  FiCalendar, 
  FiClock,
  FiInfo,
  FiActivity
} from "react-icons/fi";

export default function VoirBeneficiaire({ isOpen, onClose, beneficiary }) {
  
  // Bloquer le scroll derrière le modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !beneficiary) return null;

  // Helpers pour le style
  const getStatusStyle = (state) => {
    return state === "Actif" 
      ? "bg-green-100 text-green-700 border-green-200" 
      : "bg-red-100 text-red-700 border-red-200";
  };

  // Petit composant interne pour les lignes de détails
  const DetailField = ({ icon: Icon, label, value, isMono, isUpper }) => (
    <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        <Icon className="w-3 h-3" />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-sm font-semibold text-gray-800 ${isMono ? 'font-mono' : ''} ${isUpper ? 'uppercase' : ''}`}>
        {value || "---"}
      </p>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col transform transition-all">
        
        {/* HEADER COLORÉ */}
        <div className="bg-[#76bc21] p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-[#76bc21] text-3xl font-bold shadow-inner">
              {beneficiary.name[0]}{beneficiary.firstname[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono tracking-tighter">
                  ID: #{beneficiary.id}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border bg-white ${getStatusStyle(beneficiary.state).split(' ')[1]}`}>
                  {beneficiary.state}
                </span>
              </div>
              <h2 className="text-2xl font-bold uppercase leading-tight">
                {beneficiary.name} {beneficiary.firstname}
              </h2>
              <p className="opacity-80 text-sm">{beneficiary.sexe} • {beneficiary.cin}</p>
            </div>
          </div>
        </div>

        {/* CORPS DES DÉTAILS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Section 1: Informations Personnelles */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <FiUser className="text-[#76bc21]" /> Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailField icon={FiUser} label="Nom de famille" value={beneficiary.name} isUpper />
              <DetailField icon={FiUser} label="Prénom(s)" value={beneficiary.firstname} />
              <DetailField icon={FiActivity} label="Sexe / Genre" value={beneficiary.sexe} />
              <DetailField icon={FiCreditCard} label="Numéro CIN" value={beneficiary.cin} isMono />
            </div>
          </section>

          {/* Section 2: Contact et Localisation */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <FiPhone className="text-[#76bc21]" /> Contact & Adresse
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailField icon={FiPhone} label="Téléphone" value={beneficiary.contact} />
              <div className="sm:col-span-2">
                <DetailField icon={FiMapPin} label="Adresse de résidence" value={beneficiary.adresse} />
              </div>
            </div>
          </section>

          {/* Section 3: Remarques */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <FiFileText className="text-[#76bc21]" /> Observations
            </h3>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
              <p className="text-sm text-yellow-800 italic">
                {beneficiary.remark || "Aucune remarque enregistrée pour ce bénéficiaire."}
              </p>
            </div>
          </section>

          {/* Section 4: Historique Système */}
          <section className="pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-between text-[11px] text-gray-400 italic">
              <div className="flex items-center gap-2">
                <FiCalendar /> Créé le : {new Date(beneficiary.created_at).toLocaleString('fr-FR')}
              </div>
              <div className="flex items-center gap-2">
                <FiClock /> Dernière modification : {new Date(beneficiary.updated_at).toLocaleString('fr-FR')}
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
          {/* <button 
            className="px-8 py-2.5 bg-[#76bc21] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#76bc21]/30 transition-all flex items-center gap-2"
            onClick={() => window.print()}
          >
            <FiInfo /> Imprimer la fiche
          </button> */}
        </div>
      </div>
    </div>
  );
}