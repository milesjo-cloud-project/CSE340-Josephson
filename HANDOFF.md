# Emergency handoff completion

The six changes are implemented:

1. The header logo link has a descriptive title.
2. Train route controllers are grouped in `src/routes/routes/`, with its router in `index.js`. Site and scenario controllers remain in their original locations.
3. Region and season query parameters filter independently or together. Choosing All clears that filter and preserves the other. Unknown values show an empty result message; repeated query values are safely ignored. Filters use two centered grid columns and stack on narrow screens.
4. `monthToAbbreviation` formats operating months through a separate `operatingMonthNames` property. Numeric stored months remain available for operating-month calculations.
5. Ticket options use the existing fixed Yen-to-USD helper (0.0066 USD per Yen), rounded to cents. Booking choices, the dynamic summary, passenger totals, and confirmation use USD. Seed prices remain in Yen. Currency parsing retains cents.
6. Print styles hide site navigation, footer, actions, decorative icons and follow-up instructions. The booking reference, booking details, USD total, passengers and important information remain. Print spacing is compact without shrinking fonts, and passenger cards avoid page breaks.

## Run

From this directory, run `pnpm install` and `pnpm run dev`, then visit http://127.0.0.1:3000.

## Verification

With the server running, execute `node tests/handoff.mjs`. It checks page responses, filter combinations and edge cases, route month labels, and two-passenger bookings for all three ticket classes. The script creates demo confirmations in the ignored local database.

Browser checks covered filter changes, empty results, month abbreviations, ticket selection, passenger totals, the eight-passenger limit, and an eight-passenger booking through confirmation. The browser reported no console warnings or errors.

The automated browser could not expose the native print preview. Check Print Confirmation manually for pagination with your printer's paper size and margins. Duplex/single-sided printing is controlled by the printer dialog, not website CSS.
