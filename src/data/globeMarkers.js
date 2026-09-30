/* The places marked on the workflow section's globe, and the arcs drawn
   between them. Latitude and longitude in degrees (north and east positive).

   PLACEHOLDERS: these are Ignitho's offices as best known when the globe was
   built. Replace them with the confirmed list; the globe reads them from here
   and nothing else needs to change. */

export const GLOBE_MARKERS = [
  { id: 'richmond', name: 'Richmond', region: 'United States', lat: 37.54, lon: -77.44 },
  { id: 'london', name: 'London', region: 'United Kingdom', lat: 51.51, lon: -0.13 },
  { id: 'chennai', name: 'Chennai', region: 'India', lat: 13.08, lon: 80.27 },
  { id: 'kochi', name: 'Kochi', region: 'India', lat: 9.93, lon: 76.27, quiet: true }
];

/* Each arc joins two marker ids; they draw in one after another, on a loop. */
export const GLOBE_ARCS = [
  ['richmond', 'london'],
  ['london', 'chennai'],
  ['chennai', 'richmond'],
  ['kochi', 'london']
];
