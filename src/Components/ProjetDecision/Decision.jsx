import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

import AjouterDecision from "./AjouterDecision";
import ConfirmationModal from "../BeneficiaryTable/ConfirmationModal";
import { getDecisions, deleteDecision, addDecision, updateDecision } from "../../services/api/decisionApi";
import Header from "../Header/Header";

export default function DecisionPage() {
  const [decisions, setDecisions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingDecision, setEditingDecision] = useState(null);
  const [decisionToDelete, setDecisionToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tableHeaders = ["ID", "Dossier", "Numéro visa", "Numéro décision", "Agent", "Status", "Actions"];

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { fetchDecisions(); }, []);

  const fetchDecisions = async () => {
    setLoading(true); setError(null);
    try {
      const data = await getDecisions();
      setDecisions(Array.isArray(data) ? data : []);
    } catch {
      setError("Erreur lors du chargement des décisions");
    } finally { setLoading(false); }
  };

  const filteredDecisions = decisions.filter(d => d.id?.toString().includes(searchTerm));
  const totalPages = Math.ceil(filteredDecisions.length / itemsPerPage);
  const currentItems = filteredDecisions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleConfirmDelete = async () => {
    try {
      await deleteDecision(decisionToDelete.id);
      setDecisions(prev => prev.filter(d => d.id !== decisionToDelete.id));
      setIsDeleteModalOpen(false);
    } catch { setError("Erreur lors de la suppression"); }
  };

  const handleSaveDecision = async (fields) => {
    try {
      if (editingDecision) {
        await updateDecision(editingDecision.id, fields);
      } else {
        await addDecision(fields);
      }
      await fetchDecisions();
    } catch (err) { console.error(err); }
  };

  const MobileCard = ({ d }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-mono text-gray-400">#{d.id}</span>
          <h3 className="font-bold text-gray-900">{d.folder.id}</h3>
          <p className="text-sm text-gray-600">{d.folder.matricule}</p>
        </div>
        <div className="text-sm font-bold text-[#76bc21]">{d.decision_agent}</div>
      </div>

      <div className="flex gap-2 border-t pt-2">
        <button
          onClick={() => { setEditingDecision(d); setIsModalOpen(true); }}
          className="flex-1 py-2 bg-green-50 text-[#76bc21] rounded-lg flex justify-center"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => { setDecisionToDelete(d); setIsDeleteModalOpen(true); }}
          className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex justify-center"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des décisions</h1>
          <p className="text-gray-500 text-sm">{filteredDecisions.length} au total</p>
        </div>
        <button
          onClick={() => { setEditingDecision(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#76bc21] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <FiPlus /> Ajouter une décision
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      {/* TABLE */}
      {loading && decisions.length === 0 ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#76bc21]"></div>
        </div>
      ) : isMobileView ? (
        <div>{currentItems.map(d => <MobileCard key={d.id} d={d} />)}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                {tableHeaders.map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{d.id}</td>
                  <td className="px-6 py-4 font-medium">{d.folder.matricule}</td>
                  <td className="px-6 py-4">{d.numero_visa}</td>
                  <td className="px-6 py-4">{d.numero_decision}</td>
                  <td className="px-6 py-4 font-bold text-[#76bc21]">{d.decision_agent}</td>
                  <td className="px-6 py-4">{d.folder.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingDecision(d); setIsModalOpen(true); }} className="p-2 text-[#76bc21] hover:bg-green-50 rounded-lg"><FiEdit /></button>
                      <button onClick={() => { setDecisionToDelete(d); setIsDeleteModalOpen(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 rounded-lg border disabled:opacity-30"><FiChevronLeft /></button>
          <span className="text-sm font-medium">Page {currentPage} sur {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 rounded-lg border disabled:opacity-30"><FiChevronRight /></button>
        </div>
      )}

      <AjouterDecision
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        decision={editingDecision}
        onSave={handleSaveDecision}
        onSaved={fetchDecisions}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer définitivement ?"
        message={`Vous allez supprimer la décision du dossier ${decisionToDelete?.folder.matricule}. Cette action est irréversible.`}
        type="danger"
      />
    </div>
  );
}