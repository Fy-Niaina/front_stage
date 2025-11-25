// Cpp/Cpp.jsx
import React, { useState } from 'react';
import { 
  FiEdit, 
  FiEye, 
  FiPlus, 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiMenu, 
  FiX,
  FiFileText,
  FiUser
} from "react-icons/fi";
import Header from '../Header/Header';
import AjouterCpp from './AjouterCpp';
import ModifierCpp from './ModifierCpp';
import VoirCpp from './VoirCpp';
import { cppData, cppStatsData } from '../Data/Data';

export default function CppPage({ onMenuToggle }) {
  const [cppList, setCppList] = useState(cppData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCpp, setSelectedCpp] = useState(null); // Pour stocker le CPP sélectionné
  const [editingCpp, setEditingCpp] = useState(null);
  const [viewingCpp, setViewingCpp] = useState(null);

  // Mêmes en-têtes que le dossier
  const tableHeaders = ["ID", "N° CIN", "Nom", "Adresse", "Contact", "Statut", "Actions"];

  const getStatusColor = (statut) => {
    switch (statut) {
      case "Validé": return "bg-green-100 text-green-800 border border-green-200";
      case "En cours": return "bg-blue-100 text-blue-800 border border-blue-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Rejeté": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const filteredCpp = cppList.filter(cpp =>
    cpp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cpp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cpp.cin.includes(searchTerm) ||
    cpp.contact.includes(searchTerm)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCpp.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCpp.length / itemsPerPage);

  const handleAddFields = (cpp) => {
    setSelectedCpp(cpp); // Stocker le CPP sélectionné
    setIsAddModalOpen(true);
  };

  const handleEditCpp = (cpp) => {
    setEditingCpp(cpp);
    setIsEditModalOpen(true);
  };

  const handleViewCpp = (cpp) => {
    setViewingCpp(cpp);
    setIsViewModalOpen(true);
  };

  const handleSaveFields = (fieldsData) => {
    if (selectedCpp) {
      // Mettre à jour le CPP existant avec les nouveaux champs
      setCppList(prev => 
        prev.map(c => 
          c.id === selectedCpp.id 
            ? { ...c, ...fieldsData }
            : c
        )
      );
      setIsAddModalOpen(false);
      setSelectedCpp(null);
    }
  };

  const handleSaveEditCpp = (cppData) => {
    setCppList(prev => 
      prev.map(c => c.id === editingCpp.id ? { ...cppData } : c)
    );
    setIsEditModalOpen(false);
    setEditingCpp(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };


  // Vue mobile - Card component avec même structure que le dossier
  const MobileCppCard = ({ cpp }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-sm font-medium text-[#76bc21] bg-[#76bc21]/10 px-2 py-1 rounded">
            {cpp.id}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cpp.statut)}`}>
          {cpp.statut}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div>
          <div className="text-xs text-gray-500">Nom</div>
          <div className="text-sm font-medium text-gray-900">{cpp.nom}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">CIN</div>
            <div className="text-sm text-gray-700 font-mono">{cpp.cin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact</div>
            <div className="text-sm text-gray-700">{cpp.contact}</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Adresse</div>
          <div className="text-sm text-gray-600 line-clamp-2">{cpp.adresse}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Type</div>
            <div className="text-sm text-gray-700">{cpp.type}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Date création</div>
            <div className="text-sm text-gray-700">{formatDate(cpp.dateCreation)}</div>
          </div>
        </div>
        
        {/* Afficher les champs 601-610 s'ils existent */}
        {(cpp.field601 || cpp.field602 || cpp.field603 || cpp.field604 || cpp.field605 || 
          cpp.field606 || cpp.field607 || cpp.field608 || cpp.field609 || cpp.field610) && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Champs spécifiques :</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {cpp.field601 && <div><span className="font-medium">601:</span> {cpp.field601}</div>}
              {cpp.field602 && <div><span className="font-medium">602:</span> {cpp.field602}</div>}
              {cpp.field603 && <div><span className="font-medium">603:</span> {cpp.field603}</div>}
              {cpp.field604 && <div><span className="font-medium">604:</span> {cpp.field604}</div>}
              {cpp.field605 && <div><span className="font-medium">605:</span> {cpp.field605}</div>}
              {cpp.field606 && <div><span className="font-medium">606:</span> {cpp.field606}</div>}
              {cpp.field607 && <div><span className="font-medium">607:</span> {cpp.field607}</div>}
              {cpp.field608 && <div><span className="font-medium">608:</span> {cpp.field608}</div>}
              {cpp.field609 && <div><span className="font-medium">609:</span> {cpp.field609}</div>}
              {cpp.field610 && <div><span className="font-medium">610:</span> {cpp.field610}</div>}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
        <button 
          onClick={() => handleViewCpp(cpp)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
          title="Voir les détails"
        >
          <FiEye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleEditCpp(cpp)}
          className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
          title="Modifier"
        >
          <FiEdit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleAddFields(cpp)}
          className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors" 
          title="Ajouter des champs"
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 lg:p-6 relative z-10">
      <Header onMenuToggle={onMenuToggle} />
      
      {/* Cards de résumé CPP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {cppStatsData && cppStatsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 lg:p-6 border border-[#76bc21]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat?.title || 'Titre indisponible'}</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat?.value || '0'}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">{stat?.description || 'Non disponible'}</span>
                </div>
              </div>
              <div className="text-3xl">{stat?.icon || '📊'}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {/* Table Header with Actions - SANS BOUTON "NOUVEAU CPP" */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#76bc21] px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
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
                placeholder="Rechercher par ID, CIN, Nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 lg:py-2 w-full rounded-lg border-0 bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile View - Cards avec même structure que le dossier */}
        {isMobileView && (
          <div className="p-4 lg:hidden">
            <div className="space-y-3">
              {currentItems.map((cpp) => (
                <MobileCppCard 
                  key={cpp.id} 
                  cpp={cpp} 
                />
              ))}
            </div>
            
            {filteredCpp.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Aucun certificat trouvé</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Aucun certificat disponible'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Desktop View - Table avec mêmes en-têtes que le dossier */}
        {!isMobileView && (
          <>
            {/* Table Headers - Hidden on mobile - Mêmes en-têtes que le dossier */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-4 px-6 py-4 bg-[#76bc21]/20 border-b border-[#76bc21]/30">
              {tableHeaders.map((header, index) => (
                <div key={index} className="text-black font-semibold text-sm uppercase tracking-wide">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Body avec même structure que le dossier */}
            <div className="hidden lg:block divide-y divide-gray-100">
              {currentItems.map((cpp) => (
                <div 
                  key={cpp.id} 
                  className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-[#76bc21]/10 transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black bg-[#76bc21]/20 px-3 py-1 rounded-full">
                      {cpp.id}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 font-mono">{cpp.cin}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{cpp.nom}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 line-clamp-1">{cpp.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">{cpp.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cpp.statut)}`}>
                      {cpp.statut}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewCpp(cpp)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditCpp(cpp)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleAddFields(cpp)}
                      className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Ajouter des champs 601-610"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Table Fallback avec même structure que le dossier */}
            <div className="lg:hidden divide-y divide-gray-100">
              {currentItems.map((cpp) => (
                <div key={cpp.id} className="p-4 hover:bg-[#76bc21]/5 transition-colors">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">ID</div>
                      <div className="text-sm font-medium text-[#76bc21]">{cpp.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">CIN</div>
                      <div className="text-sm text-gray-700 font-mono">{cpp.cin}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Nom</div>
                    <div className="text-sm font-medium text-gray-900">{cpp.nom}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Adresse</div>
                    <div className="text-sm text-gray-600">{cpp.adresse}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Contact</div>
                      <div className="text-sm text-gray-700">{cpp.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Statut</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cpp.statut)}`}>
                        {cpp.statut}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleViewCpp(cpp)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditCpp(cpp)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleAddFields(cpp)}
                      className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors" 
                      title="Ajouter des champs 601-610"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Table Footer - Même que le dossier */}
        <div className="bg-[#76bc21]/10 px-4 lg:px-6 py-4 border-t border-[#76bc21]/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <span className="text-sm text-gray-600">
                Affichage de <span className="font-semibold">{Math.min(filteredCpp.length, indexOfFirstItem + 1)}-{Math.min(filteredCpp.length, indexOfLastItem)}</span> sur <span className="font-semibold">{filteredCpp.length}</span> certificats
                {searchTerm && ` (filtrés sur ${cppList.length})`}
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

      {/* Modal d'ajout des champs */}
      <AjouterCpp
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedCpp(null);
        }}
        cpp={selectedCpp} // Passer le CPP sélectionné au modal
        onSave={handleSaveFields}
      />

      {/* Modal de modification */}
      <ModifierCpp
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCpp(null);
        }}
        cpp={editingCpp}
        onSave={handleSaveEditCpp}
      />

      {/* Modal de visualisation */}
      <VoirCpp
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingCpp(null);
        }}
        cpp={viewingCpp}
      />
    </div>
  );
}