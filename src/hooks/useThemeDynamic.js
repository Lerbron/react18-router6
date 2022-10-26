import React, { useEffect } from "react";

export default function useThemeDynamic() {
  useEffect(() => {
    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const setDataName = themeMedia => {
      console.log('themeMedia--->', themeMedia)
      if (themeMedia.matches) {
        document.documentElement.setAttribute('data-name', 'dark')
      } else {
        document.documentElement.setAttribute('data-name', 'light')
      }
    }
    setDataName(themeMedia)

    themeMedia.addEventListener('change', setDataName)

  }, [])
}