import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFileText
} from "react-icons/fi";

import AjouterDossier from "./AjouterDossier";
// import VoirDossier from "../components/Dossier/VoirDossier";
// import ConfirmationModal from "../components/ConfirmationModal";

import { getFolders, addFolder, deleteFolder } from "../../services/api/folderApi";
import ConfirmationModal from "../BeneficiaryTable/ConfirmationModal";
import Header from "../Header/Header";

export default function DossierPage() {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sélections
  const [editingFolder, setEditingFolder] = useState(null);
  const [viewingFolder, setViewingFolder] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /* ==================== DETECTION MOBILE ==================== */
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ==================== FETCH DATA ==================== */
  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFolders();
      setFolders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement des dossiers");
    } finally {
      setLoading(false);
    }
  };

  /* ==================== HELPERS ==================== */
  const getStatusColor = (state) => {
    switch (state) {
      case "Actif": return "bg-green-100 text-green-700 border-green-200";
      case "Inactif": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredFolders = folders.filter(f =>
    f.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.beneficiary?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.beneficiary?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.folder_state?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFolders.length / itemsPerPage);
  const currentItems = filteredFolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleConfirmDelete = async () => {
    try {
      await deleteFolder(folderToDelete.id);
      setFolders(prev => prev.filter(f => f.id !== folderToDelete.id));
      setIsDeleteModalOpen(false);
    } catch {
      setError("Erreur lors de la suppression du dossier");
    }
  };

  /* ==================== COMPONENT ==================== */
  const MobileCard = ({ f }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-mono text-gray-400">#{f.id}</span>
          <h3 className="font-bold text-gray-900 uppercase">{f.matricule}</h3>
          <p className="text-sm text-gray-600">{f.beneficiary?.name} {f.beneficiary?.firstname}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(f.folder_state)}`}>
          {f.folder_state}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-3">
        <p>Date dépôt: {f.upload_date}</p>
        {f.remark && <p>Remarque: {f.remark}</p>}
      </div>
      <div className="flex gap-2 border-t pt-2">
        <button onClick={() => { setViewingFolder(f); setIsViewModalOpen(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg flex justify-center"><FiEye /></button>
        <button onClick={() => { setEditingFolder(f); setIsModalOpen(true); }} className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg flex justify-center"><FiEdit /></button>
        <button onClick={() => { setFolderToDelete(f); setIsDeleteModalOpen(true); }} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex justify-center"><FiTrash2 /></button>
      </div>
    </div>
  );

  /* ==================== RENDER ==================== */
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
              <Header onMenuToggle={handleMenuToggle} />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des dossiers</h1>
          <p className="text-gray-500 text-sm">{filteredFolders.length} au total</p>
        </div>
        <button
          onClick={() => { setEditingFolder(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          <FiPlus /> Ajouter un dossier
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par matricule, bénéficiaire ou état..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ERROR / LOADING */}
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}
      {loading && folders.length === 0 && (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* CONTENT */}
      {isMobileView ? (
        <div>{currentItems.map(f => <MobileCard key={f.id} f={f} />)}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Matricule</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Bénéficiaire</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date dépôt</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">État</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map(f => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{f.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{f.matricule}</td>
                  <td className="px-6 py-4">
                    {f.beneficiary?.name} {f.beneficiary?.firstname}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{f.upload_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(f.folder_state)}`}>
                      {f.folder_state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setViewingFolder(f); setIsViewModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FiEye /></button>
                      <button onClick={() => { setEditingFolder(f); setIsModalOpen(true); }} className="p-2 text-green-700 hover:bg-green-50 rounded-lg"><FiEdit /></button>
                      <button onClick={() => { setFolderToDelete(f); setIsDeleteModalOpen(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 rounded-lg border hover:bg-white disabled:opacity-30"><FiChevronLeft /></button>
          <span className="text-sm font-medium">Page {currentPage} sur {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 rounded-lg border hover:bg-white disabled:opacity-30"><FiChevronRight /></button>
        </div>
      )}

      {/* MODALS */}
      <AjouterDossier
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dossier={editingFolder}
        onSaved={fetchFolders}
      />

      {/* <VoirDossier
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        dossier={viewingFolder}
      />*/}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer définitivement ?"
        message={`Vous allez supprimer le dossier ${folderToDelete?.matricule}. Cette action est irréversible.`}
        type="danger"
      /> 
    </div>
  );
}
