mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVuLW5ndXllbi1qaCIsImEiOiJjbHVnb2RnZHMyMGRvMmtueTdnZGhpYzg3In0.yyk3sh5xRg4IvYL6LZ92Ug";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",

  center: [-96, 37.8],
  zoom: 4,
});

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: "Washington, D.C.",
        description: "The capital of the United States.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "San Francisco, CA",
        description: "The most populous city in the state of California.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-104.99155, 39.75621],
      },
      properties: {
        title: "Denver, CO",
        description: "The capital of Colorado.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.99155, 40.75621],
      },
      properties: {
        title: "New York, NY",
        description: "The most populous city in the state of New York.",
      },
    },
  ],
};

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(map);
}

const searchJS = document.getElementById("search-js");
searchJS.onload = function () {
  const searchBox = new MapboxSearchBox();
  searchBox.accessToken = mapboxgl.accessToken;
  searchBox.options = {
    types: "address,poi",
    proximity: [-73.99209, 40.68933],
  };
  searchBox.marker = true;
  searchBox.placeholder = "Enter the location...";
  searchBox.mapboxgl = mapboxgl;

  map.addControl(searchBox);
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );
};
