import React, { useEffect, useState } from 'react';
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiUser
} from "react-icons/fi";

import AjouterBeneficiaire from './AjouterBeneficiaire';
import ConfirmationModal from './ConfirmationModal';
import VoirBeneficiaire from './VoirBeneficiaire';
import { 
  getBeneficiaries, 
  addBeneficiary, 
  deleteBeneficiary, 
  updateBeneficiary 
} from '../../services/api/beneficiaryApi';

export default function BeneficiaryTable() {
  // États des données
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États des modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // États de sélection
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [viewingBeneficiary, setViewingBeneficiary] = useState(null);
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState(null);
  
  // UI & UX
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tableHeaders = ["ID", "N° CIN", "Identité", "Contact", "Statut", "Actions"];

  // Détection du mode mobile
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chargement initial
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBeneficiaries();
      setBeneficiaries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors de la récupération des données : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ======================= HELPERS ======================== */
  const getStatusColor = (state) => {
    switch (state) {
      case "Actif": return "bg-green-100 text-green-700 border-green-200";
      case "Inactif": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  /* ======================= FILTER + PAGINATION ======================== */
  const filteredBeneficiaries = beneficiaries.filter(b =>
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.cin?.includes(searchTerm) ||
    b.id?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage);
  const currentItems = filteredBeneficiaries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ======================= ACTIONS HANDLERS ======================== */
  const handleSaveBeneficiary = async (beneficiaryData) => {
    setLoading(true);
    try {
      if (editingBeneficiary) {
        const updated = await updateBeneficiary(editingBeneficiary.id, beneficiaryData);
        setBeneficiaries(prev => prev.map(b => b.id === editingBeneficiary.id ? updated : b));
      } else {
        const response = await addBeneficiary(beneficiaryData);
        // On récupère le bénéficiaire dans l'objet de réponse (selon votre backend Laravel)
        const newBeneficiary = response.beneficiaire || response;
        setBeneficiaries(prev => [newBeneficiary, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBeneficiary(beneficiaryToDelete.id);
      setBeneficiaries(prev => prev.filter(b => b.id !== beneficiaryToDelete.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  /* ======================= COMPONENTS ======================== */
  const MobileCard = ({ b }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-mono text-gray-400">#{b.id}</span>
          <h3 className="font-bold text-gray-900 uppercase">{b.name} {b.firstname}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(b.state)}`}>
          {b.state}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
        <div><p className="text-[10px] uppercase text-gray-400">CIN</p>{b.cin}</div>
        <div><p className="text-[10px] uppercase text-gray-400">Contact</p>{b.contact}</div>
      </div>
      <div className="flex gap-2 border-t pt-3">
        <button onClick={() => {setViewingBeneficiary(b); setIsViewModalOpen(true);}} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg flex justify-center"><FiEye /></button>
        <button onClick={() => {setEditingBeneficiary(b); setIsModalOpen(true);}} className="flex-1 py-2 bg-green-50 text-[#76bc21] rounded-lg flex justify-center"><FiEdit /></button>
        <button onClick={() => {setBeneficiaryToDelete(b); setIsDeleteModalOpen(true);}} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex justify-center"><FiTrash2 /></button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Bénéficiaires</h1>
          <p className="text-gray-500 text-sm">{filteredBeneficiaries.length} au total</p>
        </div>
        <button 
          onClick={() => {setEditingBeneficiary(null); setIsModalOpen(true);}}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#76bc21] hover:bg-[#65a31d] text-white px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          <FiPlus /> Ajouter un bénéficiaire
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Rechercher par nom, CIN ou ID..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#76bc21] outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

      {/* CONTENT AREA */}
      {loading && beneficiaries.length === 0 ? (
        <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#76bc21]"></div></div>
      ) : isMobileView ? (
        <div className="block">{currentItems.map(b => <MobileCard key={b.id} b={b} />)}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {tableHeaders.map(h => <th key={h} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{b.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{b.cin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#76bc21]"><FiUser /></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.firstname}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.contact}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(b.state)}`}>
                      {b.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => {setViewingBeneficiary(b); setIsViewModalOpen(true);}} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><FiEye /></button>
                      <button onClick={() => {setEditingBeneficiary(b); setIsModalOpen(true);}} className="p-2 text-[#76bc21] hover:bg-green-50 rounded-lg transition-colors"><FiEdit /></button>
                      <button onClick={() => {setBeneficiaryToDelete(b); setIsDeleteModalOpen(true);}} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><FiTrash2 /></button>
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
            className="p-2 rounded-lg border hover:bg-white disabled:opacity-30"
          ><FiChevronLeft /></button>
          <span className="text-sm font-medium">Page {currentPage} sur {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-lg border hover:bg-white disabled:opacity-30"
          ><FiChevronRight /></button>
        </div>
      )}

      {/* MODALES */}
      <AjouterBeneficiaire 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        beneficiary={editingBeneficiary} 
        onSave={handleSaveBeneficiary} 
      />
      
      <VoirBeneficiaire 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        beneficiary={viewingBeneficiary} 
      />

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer définitivement ?"
        message={`Attention, vous allez supprimer ${beneficiaryToDelete?.name}. Cette action est irréversible.`}
        type="danger"
      />
    </div>
  );
}