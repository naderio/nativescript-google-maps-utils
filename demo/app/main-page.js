var vmModule = require("./main-view-model");
var observableModule = require("tns-core-modules/data/observable");
var platform = require("tns-core-modules/platform");
var GoogleMaps = require("nativescript-google-maps-sdk");
var GoogleMapsUtils = require("nativescript-google-maps-utils");
// var GoogleMapsUtils = require("./dev");
var Image = require("ui/image").Image;
var imageSource = require("image-source");
var Color = require("color").Color;

var debug = require('./debug')(__filename);

function wait(milliSeconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(milliSeconds);
    }, milliSeconds);
  });
}

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;


function configureMap(mapView, options) {

  if (platform.isAndroid) {

    options = options || {};

    var uiSetting = mapView.gMap.getUiSettings();

    if ('allGesturesEnabled' in options) {
      uiSetting.setAllGesturesEnabled(options.allGesturesEnabled);
    }
    if ('compassEnabled' in options) {
      uiSetting.setCompassEnabled(options.compassEnabled);
    }
    if ('indoorLevelPickerEnabled' in options) {
      uiSetting.setIndoorLevelPickerEnabled(options.indoorLevelPickerEnabled);
    }
    if ('mapToolbarEnabled' in options) {
      uiSetting.setMapToolbarEnabled(options.mapToolbarEnabled);
    }
    if ('myLocationButtonEnabled' in options) {
      uiSetting.setMyLocationButtonEnabled(options.myLocationButtonEnabled);
    }
    if ('rotateGesturesEnabled' in options) {
      uiSetting.setRotateGesturesEnabled(options.rotateGesturesEnabled);
    }
    if ('scrollGesturesEnabled' in options) {
      uiSetting.setScrollGesturesEnabled(options.scrollGesturesEnabled);
    }
    if ('tiltGesturesEnabled' in options) {
      uiSetting.setTiltGesturesEnabled(options.tiltGesturesEnabled);
    }
    if ('zoomControlsEnabled' in options) {
      uiSetting.setZoomControlsEnabled(options.zoomControlsEnabled);
    }
    if ('zoomGesturesEnabled' in options) {
      uiSetting.setZoomGesturesEnabled(options.zoomGesturesEnabled);
    }

    if ('myLocationEnabled' in options) {
      mapView.gMap.setMyLocationEnabled(options.myLocationEnabled);
    }
    if ('trafficEnabled' in options) {
      mapView.gMap.setTrafficEnabled(options.trafficEnabled);
    }

  }

}

function generateRandomPosition(position, distance) {
  var r = distance / 111300;

  var x = position[0];
  var y = position[1];

  var u = Math.random();
  var v = Math.random();

  var w = r * Math.sqrt(u);
  var t = 2 * Math.PI * v;

  var dx = w * Math.cos(t) / Math.cos(y);
  var xy = w * Math.sin(t);

  return [x + dx, y + xy];
}

function onMapReady(args) {
  debug("onMapReady");

  var mapView = args.object;

  configureMap(mapView, {
    compassEnabled: true,
    zoomControlsEnabled: true,
    myLocationButtonEnabled: false,
    mapToolbarEnabled: true,
    allGesturesEnabled: true,
    myLocationEnabled: false,
    trafficEnabled: true,
  });

  debug("Setting a marker...");

  var marker = new GoogleMaps.Marker();
  marker.position = GoogleMaps.Position.positionFromLatLng(36.799441, 10.178554);
  marker.title = "Tunis";
  marker.snippet = "Tunisia";
  marker.userData = {
    index: -1
  };
  mapView.addMarker(marker);


  var positionSet;
  var makerSet;

  positionSet = [];
  for (var i = 0; i < 200; i++) {
    positionSet.push(generateRandomPosition([36.845026, 10.325454], 10000));
  }

  positionSet = positionSet.map(function (position) {
    return GoogleMaps.Position.positionFromLatLng(position[0], position[1]);
  });

  GoogleMapsUtils.enableDebug(require('./debug')('nativescript-google-maps-utils'));

  GoogleMapsUtils.setupHeatmap(mapView, positionSet);

  setTimeout(function () {

    positionSet = [];
    for (var i = 0; i < 50; i++) {
      positionSet.push(generateRandomPosition([36.799441, 10.178554], 10000));
    }

    makerSet = positionSet.map(function (position, index) {
      var marker = new GoogleMaps.Marker();
      marker.position = GoogleMaps.Position.positionFromLatLng(position[0], position[1]);
      marker.title = "Title #" + index;
      marker.snippet = "Snippet #" + index;
      marker.userData = {
        index: index
      };
      return marker;
    });

    GoogleMapsUtils.setupMarkerCluster(mapView, makerSet);

  }, 10000)

}

var lastCamera = null;

function onCameraChanged(args) {
  debug("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === lastCamera);
  lastCamera = JSON.stringify(args.camera);
}

function onMarkerSelect(args) {
  // debug("Clicked on " + args.marker.title);
  debug("Clicked on marker " + (args.marker ? args.marker.title : '?'));
}

function onMarkerInfoWindowTapped(args) {
  debug("Clicked on window " + args.marker.title);
}

exports.onMapReady = onMapReady;
exports.onCameraChanged = onCameraChanged;
exports.onMarkerSelect = onMarkerSelect;
exports.onMarkerInfoWindowTapped = onMarkerInfoWindowTapped;