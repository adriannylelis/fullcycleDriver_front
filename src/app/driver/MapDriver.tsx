"use client";

import { socket } from "@/utils/socket-io";
import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";

export type MapDriverProps = {
    route_id: string | null;
};

export function MapDriver(props: MapDriverProps) {
    const { route_id } = props;
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const map = useMap(mapContainerRef);

    useEffect(() => {

        if (!map || !route_id) {
            return
        };

        socket.disconnected ? socket.connect() : socket.offAny();

        socket.on('connect', () => {
            console.log('connected');
            socket.emit(`client:new-points`, { route_id });
        });



        socket.on(`server:new-points/${route_id}:list`, (data) => { });
    }, [route_id, map]);

    return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}