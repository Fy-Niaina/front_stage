import React from 'react';
import { FiSettings, FiHelpCircle, FiMenu } from "react-icons/fi";

export default function Header({ onMenuToggle }) {
  return (
    <header className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 mb-4 lg:mb-6 border border-[#76bc21]/20 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Bouton menu pour mobile - maintenant fonctionnel */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-[#76bc21] hover:bg-[#76bc21]/10 rounded-xl transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Logo et titre */}
          <div className="flex flex-col">
            <h1 className="text-lg lg:text-2xl font-bold text-[#76bc21]">
              Gestion des demandes de Secours aux Décès
            </h1>
            <p className="text-black text-xs lg:text-sm mt-0.5 lg:mt-1">
              Gérez et suivez vos demandes de secours aux décès efficacement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Action Buttons - version mobile réduite */}
          <div className="flex items-center space-x-1 lg:space-x-2">

            {/* Cacher Help Circle sur mobile très petit */}
            <button className="hidden xs:flex p-2 text-[#76bc21] hover:bg-[#76bc21]/10 rounded-xl transition-colors">
              <FiHelpCircle className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            <button className="p-2 text-[#76bc21] hover:bg-[#76bc21]/10 rounded-xl transition-colors">
              <FiSettings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>

          {/* User Profile - version mobile compacte */}
          <div className="flex items-center gap-2 lg:gap-3 bg-[#76bc21]/10 rounded-lg lg:rounded-xl px-2 lg:px-4 py-1.5 lg:py-2 border border-[#76bc21]/20">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#76bc21] rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm shadow-lg">
              JD
            </div>

            {/* Cacher le texte sur mobile très petit, afficher à partir de sm */}
            <div className="hidden sm:flex flex-col">
              <span className="text-[#76bc21] font-semibold text-xs lg:text-sm">John Doe</span>
              <span className="text-[#76bc21]/80 text-xs">Administrateur</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de progression ou indicateur optionnel */}
      <div className="mt-3 lg:mt-4 hidden sm:block">
        <div className="w-full bg-[#76bc21]/10 rounded-full h-1.5">
          <div className="bg-[#76bc21] h-1.5 rounded-full w-3/4"></div>
        </div>
      </div>
    </header>
  );
}