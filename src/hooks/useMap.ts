import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import { Map } from "../utils/map";
import { getCurrentPosition } from "./geolocation";

export function useMap(containerRef: React.RefObject<HTMLDivElement>) {
    const [map, setMap] = useState<Map>();

    useEffect(() => {
        (async () => {
            if (!containerRef.current) {
                console.error("O containerRef não está definido.");
                return;
            }

            try {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                libraries: ["routes", "geometry", "marker"],
            });

            const [, , , position] = await Promise.all([
                loader.importLibrary("routes"),
                loader.importLibrary("geometry"),
                loader.importLibrary("marker"),
                getCurrentPosition({ enableHighAccuracy: true }),
            ]);

                console.log("Posição atual:", position);

                const map = new Map(containerRef.current, {
                    mapId: "8e0a97af9386fef", // Tema do mapa
                    zoom: 15,
                    center: position,
            });

                console.log("Mapa inicializado:", map);
            setMap(map);
            } catch (error) {
                console.error("Erro ao carregar o mapa:", error);
            }
        })();
    }, [containerRef]);


    return map;
}