import { getConfirmationById, getTicketOptionsForRoute } from '../../models/model.js';

export default async (req, res) => {
    const { confirmationId } = req.params;

    const confirmation = await getConfirmationById(confirmationId);

    if (!confirmation) return res.status(404).render('errors/404', { title: 'Booking Not Found', error: 'Booking not found' });
    const ticketOptions = await getTicketOptionsForRoute(confirmation.routeId);
    const ticket = ticketOptions?.find(option => option.class === confirmation.ticketClass);
    const pricePerTicket = ticket?.price ?? 0;
    const totalAmount = pricePerTicket * confirmation.passengers.length;

    res.render('routes/confirm', {
        title: 'Trip Confirmation',
        confirmation,
        pricePerTicket,
        totalAmount
    });
};
