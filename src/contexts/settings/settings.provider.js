import React, { createContext, memo, useEffect, useState } from "react";
import i18next from "i18next";
import themeConfig from "data/themeConfig";

const languageStorageItemKey = "language";

const defaultState = {
  theme: "Light",
  setTheme: () => {},
  language: "en",
  setLanguage: () => {},
  isSideBarOpen: true,
  setSideBarToggle: () => {},
};

const SettingsContext = createContext(defaultState);

const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultState.theme);
  const [language, setLanguage] = useState(defaultState.theme);
  const [printRef, setPrintRef] = useState(null);
  const [isSideBarOpen, setSideBarToggle] = useState(
    defaultState.isSideBarOpen,
  );

  useEffect(() => {
    const prefTheme = localStorage.getItem("theme") || defaultState.theme;
    const prefLanguage =
      localStorage.getItem(languageStorageItemKey) || defaultState.language;
    setTheme(prefTheme);
    setLanguage(prefLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const colorConfig = themeConfig[theme];
    for (const [key, value] of Object.entries(colorConfig)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(languageStorageItemKey, language);
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        language,
        printRef,
        setPrintRef,
        setLanguage,
        isSideBarOpen,
        setSideBarToggle,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;

const memoizedProvider = memo(SettingsProvider);

export { memoizedProvider as SettingsProvider, languageStorageItemKey };
