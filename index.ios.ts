
import * as utils from "tns-core-modules/utils/utils";

import { MapView, Marker, Position } from "nativescript-google-maps-sdk"


const debugNull = function(...args: Array<any>): void { };

function debugDefault(...args: Array<any>) {
    args = args.map((value) => {
        if (typeof value === 'object' && value) {
            try {
                value = JSON.stringify(value);
            } catch (e) {
                value = value.toString();
            }
        }
        return value;
    });
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}

let debug = debugNull;

export function enableDebug(debugFn: ((...args: Array<any>) => any) = debugDefault): void {
    debug = debugFn;
}

export function disableDebug(): void {
    debug = debugNull;
}


export function setupMarkerCluster(mapView: MapView, markers: Array<Marker>, options) {
  debug('setupMarkerCluster');
  // TODO
}

export interface IHeatmapConfig {

}

export function setupHeatmap(mapView: MapView, positions: Array<Position>, config: IHeatmapConfig = null) : IHeatmapConfig {
  debug('setupHeatmap');
  // TODO
  return config;
}
