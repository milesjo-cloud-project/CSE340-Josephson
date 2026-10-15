import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { monthToAbbreviation, yenToUsd } from '../src/includes/helpers.js';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const routes = JSON.parse(readFileSync(new URL('../src/models/seeds/routes.json', import.meta.url)));
const schedules = JSON.parse(readFileSync(new URL('../src/models/seeds/schedules.json', import.meta.url)));
const classes = JSON.parse(readFileSync(new URL('../src/models/seeds/ticket-classes.json', import.meta.url)));
const get = async path => {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    return response.text();
};

assert.equal(monthToAbbreviation(1), 'Jan');
assert.equal(monthToAbbreviation(12), 'Dec');
for (const value of [0, 13, 1.5, null, undefined]) assert.equal(monthToAbbreviation(value), '');
for (const path of ['/', '/about', '/scenarios', '/scenarios/emergency-handoff']) await get(path);
for (const query of ['', '?region=central', '?season=autumn', '?region=central&season=autumn', '?region=all&season=all', '?region=invalid', '?season=invalid', '?region=central&region=northern', '?region=CENTRAL']) {
    const html = await get('/routes' + query);
    const params = new URLSearchParams(query);
    const region = params.getAll('region').length === 1 ? params.get('region').toLowerCase() : 'all';
    const season = params.get('season') || 'all';
    const expected = routes.filter(route => (region === 'all' || route.region === region) && (season === 'all' || route.bestSeason === season));
    assert.equal((html.match(/class="route-card /g) || []).length, expected.length, query);
    for (const route of expected) assert(html.includes(route.name));
    if (!expected.length) assert(html.includes('No routes match these filters.'));
    console.log('PASS filters:', query || 'all', expected.length);
}
for (const route of routes) {
    const html = await get('/routes/' + route.id);
    for (const month of route.operatingMonths) assert(html.includes(monthToAbbreviation(month)));
}
for (const ticket of classes) {
    const schedule = schedules[0];
    const route = routes.find(route => route.id === schedule.routeId);
    const price = Math.round(yenToUsd(route.distance * ticket.pricePerKm) * 100) / 100;
    const booking = await get('/routes/booking/' + schedule.id);
    assert(!booking.includes('¥'));
    assert(booking.includes(`data-price="${price}"`));
    assert(!booking.includes('parseInt(e.target.dataset.price)'));
    assert(!booking.includes('parseInt(selectedRadio.dataset.price)'));
    const form = new URLSearchParams({ scheduleId: schedule.id, routeId: schedule.routeId, ticketClass: ticket.class, selectedDay: schedule.daysOfWeek[0] });
    for (let i = 0; i < 2; i++) for (const [key, value] of Object.entries({firstName:'Test', lastName:'Passenger', email:'test@example.com', phone:'5550100'})) form.set(`passengers[${i}][${key}]`, value);
    const response = await fetch(base + '/routes/book', {method:'POST', body:form, redirect:'manual'});
    assert.equal(response.status, 302);
    const location = response.headers.get('location');
    const confirmation = await get(location);
    assert(confirmation.includes(`$${price.toFixed(2)}`));
    assert(confirmation.includes(`$${(price * 2).toFixed(2)} USD`));
    assert(!confirmation.includes('¥'));
    console.log('PASS booking:', ticket.class, location);
}
console.log('All handoff integration checks passed. Test bookings remain in the local demo database.');

