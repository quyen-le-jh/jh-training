mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVuLW5ndXllbi1qaCIsImEiOiJjbHVnb2RnZHMyMGRvMmtueTdnZGhpYzg3In0.yyk3sh5xRg4IvYL6LZ92Ug";

const apiURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",

  center: [-96, 37.8],
  zoom: 4,
});

map.on("load", () => {
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

for (const feature of geojson.features) {
  const el = document.createElement("div");
  el.className = "marker";

  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
    )
    .addTo(map);
}

const locationInput = document.getElementById("location-input");
const locationList = document.getElementById("location-list");

locationInput.addEventListener("input", debounce(handleInput, 300));

function handleInput() {
  const query = locationInput.value.trim();

  if (query.length === 0) {
    clearSuggestions();
    return;
  }

  fetchLocations(query).then(displaySuggestions);
}

async function fetchLocations(query) {
  const url = `${apiURL}${encodeURIComponent(query)}.json?access_token=${
    mapboxgl.accessToken
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Cannot fetch locations");
    }
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

function displaySuggestions(locations) {
  clearSuggestions();

  locations.forEach((location) => {
    const name = location.place_name;
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
      locationInput.value = name;
      zoomToLocation(location);
      clearSuggestions();
    });
    locationList.appendChild(li);
  });
}

function zoomToLocation(location) {
  const coordinates = location.center;
  const zoom = 12;

  map.flyTo({
    center: coordinates,
    zoom: zoom,
  });
  new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
}

function clearSuggestions() {
  locationList.innerHTML = "";
}

function debounce(func, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
