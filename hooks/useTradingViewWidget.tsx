"use client"

import {useEffect, useRef} from "react";

const useTradingViewWidget = (scriptUrl:string, config: Record<string,unknown>,height=600) => {
   const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(
        () => {
            if(!containerRef.current) return;
            if(containerRef.current.dataset.loaded) return;//vérifie si un widget et déjà loaded

            //Ajoute une div interne qui accueillera le widget TradingView.
            containerRef.current.innerHTML= `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`


            //On charge le script distant (scriptUrl) et on lui passe la configuration (config).
            // Le dataset.loaded évite de réinsérer le widget plusieurs fois si les props changent.
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = JSON.stringify(config)

            containerRef.current.appendChild(script);
            containerRef.current.dataset.loaded = "true"

            //Nettoyage
            return ()=>{
                if(containerRef.current) {
                    containerRef.current.innerHTML = ""
                    delete containerRef.current.dataset.loaded
                }
            }
        },
        [scriptUrl,config, height]
    );

    return containerRef
}
export default useTradingViewWidget
