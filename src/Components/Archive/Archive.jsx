import React, { useState } from 'react';
import { 
  FiEdit, 
  FiEye, 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiMenu, 
  FiX,
  FiUpload,
  FiFolder,
  FiFileText,
  FiUser
} from "react-icons/fi";
import Header from '../Header/Header';
import ImportArchive from './ImportArchive';
import ViewDossier from './ViewDossier';
import { dossiersData, statsData } from '../Data/Data';

export default function ArchiverPage({ onMenuToggle }) {
  const [dossiers, setDossiers] = useState(dossiersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [importedDocuments, setImportedDocuments] = useState({});

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

  const filteredDossiers = dossiers.filter(dossier =>
    dossier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.cin.includes(searchTerm) ||
    dossier.contact.includes(searchTerm)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDossiers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDossiers.length / itemsPerPage);

  const handleViewDossier = (dossier) => {
    setSelectedDossier(dossier);
    setViewModalOpen(true);
  };

  const handleEditDossier = (dossier) => {
    // Logique pour modifier un dossier
    console.log("Modifier le dossier:", dossier);
  };

  const handleImportClick = (dossier) => {
    setSelectedDossier(dossier);
    setImportModalOpen(true);
  };

  const handleImportDocuments = (documents) => {
    if (selectedDossier) {
      setImportedDocuments(prev => ({
        ...prev,
        [selectedDossier.id]: [...(prev[selectedDossier.id] || []), ...documents]
      }));
      
      // Mettre à jour le nombre de documents
      setDossiers(prev => 
        prev.map(d => 
          d.id === selectedDossier.id 
            ? { ...d, documents: d.documents + documents.length }
            : d
        )
      );
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Vue mobile - Card component
  const MobileDossierCard = ({ dossier }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-sm font-medium text-[#76bc21] bg-[#76bc21]/10 px-2 py-1 rounded">
            {dossier.id}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(dossier.statut)}`}>
          {dossier.statut}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div>
          <div className="text-xs text-gray-500">Nom</div>
          <div className="text-sm font-medium text-gray-900">{dossier.nom}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">CIN</div>
            <div className="text-sm text-gray-700 font-mono">{dossier.cin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact</div>
            <div className="text-sm text-gray-700">{dossier.contact}</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Adresse</div>
          <div className="text-sm text-gray-600 line-clamp-2">{dossier.adresse}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Documents</div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <FiFolder className="w-3 h-3" />
            {dossier.documents} fichier{dossier.documents > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
        <button 
          onClick={() => handleViewDossier(dossier)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
          title="Voir les détails"
        >
          <FiEye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleImportClick(dossier)}
          className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors" 
          title="Importer des fichiers"
        >
          <FiUpload className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleEditDossier(dossier)}
          className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
          title="Modifier"
        >
          <FiEdit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 lg:p-6 relative z-10">
      {/* <Header onMenuToggle={onMenuToggle} /> */}
      
      {/* Cards de résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 lg:p-6 border border-[#76bc21]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-medium ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                  </span>
                  <span className="text-xs text-gray-500">{stat.description}</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {/* Table Header with Actions - IDENTIQUE À L'EXEMPLE */}
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
              {currentItems.map((dossier) => (
                <MobileDossierCard 
                  key={dossier.id} 
                  dossier={dossier} 
                />
              ))}
            </div>
            
            {filteredDossiers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Aucun dossier trouvé</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Aucun dossier disponible'}
                </p>
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
              {currentItems.map((dossier) => (
                <div 
                  key={dossier.id} 
                  className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-[#76bc21]/10 transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black bg-[#76bc21]/20 px-3 py-1 rounded-full">
                      {dossier.id}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 font-mono">{dossier.cin}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{dossier.nom}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 line-clamp-1">{dossier.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">{dossier.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(dossier.statut)}`}>
                      {dossier.statut}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewDossier(dossier)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleImportClick(dossier)}
                      className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Importer des fichiers"
                    >
                      <FiUpload className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditDossier(dossier)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors group-hover:scale-110 transform duration-200" 
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Table Fallback - Simple vertical layout */}
            <div className="lg:hidden divide-y divide-gray-100">
              {currentItems.map((dossier) => (
                <div key={dossier.id} className="p-4 hover:bg-[#76bc21]/5 transition-colors">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">ID</div>
                      <div className="text-sm font-medium text-[#76bc21]">{dossier.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">CIN</div>
                      <div className="text-sm text-gray-700 font-mono">{dossier.cin}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Nom</div>
                    <div className="text-sm font-medium text-gray-900">{dossier.nom}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Adresse</div>
                    <div className="text-sm text-gray-600">{dossier.adresse}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Contact</div>
                      <div className="text-sm text-gray-700">{dossier.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Statut</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(dossier.statut)}`}>
                        {dossier.statut}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium">Documents</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <FiFolder className="w-4 h-4" />
                      {dossier.documents} fichier{dossier.documents > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleViewDossier(dossier)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                      title="Voir les détails"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleImportClick(dossier)}
                      className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors" 
                      title="Importer des fichiers"
                    >
                      <FiUpload className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditDossier(dossier)}
                      className="p-2 text-[#76bc21] hover:bg-[#76bc21]/20 rounded-lg transition-colors" 
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
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
                Affichage de <span className="font-semibold">{Math.min(filteredDossiers.length, indexOfFirstItem + 1)}-{Math.min(filteredDossiers.length, indexOfLastItem)}</span> sur <span className="font-semibold">{filteredDossiers.length}</span> dossiers
                {searchTerm && ` (filtrés sur ${dossiers.length})`}
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

      {/* Modal d'importation */}
      <ImportArchive
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        dossier={selectedDossier}
        onImport={handleImportDocuments}
      />

      {/* Modal de visualisation */}
      <ViewDossier
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        dossier={selectedDossier}
        importedDocuments={selectedDossier ? importedDocuments[selectedDossier.id] : []}
      />
    </div>
  );
}