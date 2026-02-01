import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// import AjouterCpp from "./AjouterCpp";
import ConfirmationModal from "../BeneficiaryTable/ConfirmationModal";

import {
  getDecisions,
  deleteDecision
} from "../../services/api/decisionApi";

export default function DecisionPage() {

  /* ======================= DATA ======================= */
  const [cessations, setCessations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* ======================= MODALS ======================= */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /* ======================= SELECTION ======================= */
  const [editingCessation, setEditingCessation] = useState(null);
  const [cessationToDelete, setCessationToDelete] = useState(null);

  /* ======================= UI / UX ======================= */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tableHeaders = [
    "ID",
    "Dossier",
    "Numéro visa",
    "Numéro décision",
    "Agent",
    "Status",
    "Actions"
  ];

  /* ======================= RESPONSIVE ======================= */
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ======================= FETCH ======================= */
  useEffect(() => {
    fetchCessations();
  }, []);

  const fetchCessations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDecisions();
      setCessations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement des decisions");
    } finally {
      setLoading(false);
    }
  };

  /* ======================= FILTER + PAGINATION ======================= */
  const filteredCessations = cessations.filter(c =>
    // c.folder.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // c.beneficiary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // c.deceased_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredCessations.length / itemsPerPage);
  const currentItems = filteredCessations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ======================= ACTIONS ======================= */
  const handleConfirmDelete = async () => {
    try {
      await deleteDecision(cessationToDelete.id);
      setCessations(prev => prev.filter(c => c.id !== cessationToDelete.id));
      setIsDeleteModalOpen(false);
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  /* ======================= COMPONENTS ======================= */
  const MobileCard = ({ c }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-mono text-gray-400">#{c.id}</span>
          <h3 className="font-bold text-gray-900">{c.folder.id}</h3>
          <p className="text-sm text-gray-600">{c.folder.matricule}</p>
        </div>
        <div className="text-sm font-bold text-[#76bc21]">
          {c.decision_agent}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        {/* Décédé : {c.deceased_name} */}
      </p>

      <div className="flex gap-2 border-t pt-2">
        <button
          onClick={() => { setEditingCessation(c); setIsModalOpen(true); }}
          className="flex-1 py-2 bg-green-50 text-[#76bc21] rounded-lg flex justify-center"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => { setCessationToDelete(c); setIsDeleteModalOpen(true); }}
          className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex justify-center"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );

  /* ======================= RENDER ======================= */
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* SEARCH */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher dossier, bénéficiaire, décédé..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* CONTENT */}
      {loading && cessations.length === 0 ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#76bc21]"></div>
        </div>
      ) : isMobileView ? (
        <div>{currentItems.map(c => <MobileCard key={c.id} c={c} />)}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                {tableHeaders.map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{c.id}</td>
                  <td className="px-6 py-4 font-medium">{c.folder.matricule}</td>
                  <td className="px-6 py-4">{c.numero_visa}</td>
                  <td className="px-6 py-4">{c.numero_decision}</td>
                  <td className="px-6 py-4 font-bold text-[#76bc21]">{c.decision_agent}</td>
                  <td className="px-6 py-4">{c.folder.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditingCessation(c); setIsModalOpen(true); }}
                        className="p-2 text-[#76bc21] hover:bg-green-50 rounded-lg"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => { setCessationToDelete(c); setIsDeleteModalOpen(true); }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 rounded-lg border disabled:opacity-30"
          >
            <FiChevronLeft />
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-lg border disabled:opacity-30"
          >
            <FiChevronRight />
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer définitivement ?"
        message={`Vous allez supprimer la cessation du dossier ${cessationToDelete?.folder.matricule}. Cette action est irréversible.`}
        type="danger"
      />
    </div>
  );
}