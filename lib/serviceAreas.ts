export const serviceAreas = [
  {
    slug: "phoenix",
    name: "Phoenix",
    headline: "Phoenix Landscaping and Irrigation Repair",
    description:
      "Fast irrigation repair, HOA cleanup, desert landscaping, and yard refreshes for Phoenix homeowners dealing with heat, weeds, broken drip lines, and dry zones.",
  },
  {
    slug: "scottsdale",
    name: "Scottsdale",
    headline: "Scottsdale Landscape Care Built for Premium Curb Appeal",
    description:
      "Clean installs, precise irrigation, gravel refreshes, plant replacement, and HOA-ready maintenance for Scottsdale yards.",
  },
  {
    slug: "mesa",
    name: "Mesa",
    headline: "Mesa Irrigation, Cleanup, and Landscaping",
    description:
      "Reliable help for sprinkler issues, overgrowth, dead plants, and desert-smart landscape upgrades across Mesa neighborhoods.",
  },
  {
    slug: "tempe",
    name: "Tempe",
    headline: "Tempe Yard Cleanup and Irrigation Services",
    description:
      "Efficient service for smaller yards, rental properties, student housing, and homes that need quick curb appeal improvements.",
  },
  {
    slug: "chandler",
    name: "Chandler",
    headline: "Chandler HOA-Ready Yard and Irrigation Work",
    description:
      "HOA notice cleanup, valve repair, plant replacement, turf edges, gravel, and yard tune-ups for Chandler homeowners.",
  },
  {
    slug: "glendale",
    name: "Glendale",
    headline: "Glendale Landscaping and Irrigation Rescue",
    description:
      "Same-day style response for broken irrigation, overgrown yards, dead patches, and front-yard cleanup needs in Glendale.",
  },
] as const;

export type ServiceArea = (typeof serviceAreas)[number];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}
