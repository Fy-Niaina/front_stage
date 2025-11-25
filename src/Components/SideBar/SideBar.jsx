import React from 'react';
import { Search, Mic, Menu, X } from "lucide-react";
import { FiHome, FiFolder, FiFileText, FiArchive, FiSettings } from "react-icons/fi";
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Bénéficiaire", icon: FiHome, path: "/" },
    { name: "Dossier", icon: FiFolder, path: "/dossiers" },
    { name: "Certificat de cessation de paiement", icon: FiFileText, path: "/cpp" },
    { name: "État de décompte", icon: FiFileText, path: "/decomptes" },
    { name: "Projet de décision", icon: FiFileText, path: "/decisions" },
    { name: "Contrôle financier", icon: FiFileText, path: "/controles" },
    { name: "Bureau de secours", icon: FiFolder, path: "/secours" },
    { name: "Archives", icon: FiArchive, path: "/archives" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-[#76bc21]/20 flex flex-col shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header mobile intégré dans la sidebar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#76bc21]/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#76bc21] rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-[#76bc21] font-semibold text-sm">John Doe</span>
              <span className="text-[#76bc21]/80 text-xs">Administrateur</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-[#76bc21] hover:bg-[#76bc21]/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* macOS-style window controls - caché sur mobile */}
        <div className="hidden lg:flex items-center gap-2 p-6 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#76bc21] hover:bg-[#5a8f1a] cursor-pointer transition-colors" />
        </div>

        {/* Search bar */}
        <div className="px-6 pb-6 pt-4 lg:pt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#76bc21]/60" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-9 pr-9 bg-[#76bc21]/5 border border-[#76bc21]/20 h-10 text-sm rounded-lg focus:ring-2 focus:ring-[#76bc21] focus:border-transparent transition-all text-gray-700 placeholder-[#76bc21]/50" 
            />
          </div>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-6 space-y-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <div 
                key={index} 
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all group cursor-pointer border ${
                  active 
                    ? 'bg-[#76bc21]/20 border-[#76bc21]/40 text-[#76bc21] font-semibold' 
                    : 'border-transparent hover:border-[#76bc21]/20 hover:bg-[#76bc21]/10'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  active ? 'text-[#76bc21]' : 'text-[#76bc21]/70 group-hover:text-[#76bc21]'
                }`} />
                <span className={`text-sm transition-colors ${
                  active ? 'text-[#76bc21] font-semibold' : 'text-gray-700 group-hover:text-[#76bc21] font-medium group-hover:font-semibold'
                }`}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-6 border-t border-[#76bc21]/20">
          <div 
            onClick={() => handleNavigation('/déconnexion')}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer border ${
              isActive('/déconnexion')
                ? 'bg-[#76bc21]/20 border-[#76bc21]/40 text-[#76bc21] font-semibold'
                : 'border-transparent hover:border-[#76bc21]/20 hover:bg-[#76bc21]/10'
            }`}
          >
            <FiSettings className={`w-5 h-5 transition-colors ${
              isActive('/déconnexion') ? 'text-[#76bc21]' : 'text-[#76bc21]/70 hover:text-[#76bc21]'
            }`} />
            <span className={`text-sm transition-colors ${
              isActive('/déconnexion') ? 'text-[#76bc21] font-semibold' : 'text-gray-700 hover:text-[#76bc21] font-medium hover:font-semibold'
            }`}>Déconnexion</span>
          </div>
        </div>
      </aside>
    </>
  );
}