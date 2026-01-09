const express = require('express');
const router = express.Router();
const { createTicket, getTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createTicket);
router.get('/', getTickets);

module.exports = router;
