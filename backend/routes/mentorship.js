const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');
const { authMiddleware, requireRole } = require('../middleware/auth');

// POST /mentorship/request – Student requests mentorship
router.post('/request', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const { alumni_id, message } = req.body;

    if (!alumni_id) {
      return res.status(400).json({ error: 'Alumni ID is required' });
    }

    // Verify target is an alumni
    const { data: alumni } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', alumni_id)
      .single();

    if (!alumni || alumni.role !== 'alumni') {
      return res.status(400).json({ error: 'Target user is not an alumni' });
    }

    const { data, error } = await supabaseAdmin
      .from('mentorship_requests')
      .insert({
        student_id: req.user.id,
        alumni_id,
        message
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Mentorship request already sent' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Mentorship request sent', request: data });
  } catch (err) {
    console.error('Mentorship request error:', err);
    res.status(500).json({ error: 'Failed to send request' });
  }
});

// POST /mentorship/accept – Alumni accepts/rejects mentorship
router.post('/accept', authMiddleware, requireRole('alumni'), async (req, res) => {
  try {
    const { request_id, status } = req.body;

    if (!request_id || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Request ID and valid status (accepted/rejected) are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('mentorship_requests')
      .update({ status })
      .eq('id', request_id)
      .eq('alumni_id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: `Mentorship request ${status}`, request: data });
  } catch (err) {
    console.error('Mentorship accept error:', err);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

// GET /mentorship/list – Get mentorship requests for current user
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;

    // Check user role
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    let query;
    if (userData.role === 'alumni') {
      query = supabaseAdmin
        .from('mentorship_requests')
        .select(`*, students:users!student_id ( full_name, email, avatar_url )`)
        .eq('alumni_id', req.user.id);
    } else {
      query = supabaseAdmin
        .from('mentorship_requests')
        .select(`*, alumni:users!alumni_id ( full_name, email, avatar_url )`)
        .eq('student_id', req.user.id);
    }

    if (status) query = query.eq('status', status);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ requests: data || [] });
  } catch (err) {
    console.error('List mentorship error:', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

module.exports = router;
