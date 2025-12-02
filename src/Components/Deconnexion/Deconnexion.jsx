import React, { useState } from "react";

export default function DeconnexionApp() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setShowChoices(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const openRegister = () => {
    setShowChoices(false);
    setShowRegister(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Compte créé ! Nom: ${name}`);
    setShowRegister(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      {/* Button logout */}
      {!showLogoutConfirm && !showChoices && !showRegister && (
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl shadow bg-[#76bc21]"
        >
          Se déconnecter
        </button>
      )}

      {/* Modal confirmation */}
      {showLogoutConfirm && (
        <div className="p-6 bg-[#76bc21] rounded-2xl shadow w-80 text-center">
          <p className="mb-4 text-lg font-semibold">
            Souhaitez-vous vraiment vous déconnecter ?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-[#76bc21] text-white rounded-xl"
            >
              Oui
            </button>
            <button
              onClick={cancelLogout}
              className="px-4 py-2 bg-[#76bc21] rounded-xl"
            >
              Non
            </button>
          </div>
        </div>
      )}

      {/* Choix après déconnexion */}
      {showChoices && (
        <div className="p-6 bg-[#76bc21] rounded-2xl shadow w-80 text-center">
          <p className="mb-4 text-lg font-semibold">Choisissez une option :</p>
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 bg-[#76bc21] text-white rounded-xl">
              Se connecter à un autre compte
            </button>
            <button
              onClick={openRegister}
              className="px-4 py-2 bg-[#76bc21] text-white rounded-xl"
            >
              Créer un compte
            </button>
          </div>
        </div>
      )}

      {/* Formulaire création */}
      {showRegister && (
        <form
          onSubmit={handleRegister}
          className="p-6 bg-[#76bc21] rounded-2xl shadow w-80 flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold text-center mb-2">Créer un compte</h2>

          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-xl"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-[#76bc21] text-white rounded-xl mt-2"
          >
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
}
