
declare var java;
declare var com;

import * as utils from "utils/utils";

import { MapView, Marker, Position } from "nativescript-google-maps-sdk"


const LatLng = com.google.android.gms.maps.model.LatLng;
const PolylineOptions = com.google.android.gms.maps.model.PolylineOptions;
const LatLngBounds = com.google.android.gms.maps.model.LatLngBounds;
const CameraUpdateFactory = com.google.android.gms.maps.CameraUpdateFactory;

const ClusterItem = com.google.maps.android.clustering.ClusterItem;
const ClusterManager = com.google.maps.android.clustering.ClusterManager;
const DefaultClusterRenderer = com.google.maps.android.clustering.view.DefaultClusterRenderer;

const HeatmapTileProvider = com.google.maps.android.heatmaps.HeatmapTileProvider;

const TileOverlayOptions = com.google.android.gms.maps.model.TileOverlayOptions;


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

  var clusterManager = new ClusterManager(utils.ad.getApplicationContext(), mapView.gMap);

  mapView.gMap.setOnCameraIdleListener(clusterManager);

  markers.forEach(function (marker) {
    clusterManager.addItem(new ClusterItem({
      rotation: marker.rotation,
      getPosition: function () {
        return marker.position.android;
      }
    }));
  });

  clusterManager.cluster();

}

export interface IHeatmapConfig {

  provider: any,
  overlay: any,

}

export function setupHeatmap(mapView: MapView, positions: Array<Position>, config: IHeatmapConfig = null) : IHeatmapConfig {
  debug('setupHeatmap');

  var list = new java.util.ArrayList();

  positions.forEach(function (position) {
    list.add(position.android);
  });

  if (config) {

    config.overlay.clearTileCache();
    config.provider.setData(list);

  } else {

    config = <IHeatmapConfig>{};

    config.provider = new HeatmapTileProvider.Builder()
      .data(list)
      .build();

    config.overlay = mapView.gMap.addTileOverlay(new TileOverlayOptions().tileProvider(config.provider));

  }

  return config;
}
