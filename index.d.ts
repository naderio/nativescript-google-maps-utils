
declare module "nativescript-google-maps-utils" {

    import { MapView, Position, Marker } from "nativescript-google-maps-sdk";

    export function enableDebug(debugFn?: ((...args: Array<any>) => any)): void;
    export function disableDebug(): void;

    export function setupMarkerCluster(mapView: MapView, markers: Array<Marker>, options: any): void;

    export interface IHeatmapConfig {
        provider: any;
        overlay: any;
    }

    export function setupHeatmap(mapView: MapView, positions: Array<Position>, config?: IHeatmapConfig) : IHeatmapConfig;
}
