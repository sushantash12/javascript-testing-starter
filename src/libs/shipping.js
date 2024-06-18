export function getShippingQuote(destination) {
  console.log(`Getting a shipping quote for ${destination}...`);

  return destination == 'Mars'
    ? null
    : { cost: 10 * Math.random(), estimatedDays: 2 };
}
