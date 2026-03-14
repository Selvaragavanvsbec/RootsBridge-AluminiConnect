const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');
const { authMiddleware } = require('../middleware/auth');

// POST /events/create – Create a new event
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, description, event_date, event_time, location, event_type,
            max_attendees, banner_url } = req.body;

    if (!title || !event_date) {
      return res.status(400).json({ error: 'Title and event date are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .insert({
        created_by: req.user.id,
        title,
        description,
        event_date,
        event_time,
        location,
        event_type,
        max_attendees,
        banner_url
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Event created successfully', event: data });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// GET /events/list – List upcoming events
router.get('/list', async (req, res) => {
  try {
    const { event_type, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('events')
      .select(`
        *,
        users!created_by ( full_name, avatar_url ),
        rsvps ( id, user_id, status )
      `)
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .range(offset, offset + limit - 1);

    if (event_type) query = query.eq('event_type', event_type);

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Count RSVPs for each event
    const events = (data || []).map(event => ({
      ...event,
      rsvp_count: event.rsvps?.filter(r => r.status === 'going').length || 0,
      rsvps: undefined
    }));

    res.json({ events, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error('List events error:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /events/rsvp – RSVP to an event
router.post('/rsvp', authMiddleware, async (req, res) => {
  try {
    const { event_id, status = 'going' } = req.body;

    if (!event_id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .upsert({
        event_id,
        user_id: req.user.id,
        status
      }, { onConflict: 'event_id,user_id' })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'RSVP updated successfully', rsvp: data });
  } catch (err) {
    console.error('RSVP error:', err);
    res.status(500).json({ error: 'Failed to RSVP' });
  }
});

module.exports = router;
