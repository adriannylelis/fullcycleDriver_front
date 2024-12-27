"use client";

import { useRef } from "react";
import { useMap } from "../../hooks/useMap";

export function AdminPage() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    useMap(mapContainerRef);

    return <div
        ref={mapContainerRef}
        style={{
            width: "100%",
            height: "100%",
            minHeight: "400px", // Exemplo de altura mínima
            backgroundColor: "#e0e0e0", // Útil para depuração visual
        }}
    />
}

export default AdminPage;