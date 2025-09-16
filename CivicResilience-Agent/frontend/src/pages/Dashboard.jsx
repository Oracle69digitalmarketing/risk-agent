import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Dashboard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("preferredLang", lang);
  };

  return (
    <div className="dashboard">
      {/* 🌍 Language Selector */}
      <div className="language-toggle">
        <select onChange={handleLanguageChange} defaultValue={i18n.language}>
          <option value="en">🇬🇧 English</option>
          <option value="yo">🇳🇬 Yorùbá</option>
          <option value="ha">🇳🇬 Hausa</option>
          <option value="ig">🇳🇬 Igbo</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="es">🇪🇸 Español</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="pt">🇵🇹 Português</option>
        </select>
      </div>

      {/* 🧭 Dashboard Title */}
      <h2>{t("dashboard_title")}</h2>

      {/* 🧠 Analytics Section */}
      <div className="analytics">
        <h3>{t("analytics_title")}</h3>
        {/* Add your charts and components here */}
      </div>
    </div>
  );
};

export default Dashboard;
