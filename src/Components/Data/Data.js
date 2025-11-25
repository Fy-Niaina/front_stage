// Data/Data.js
import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import { MdOutlineDocumentScanner, MdOutlinePeopleAlt } from "react-icons/md";

export const statsData = [
  { 
    title: "Documents Reçus", 
    value: "23", 
    icon: MdOutlineDocumentScanner, 
    trend: "+25%",
    description: "Ce mois"
  },
  { 
    title: "Documents Refusés", 
    value: "05", 
    icon: FiXCircle, 
    trend: "+28%",
    description: "Ce mois"
  },
  { 
    title: "Documents Rendus", 
    value: "18", 
    icon: FiCheckCircle, 
    trend: "+45%",
    description: "Ce mois"
  },
  { 
    title: "Bénéficiaires Actifs", 
    value: "156", 
    icon: MdOutlinePeopleAlt, 
    gradient: "from-violet-500 to-purple-600",
    trend: "+15%",
    description: "Ce mois"
  },
];
// Data/Data.js
export const dossiersData = [
  { 
    id: "D001", 
    cin: "12345678",
    nom: "Jean Dupont", 
    adresse: "123 Rue Principale, Paris", 
    contact: "0332256211",
    type: "Aide sociale", 
    dateCreation: "2024-01-15", 
    statut: "En cours",
    documents: 5
  },
  { 
    id: "D002", 
    cin: "87654321",
    nom: "Marie Martin", 
    adresse: "456 Avenue Centrale, Lyon", 
    contact: "0345678901",
    type: "Allocation familiale", 
    dateCreation: "2024-01-10", 
    statut: "Validé",
    documents: 3
  },
  { 
    id: "D003", 
    cin: "11223344",
    nom: "Pierre Lambert", 
    adresse: "789 Boulevard Nord, Marseille", 
    contact: "0334567890",
    type: "RSA", 
    dateCreation: "2024-01-05", 
    statut: "Rejeté",
    documents: 4
  },
  { 
    id: "D004", 
    cin: "55667788",
    nom: "Sophie Bernard", 
    adresse: "321 Rue du Commerce, Lille", 
    contact: "0341802319",
    type: "Aide au logement", 
    dateCreation: "2024-01-08", 
    statut: "En attente",
    documents: 6
  },
];

export const documentTypes = [
  "La demande avec adresse et contacts exacts, adressée au Directeur de la Solde et des Pensions",
  "Acte de décès",
  "Acte de mariage",
  "Certificat de non-séparation de corps et de non-divorce délivré par le Fokontany",
  "Acte de tutelle",
  "Ordonnance de tutelle délivrée par le Tribunal",
  "Acte de naissance de chaque enfant mineur (moins de 21 ans)",
  "Photocopie de la CIN certifiée du demandeur",
  "Photocopie de l'avis de cessation de paiement de la caisse",
  "Certificat de vie (de moins de 3 mois) de la veuve dépendant de la décision de paiement des veuves"
];

export const statisticsData = [
  {
    title: "Total Dossiers",
    value: "156",
    icon: "📁",
    description: "Ce mois"
  },
  {
    title: "À Importer",
    value: "23",
    icon: "📤",
    description: "En attente"
  },
  {
    title: "Importés",
    value: "89",
    icon: "✅",
    description: "Ce mois"
  },
  {
    title: "Complets",
    value: "67",
    icon: "📊",
    description: "Dossiers finalisés"
  }
];
// Dans Data/Data.js - Ajouter ces données
export const cppData = [
  {
    id: "CPP001",
    cin: "12345678",
    nom: "Jean Dupont",
    adresse: "123 Rue Principale, Paris",
    contact: "0332256211",
    type: "Certificat de cessation de paiement",
    dateCreation: "2024-01-15",
    statut: "En cours"
  },
  {
    id: "CPP002",
    cin: "87654321",
    nom: "Marie Martin",
    adresse: "456 Avenue Centrale, Lyon",
    contact: "0345678901",
    type: "Certificat de cessation de paiement",
    dateCreation: "2024-01-10",
    statut: "Validé"
  },
  {
    id: "CPP003",
    cin: "11223344",
    nom: "Pierre Lambert",
    adresse: "789 Boulevard Nord, Marseille",
    contact: "0334567890",
    type: "Certificat de cessation de paiement",
    dateCreation: "2024-01-05",
    statut: "Rejeté"
  },
  {
    id: "CPP004",
    cin: "55667788",
    nom: "Sophie Bernard",
    adresse: "321 Rue du Commerce, Lille",
    contact: "0341802319",
    type: "Certificat de cessation de paiement",
    dateCreation: "2024-01-08",
    statut: "En attente"
  }
];

export const cppStatsData = [
  {
    title: "Total CPP",
    value: "48",
    icon: "📄",
    description: "Ce mois"
  },
  {
    title: "Actifs",
    value: "32",
    icon: "✅",
    description: "Ce mois"
  },
  {
    title: "Expirés",
    value: "12",
    icon: "⏰",
    description: "Ce mois"
  },
  {
    title: "En attente",
    value: "4",
    icon: "⏳",
    description: "Ce mois"
  }
];
