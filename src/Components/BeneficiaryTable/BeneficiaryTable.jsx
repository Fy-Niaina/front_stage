import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import AjouterBeneficiaire from './AjouterBeneficiaire';
import ConfirmationModal from './ConfirmationModal';
import VoirBeneficiaire from './VoirBeneficiaire';

export default function BeneficiaryTable() {
  const [beneficiaries, setBeneficiaries] = useState([
    { id: "B001", cin: "12345678", nom: "Jean Dupont", adresse: "123 Rue Principale, Paris", contact: "0332256211", statut: "Actif" },
    { id: "B002", cin: "87654321", nom: "Marie Martin", adresse: "456 Avenue Centrale, Lyon", contact: "0345678901", statut: "En attente" },
    { id: "B003", cin: "11223344", nom: "Pierre Lambert", adresse: "789 Boulevard Nord, Marseille", contact: "0334567890", statut: "Actif" },
    { id: "B004", cin: "55667788", nom: "Sophie Bernard", adresse: "321 Rue du Commerce, Lille", contact: "0341802319", statut: "Rejeté" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [viewingBeneficiary, setViewingBeneficiary] = useState(null);
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);

  const tableHeaders = ["ID", "N° CIN", "Nom", "Adresse", "Contact", "Statut", "Actions"];

  const getStatusColor = (statut) => {
    switch (statut) {
      case "Actif": return "bg-green-100 text-green-800 border border-green-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Rejeté": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.cin.includes(searchTerm) ||
    beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBeneficiaries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage);

  const handleAddBeneficiary = () => {
    setEditingBeneficiary(null);
    setIsModalOpen(true);
  };

  const handleEditBeneficiary = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setIsModalOpen(true);
  };

  const handleViewBeneficiary = (beneficiary) => {
    setViewingBeneficiary(beneficiary);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (beneficiary) => {
    setBeneficiaryToDelete(beneficiary);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (beneficiaryToDelete) {
      setBeneficiaries(prev => prev.filter(b => b.id !== beneficiaryToDelete.id));
      setBeneficiaryToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setBeneficiaryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleSaveBeneficiary = (beneficiaryData) => {
    if (editingBeneficiary) {
      setBeneficiaries(prev => 
        prev.map(b => b.id === editingBeneficiary.id ? beneficiaryData : b)
      );
    } else {
      setBeneficiaries(prev => [...prev, beneficiaryData]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Vue mobile - Card component
  const MobileBeneficiaryCard = ({ beneficiary }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-sm font-medium text-[#76bc21] bg-[#76bc21]/10 px-2 py-1 rounded">
            {beneficiary.id}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(beneficiary.statut)}`}>
          {beneficiary.statut}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div>
          <div className="text-xs text-gray-500">Nom</div>
          <div className="text-sm font-medium text-gray-900">{beneficiary.nom}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">CIN</div>
            <div className="text-sm text-gray-700 font-mono">{beneficiary.cin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact</div>
            <div className="text-sm text-gray-700">{beneficiary.contact}</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Adresse</div>
          <div className="text-sm text-gray-600 line-clamp-2">{beneficiary.adresse}</div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
        <button 
          onClick={() => handleViewBeneficiary(beneficiary)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
          title="Voir les détails"
        >
          <FiEye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleEditBeneficiary(beneficiary)}
          className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
          title="Modifier"
        >
          <FiEdit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleDeleteClick(beneficiary)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
          title="Supprimer"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {/* Table Header with Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#76bc21] px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button 
              onClick={handleAddBeneficiary}
              className="flex items-center justify-center gap-2 bg-white text-[#76bc21] hover:bg-gray-50 px-4 py-3 lg:py-2 rounded-lg transition-colors font-semibold text-sm lg:text-base w-full sm:w-auto"
            >
              <FiPlus className="w-4 h-4" />
              Ajouter bénéficiaire
            </button>
            
            {/* Toggle View Button - Mobile only */}
            <button
              onClick={() => setIsMobileView(!isMobileView)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white/20 text-white hover:bg-white/30 px-4 py-3 rounded-lg transition-colors font-medium text-sm w-full sm:w-auto"
            >
              {isMobileView ? (
                <>
                  <FiX className="w-4 h-4" />
                  Vue tableau
                </>
              ) : (
                <>
                  <FiMenu className="w-4 h-4" />
                  Vue cartes
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Barre de recherche */}
            <div className="relative flex-1 lg:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-white/80" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 lg:py-2 w-full rounded-lg border-0 bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile View - Cards */}
        {isMobileView && (
          <div className="p-4 lg:hidden">
            <div className="space-y-3">
              {currentItems.map((beneficiary) => (
                <MobileBeneficiaryCard 
                  key={beneficiary.id} 
                  beneficiary={beneficiary} 
                />
              ))}
            </div>
            
            {filteredBeneficiaries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun bénéficiaire trouvé
              </div>
            )}
          </div>
        )}

        {/* Desktop View - Table */}
        {!isMobileView && (
          <>
            {/* Table Headers - Hidden on mobile */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-4 px-6 py-4 bg-[#76bc21]/20 border-b border-[#76bc21]/30">
              {tableHeaders.map((header, index) => (
                <div key={index} className="text-black font-semibold text-sm uppercase tracking-wide">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="hidden lg:block divide-y divide-gray-100">
              {currentItems.map((beneficiary) => (
                <div 
                  key={beneficiary.id} 
                  className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-[#76bc21]/10 transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black bg-[#76bc21]/20 px-3 py-1 rounded-full">
                      {beneficiary.id}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 font-mono">{beneficiary.cin}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{beneficiary.nom}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 line-clamp-1">{beneficiary.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">{beneficiary.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(beneficiary.statut)}`}>
                      {beneficiary.statut}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewBeneficiary(beneficiary)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditBeneficiary(beneficiary)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(beneficiary)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Supprimer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Table Fallback - Simple vertical layout */}
            <div className="lg:hidden divide-y divide-gray-100">
              {currentItems.map((beneficiary) => (
                <div key={beneficiary.id} className="p-4 hover:bg-[#76bc21]/5 transition-colors">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">ID</div>
                      <div className="text-sm font-medium text-[#76bc21]">{beneficiary.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">CIN</div>
                      <div className="text-sm text-gray-700 font-mono">{beneficiary.cin}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Nom</div>
                    <div className="text-sm font-medium text-gray-900">{beneficiary.nom}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Adresse</div>
                    <div className="text-sm text-gray-600">{beneficiary.adresse}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Contact</div>
                      <div className="text-sm text-gray-700">{beneficiary.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Statut</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(beneficiary.statut)}`}>
                        {beneficiary.statut}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleViewBeneficiary(beneficiary)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditBeneficiary(beneficiary)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(beneficiary)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Table Footer */}
        <div className="bg-[#76bc21]/10 px-4 lg:px-6 py-4 border-t border-[#76bc21]/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <span className="text-sm text-gray-600">
                Affichage de <span className="font-semibold">{Math.min(filteredBeneficiaries.length, indexOfFirstItem + 1)}-{Math.min(filteredBeneficiaries.length, indexOfLastItem)}</span> sur <span className="font-semibold">{filteredBeneficiaries.length}</span> bénéficiaires
                {searchTerm && ` (filtrés sur ${beneficiaries.length})`}
              </span>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show only relevant pages on mobile
                    if (window.innerWidth < 1024 && Math.abs(pageNumber - currentPage) > 1 && pageNumber !== 1 && pageNumber !== totalPages) {
                      if (Math.abs(pageNumber - currentPage) === 2) {
                        return <span key={pageNumber} className="px-2">...</span>;
                      }
                      return null;
                    }
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-[#76bc21] text-white'
                            : 'text-[#76bc21] hover:bg-[#76bc21]/20'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      <AjouterBeneficiaire
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        beneficiary={editingBeneficiary}
        onSave={handleSaveBeneficiary}
      />

      {/* Modal de visualisation */}
      <VoirBeneficiaire
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        beneficiary={viewingBeneficiary}
      />

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Supprimer le bénéficiaire"
        message={
          beneficiaryToDelete 
            ? `Êtes-vous sûr de vouloir supprimer le bénéficiaire "${beneficiaryToDelete.nom}" (${beneficiaryToDelete.id}) ? Cette action est irréversible.`
            : "Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?"
        }
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
      />
    </>
  );
}