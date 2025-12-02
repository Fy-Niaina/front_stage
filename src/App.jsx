// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header/Header';
import StatCard from './Components/StatCard/StatCard';
import BeneficiaryTable from './Components/BeneficiaryTable/BeneficiaryTable';
import SideBar from "./Components/SideBar/SideBar";
import DossierPage from './Components/Dossier/Dossier';
import CppPage from './Components/Cpp/Cpp'; // Import de la page CPP
import DecisionDecesPage from './Components/ProjetDecision/Solde';
import DecisionDecesForm from './Components/ProjetDecision/Pension';
import { statsData } from './Components/Data/Data';
import ControleFinancier from './Components/ControleFinancier/ControleFinancier';
import DecisionSecours from './Components/BureauSecours/BureauSecours';
import FormulaireVisaDeces from './Components/ControleFinancier/ControleFinancier';
import FormulaireDecisionDeces from './Components/ProjetDecision/Solde';
import ArchiverPage from './Components/Archive/Archive';
import DeconnexionApp from './Components/Deconnexion/Deconnexion';
import DecomptePage from './Components/Decompte/Decompte';

// Page Dashboard
function DashboardPage({ onMenuToggle }) {
  return (
    <div className="w-full p-4 lg:p-6 relative z-10">
      <Header onMenuToggle={onMenuToggle} />
      
      {/* Stats Overview */}
      <div className="mb-6 lg:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              description={stat.description}
            />
          ))}
        </div>
      </div>
      
      {/* Table Section */}
      <div className="mb-6 lg:mb-8 w-full">
        <BeneficiaryTable />
      </div>
    </div>
  );
}

// Pages simples pour les autres routes
function SimplePage({ title, onMenuToggle, composant }) {
  return (
    <div className="w-full p-4 lg:p-6">
      <Header onMenuToggle={onMenuToggle} />
      <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">{title}</h1>
      <div className="bg-white rounded-lg p-4 lg:p-6 border border-[#76bc21]/20">
        {/* <p className="text-gray-600">Contenu de la page {title} à développer...</p> */}
        {/* <DecisionSecours/> */}
        {composant}
      </div>
    </div>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100/80">
        <SideBar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <main className="flex-1 overflow-auto min-w-0 lg:ml-0">
          {/* Background decorative elements */}
          <div className="fixed top-0 right-0 w-full h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="fixed bottom-0 left-0 w-full h-96 bg-gradient-to-tr from-emerald-100/30 to-teal-100/20 rounded-full blur-3xl -z-10"></div>
          
          <Routes>
            <Route path="/" element={<DashboardPage onMenuToggle={handleMenuToggle} />} />
            <Route path="/dossiers" element={<DossierPage onMenuToggle={handleMenuToggle} />} />
            <Route path="/cpp" element={<CppPage onMenuToggle={handleMenuToggle} />} />
            <Route path="/decomptes" element={<SimplePage title="États de décompte" onMenuToggle={handleMenuToggle} composant={<DecomptePage/>} />} />
            <Route path="/decisions" element={<SimplePage title={`Décisions Solde`} onMenuToggle={handleMenuToggle} composant={<DecisionDecesPage/>}/>} />
            <Route path="/decisions-pensions" element={<SimplePage title={`Décisions Pensions`} onMenuToggle={handleMenuToggle} composant={<DecisionDecesForm/>}/>} />
            {/* <Route path="/controles" element={<ControleFinancier onMenuToggle={handleMenuToggle} />} /> */}
            <Route path="/secours" element={<SimplePage title="Bureau de secours" onMenuToggle={handleMenuToggle} composant={<DecisionSecours/>}/>} />
            <Route path="/controle-financier" element={<SimplePage title="ControleFinancier" onMenuToggle={handleMenuToggle} composant={<FormulaireVisaDeces/>}/>} />
            <Route path="/archives" element={<SimplePage title="Archives" onMenuToggle={handleMenuToggle} composant={<ArchiverPage/>}/>} />
            <Route path="/archives" element={<SimplePage title="Archives" onMenuToggle={handleMenuToggle} composant={<ArchiverPage/>}/>} />
            <Route path="/déconnexion" element={<SimplePage title="Déconnexion" onMenuToggle={handleMenuToggle} composant={<DeconnexionApp/>} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;