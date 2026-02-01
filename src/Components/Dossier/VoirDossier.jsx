import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiFileText,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiEdit,
  FiDownload,
  FiShield,
} from "react-icons/fi";
import { getFolderById } from "../../services/api/folderApi";
import Header from "../Header/Header";
import { getBeneficiaries } from "../../services/api/beneficiaryApi";
import AssignBeneficiairesModal from "./AssignBeneficiairesModal";

export default function VoirDossier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [allBeneficiaires, setAllBeneficiaires] = useState([]);

  useEffect(() => {
  const fetchBeneficiaires = async () => {
    const data = await getBeneficiaries();
    setAllBeneficiaires(data);
  };
  fetchBeneficiaires();
}, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchDossierDetails();
  }, [id]);

  const fetchDossierDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFolderById(id);
      setDossier(data);
    } catch (err) {
      setError("Erreur lors du chargement des détails du dossier");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !dossier) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header onMenuToggle={handleMenuToggle} />
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl">
            <p className="font-semibold">{error || "Dossier introuvable"}</p>
            <button
              onClick={() => navigate("/dossiers")}
              className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-800"
            >
              <FiArrowLeft /> Retour à la liste
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={handleMenuToggle} />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dossiers")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="font-medium">Retour à la liste des dossiers</span>
          </button>

          <div className="border border-green-200 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dossier {dossier.matricule}</h1>
                <p className="text-black-100">ID: #{dossier.id}</p>
              </div>
              <div className="flex gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(dossier.status)}`}>
                  {dossier.status}
                </span>
                {/* <button
                  onClick={() => navigate(`/dossiers/edit/${dossier.id}`)}
                  className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  <FiEdit /> Modifier
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations générales */}
          <Section title="Informations générales" icon={<FiFileText className="text-blue-600" />}>
            <InfoRow label="Matricule" value={dossier.matricule} />
            <InfoRow label="Date de dépôt" value={formatDate(dossier.upload_date)} />
            <InfoRow label="Statut" value={
              <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusColor(dossier.status)}`}>
                {dossier.status}
              </span>
            } />
            <InfoRow label="Créé le" value={formatDate(dossier.created_at)} />
            <InfoRow label="Mis à jour le" value={formatDate(dossier.updated_at)} />
            {dossier.remark && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Remarque:</p>
                <p className="text-sm text-yellow-700">{dossier.remark}</p>
              </div>
            )}
          </Section>

          {/* Informations du défunt */}
          <Section title="Informations du défunt" icon={<FiUser className="text-purple-600" />}>
            <InfoRow label="Nom complet" value={dossier.deceased_name} highlight />
            <InfoRow label="CIN" value={dossier.deceased_cin} />
            <InfoRow label="Profession" value={dossier.deceased_job} />
            <InfoRow label="Poste" value={dossier.deceased_poste} />
            <InfoRow label="N° Pension" value={dossier.deceased_pension} />
            <InfoRow label="Date de décès" value={formatDate(dossier.date_death)} highlight />
          </Section>
        </div>

        {/* Bénéficiaires - Pleine largeur */}
        <div className="mt-6">
          <Section 
            title={`Bénéficiaires (${dossier.beneficiaires?.length || 0})`} 
            icon={<FiUser className="text-green-600" />}
          >
             <button
             onClick={() => setIsAssignModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
        <FiUser /> Gérer
        </button>
            {dossier.beneficiaires && dossier.beneficiaires.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dossier.beneficiaires.map((ben, index) => (
                  <div key={ben.id} className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-green-800 text-lg">
                        {ben.name} {ben.firstname}
                      </h4>
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {ben.pivot?.role || 'Bénéficiaire'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <InfoRow label="Sexe" value={ben.sexe === 'M' ? 'Masculin' : 'Féminin'} compact />
                      <InfoRow label="CIN" value={ben.cin} compact />
                      <InfoRow label="Contact" value={ben.contact} compact />
                      <InfoRow label="Email" value={ben.email} compact />
                      <InfoRow label="Adresse" value={ben.adresse} compact />
                      {ben.remark && (
                        <div className="mt-3 pt-3 border-t border-green-300">
                          <p className="text-xs text-green-700"><strong>Remarque:</strong> {ben.remark}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiUser className="mx-auto text-gray-300 mb-2" size={48} />
                <p className="text-gray-500 italic">Aucun bénéficiaire enregistré</p>
              </div>
            )}
          </Section>
        </div>

        {/* Décision et Décompte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Décision */}
          {dossier.decision && (
            <Section title="Décision" icon={<FiFileText className="text-indigo-600" />}>
              <InfoRow label="Type" value={dossier.decision.type_decision} highlight />
              <InfoRow label="Date de décision" value={formatDate(dossier.decision.date_decision)} />
              <InfoRow label="N° Décision" value={dossier.decision.numero_decision || 'Non renseigné'} />
              <InfoRow label="N° Visa" value={dossier.decision.numero_visa || 'Non renseigné'} />
              <InfoRow label="Date de visa" value={dossier.decision.date_visa ? formatDate(dossier.decision.date_visa) : 'Non renseigné'} />
              <InfoRow label="Agent décision" value={dossier.decision.decision_agent || 'Non renseigné'} />
              <InfoRow label="Budget" value={formatCurrency(dossier.decision.budget)} />
              <InfoRow label="Montant alloué" value={formatCurrency(dossier.decision.allocated_amount)} highlight />
              <InfoRow label="Code imputation" value={dossier.decision.code_imputation || 'Non renseigné'} />
              {dossier.decision?.fichier && (
  <a
    href={`http://localhost:8000/api/decisions/${dossier.id}/view`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
  >
    <FiFileText /> Voir la décision
  </a>
)}
            </Section>
          )}

          {/* Décompte */}
          {dossier.decompte && (
            <Section title="Décompte" icon={<FiDollarSign className="text-orange-600" />}>
              <InfoRow label="Montant total" value={formatCurrency(dossier.decompte.amount)} highlight />
              <InfoRow label="Statut" value={
                <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusColor(dossier.decompte.status)}`}>
                  {dossier.decompte.status}
                </span>
              } />
              <InfoRow label="Créé le" value={formatDate(dossier.decompte.created_at)} />
              <InfoRow label="Mis à jour le" value={formatDate(dossier.decompte.updated_at)} />
              {dossier.decompte.fichier && (
                <div className="mt-4">
                  <a 
                    href={`http://localhost:8000/api/decomptes/${dossier.id}/view`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium"
                  >
                    <FiDownload /> Télécharger le fichier
                  </a>
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Cessation de service - Pleine largeur */}
        {dossier.cessation && (
          <div className="mt-6">
            <Section title="Cessation de service" icon={<FiCalendar className="text-red-600" />}>
              <div className="mb-6">
                <InfoRow label="Date de cessation" value={formatDate(dossier.cessation.date_cessation)} highlight />
                <InfoRow label="Montant total" value={formatCurrency(dossier.cessation.amount)} highlight />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-700 mb-4">Détails des montants</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  <AmountBox label="601" value={dossier.cessation.six_one} />
                  <AmountBox label="602" value={dossier.cessation.six_two} />
                  <AmountBox label="603" value={dossier.cessation.six_three} />
                  <AmountBox label="604" value={dossier.cessation.six_four} />
                  <AmountBox label="605" value={dossier.cessation.six_five} />
                  <AmountBox label="606" value={dossier.cessation.six_six} />
                  <AmountBox label="607" value={dossier.cessation.six_seven} />
                  <AmountBox label="608" value={dossier.cessation.six_eight} />
                  <AmountBox label="609" value={dossier.cessation.six_nine} />
                  <AmountBox label="610" value={dossier.cessation.six_ten} />
                </div>
              </div>

              {dossier.cessation.remark && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-1">Remarque:</p>
                  <p className="text-sm text-red-700">{dossier.cessation.remark}</p>
                </div>
              )}

              {dossier.cessation.fichier && (
                <div className="mt-4">
                  <a 
                    href={`http://localhost:8000/api/cessations/${dossier.id}/view`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    <FiDownload /> Télécharger le fichier
                  </a>
                </div>
              )}
            </Section>
          </div>
        )}
        {dossier.secours && (
  <div className="mt-6">
    <Section title="Secours Décès" icon={<FiShield className="text-teal-600" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InfoRow label="N° de Secours" value={dossier.secours.numero_secours} highlight />
          <InfoRow label="Enregistré le" value={formatDate(dossier.secours.created_at)} />
        </div>
        
        <div className="flex items-center md:justify-end">
          {dossier.secours.fichier && (
            <a 
              href={`http://localhost:8000/api/secours/${dossier.id}/view`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-teal-50 text-teal-700 px-6 py-3 rounded-xl border border-teal-200 hover:bg-teal-100 transition-all font-bold"
            >
              <FiDownload size={20} /> Télécharger le Certificat de Secours
            </a>
          )}
        </div>
      </div>
    </Section>
  </div>
)}
      </div>
      <AssignBeneficiairesModal
  isOpen={isAssignModalOpen}
  onClose={() => setIsAssignModalOpen(false)}
  folderId={dossier.id}
  allBeneficiaires={allBeneficiaires}
  currentBeneficiaires={dossier.beneficiaires}
  onSaved={fetchDossierDetails}
/>
    </div>
  );
}

// Composants helpers
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value, compact = false, highlight = false }) => (
  <div className={`${compact ? 'py-1' : 'py-2'} ${!compact && 'border-b border-gray-100 last:border-0'}`}>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
      <span className="text-sm font-medium text-gray-600 min-w-[140px]">{label}</span>
      <span className={`text-sm ${highlight ? 'font-bold text-gray-900' : 'font-medium text-gray-800'} flex-1 sm:text-right`}>
        {value || <span className="text-gray-400 italic">Non renseigné</span>}
      </span>
    </div>
  </div>
);

const AmountBox = ({ label, value }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
    <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-bold text-gray-900">{formatCurrency(value)}</p>
  </div>
);

// Fonctions utilitaires
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "actif":
    case "en_cours":
      return "bg-green-100 text-green-700 border border-green-200";
    case "inactif":
    case "terminé":
      return "bg-red-100 text-red-700 border border-red-200";
    case "en_attente":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
};

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "actif":
    case "en_cours":
      return "bg-green-500 text-white";
    case "inactif":
    case "terminé":
      return "bg-red-500 text-white";
    case "en_attente":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Non renseigné";
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatCurrency = (amount) => {
  if (!amount) return "0 Ar";
  return `${parseFloat(amount).toLocaleString('fr-FR')} Ar`;
};