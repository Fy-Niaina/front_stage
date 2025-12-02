// Decompte/Decompte.jsx
import React, { useState } from 'react';
import { 
  FiEye, 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiMenu, 
  FiX,
  FiUser,
  FiMinus
} from "react-icons/fi";
import Header from '../Header/Header';
import VoirDecompte from './VoirDecompte';
import EnleverCCP from './EnleverCCP';
import { cppData, cppStatsData } from '../Data/Data';

export default function DecomptePage({ onMenuToggle }) {
  const [decompteList, setDecompteList] = useState(cppData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [viewingDecompte, setViewingDecompte] = useState(null);
  const [selectedDecompteForRemove, setSelectedDecompteForRemove] = useState(null);

  // En-têtes du tableau pour Décompte
  const tableHeaders = ["ID", "N° CIN", "Nom", "Adresse", "Contact", "Statut", "Montant Total", "Actions"];

  const getStatusColor = (statut) => {
    switch (statut) {
      case "Validé": return "bg-green-100 text-green-800 border border-green-200";
      case "En cours": return "bg-blue-100 text-blue-800 border border-blue-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Rejeté": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Fonction pour calculer le montant total (CORRIGÉE - field602 est soustrait)
  const calculateTotalAmount = (decompte) => {
    let total = 900; // Montant de base comme dans EnleverCCP.jsx
    
    // Ajouter les champs numériques 601-610 s'ils existent
    if (decompte.field601) total += parseFloat(decompte.field601) || 0;
    if (decompte.field602) total -= parseFloat(decompte.field602) || 0; // SOUSTRACTION ici
    if (decompte.field603) total += parseFloat(decompte.field603) || 0;
    if (decompte.field604) total += parseFloat(decompte.field604) || 0;
    if (decompte.field605) total += parseFloat(decompte.field605) || 0;
    if (decompte.field606) total += parseFloat(decompte.field606) || 0;
    if (decompte.field607) total += parseFloat(decompte.field607) || 0;
    if (decompte.field608) total += parseFloat(decompte.field608) || 0;
    if (decompte.field609) total += parseFloat(decompte.field609) || 0;
    if (decompte.field610) total += parseFloat(decompte.field610) || 0;
    
    // Assurer que le total ne soit pas négatif
    total = Math.max(0, total);
    
    // Formater le montant
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(total);
  };

  const filteredDecompte = decompteList.filter(decompte =>
    decompte.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    decompte.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    decompte.cin.includes(searchTerm) ||
    decompte.contact.includes(searchTerm)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDecompte.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDecompte.length / itemsPerPage);

  const handleViewDecompte = (decompte) => {
    setViewingDecompte(decompte);
    setIsViewModalOpen(true);
  };

  const handleRemoveCCP = (decompte) => {
    setSelectedDecompteForRemove(decompte);
    setIsRemoveModalOpen(true);
  };

  const handleSaveFields = (fieldsData) => {
    if (selectedDecompteForRemove) {
      setDecompteList(prev => 
        prev.map(d => 
          d.id === selectedDecompteForRemove.id 
            ? { ...d, ...fieldsData }
            : d
        )
      );
      setIsRemoveModalOpen(false);
      setSelectedDecompteForRemove(null);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Vue mobile - Card component pour Décompte
  const MobileDecompteCard = ({ decompte }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-sm font-medium text-[#76bc21] bg-[#76bc21]/10 px-2 py-1 rounded">
            {decompte.id}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(decompte.statut)}`}>
          {decompte.statut}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div>
          <div className="text-xs text-gray-500">Nom</div>
          <div className="text-sm font-medium text-gray-900">{decompte.nom}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">CIN</div>
            <div className="text-sm text-gray-700 font-mono">{decompte.cin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact</div>
            <div className="text-sm text-gray-700">{decompte.contact}</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Adresse</div>
          <div className="text-sm text-gray-600 line-clamp-2">{decompte.adresse}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Type</div>
            <div className="text-sm text-gray-700">{decompte.type}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Date création</div>
            <div className="text-sm text-gray-700">{formatDate(decompte.dateCreation)}</div>
          </div>
        </div>
        
        {/* MONTANT TOTAL DANS LA CARTE MOBILE */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">Montant Total:</div>
            <div className="text-sm font-semibold text-[#76bc21]">
              {calculateTotalAmount(decompte)} Ar
            </div>
          </div>
          {/* Afficher le montant enlevé si field602 existe */}
          {decompte.field602 && (
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">Montant enlevé:</div>
              <div className="text-xs text-red-600">
                - {parseFloat(decompte.field602).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar
              </div>
            </div>
          )}
        </div>
        
        {/* Afficher les champs 601-610 s'ils existent */}
        {(decompte.field601 || decompte.field602 || decompte.field603 || decompte.field604 || decompte.field605 || 
          decompte.field606 || decompte.field607 || decompte.field608 || decompte.field609 || decompte.field610) && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Champs spécifiques :</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {decompte.field601 && <div><span className="font-medium">601:</span> {decompte.field601}</div>}
              {decompte.field602 && <div><span className="font-medium text-red-600">602:</span> <span className="text-red-600">-{decompte.field602}</span></div>}
              {decompte.field603 && <div><span className="font-medium">603:</span> {decompte.field603}</div>}
              {decompte.field604 && <div><span className="font-medium">604:</span> {decompte.field604}</div>}
              {decompte.field605 && <div><span className="font-medium">605:</span> {decompte.field605}</div>}
              {decompte.field606 && <div><span className="font-medium">606:</span> {decompte.field606}</div>}
              {decompte.field607 && <div><span className="font-medium">607:</span> {decompte.field607}</div>}
              {decompte.field608 && <div><span className="font-medium">608:</span> {decompte.field608}</div>}
              {decompte.field609 && <div><span className="font-medium">609:</span> {decompte.field609}</div>}
              {decompte.field610 && <div><span className="font-medium">610:</span> {decompte.field610}</div>}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
        <button 
          onClick={() => handleViewDecompte(decompte)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
          title="Voir les détails"
        >
          <FiEye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleRemoveCCP(decompte)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
          title="Enlever CCP"
        >
          <FiMinus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 lg:p-6 relative z-10">
      {/* <Header onMenuToggle={onMenuToggle} /> */}
      
      {/* Cards de résumé Décompte */}
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
        {/* Table Header with Actions */}
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

        {/* Mobile View - Cards */}
        {isMobileView && (
          <div className="p-4 lg:hidden">
            <div className="space-y-3">
              {currentItems.map((decompte) => (
                <MobileDecompteCard 
                  key={decompte.id} 
                  decompte={decompte} 
                />
              ))}
            </div>
            
            {filteredDecompte.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Aucun décompte trouvé</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Aucun décompte disponible'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Desktop View - Table */}
        {!isMobileView && (
          <>
            {/* Table Headers - Hidden on mobile */}
            <div className="hidden lg:grid lg:grid-cols-8 gap-4 px-6 py-4 bg-[#76bc21]/20 border-b border-[#76bc21]/30">
              {tableHeaders.map((header, index) => (
                <div key={index} className="text-black font-semibold text-sm uppercase tracking-wide">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="hidden lg:block divide-y divide-gray-100">
              {currentItems.map((decompte) => (
                <div 
                  key={decompte.id} 
                  className="grid grid-cols-8 gap-4 px-6 py-4 hover:bg-[#76bc21]/10 transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black bg-[#76bc21]/20 px-3 py-1 rounded-full">
                      {decompte.id}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 font-mono">{decompte.cin}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{decompte.nom}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 line-clamp-1">{decompte.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">{decompte.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(decompte.statut)}`}>
                      {decompte.statut}
                    </span>
                  </div>
                  {/* COLONNE MONTANT TOTAL */}
                  <div className="flex items-center">
                    <div className="text-sm">
                      <div className="font-semibold text-[#76bc21]">
                        {calculateTotalAmount(decompte)} Ar
                      </div>
                      {decompte.field602 && (
                        <div className="text-xs text-red-500">
                          - {parseFloat(decompte.field602).toLocaleString('fr-FR', { 
                            minimumFractionDigits: 2 
                          })} Ar
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewDecompte(decompte)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRemoveCCP(decompte)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Enlever CCP"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Table Fallback */}
            <div className="lg:hidden divide-y divide-gray-100">
              {currentItems.map((decompte) => (
                <div key={decompte.id} className="p-4 hover:bg-[#76bc21]/5 transition-colors">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">ID</div>
                      <div className="text-sm font-medium text-[#76bc21]">{decompte.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">CIN</div>
                      <div className="text-sm text-gray-700 font-mono">{decompte.cin}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Nom</div>
                    <div className="text-sm font-medium text-gray-900">{decompte.nom}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Adresse</div>
                    <div className="text-sm text-gray-600">{decompte.adresse}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Contact</div>
                      <div className="text-sm text-gray-700">{decompte.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Statut</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(decompte.statut)}`}>
                        {decompte.statut}
                      </span>
                    </div>
                  </div>
                  {/* MONTANT TOTAL DANS LA VUE MOBILE TABLE */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Montant Total</div>
                    <div className="text-sm font-semibold text-[#76bc21]">
                      {calculateTotalAmount(decompte)} Ar
                    </div>
                    {decompte.field602 && (
                      <div className="text-xs text-red-500">
                        Montant enlevé: - {parseFloat(decompte.field602).toLocaleString('fr-FR', { 
                          minimumFractionDigits: 2 
                        })} Ar
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleViewDecompte(decompte)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRemoveCCP(decompte)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Enlever CCP"
                    >
                      <FiMinus className="w-4 h-4" />
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
                Affichage de <span className="font-semibold">{Math.min(filteredDecompte.length, indexOfFirstItem + 1)}-{Math.min(filteredDecompte.length, indexOfLastItem)}</span> sur <span className="font-semibold">{filteredDecompte.length}</span> décomptes
                {searchTerm && ` (filtrés sur ${decompteList.length})`}
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

      {/* Modal de visualisation */}
      <VoirDecompte
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingDecompte(null);
        }}
        decompte={viewingDecompte}
      />

      {/* Modal EnleverCCP */}
      <EnleverCCP
        isOpen={isRemoveModalOpen}
        onClose={() => {
          setIsRemoveModalOpen(false);
          setSelectedDecompteForRemove(null);
        }}
        decompte={selectedDecompteForRemove}
        onSave={handleSaveFields}
      />
    </div>
  );
}