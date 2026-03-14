const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');
const { authMiddleware } = require('../middleware/auth');

// POST /messages/send – Send a message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ error: 'Receiver ID and content are required' });
    }

    if (receiver_id === req.user.id) {
      return res.status(400).json({ error: 'Cannot send message to yourself' });
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert({
        sender_id: req.user.id,
        receiver_id,
        content
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Message sent', data });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /messages/conversation/:userId – Get conversation with a user
router.get('/conversation/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${req.user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${req.user.id})`
      )
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Mark received messages as read
    await supabaseAdmin
      .from('messages')
      .update({ is_read: true })
      .eq('sender_id', userId)
      .eq('receiver_id', req.user.id)
      .eq('is_read', false);

    res.json({ messages: data || [] });
  } catch (err) {
    console.error('Get conversation error:', err);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// GET /messages/inbox – Get all conversations (inbox view)
router.get('/inbox', authMiddleware, async (req, res) => {
  try {
    // Get latest message from each conversation partner
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select(`
        *,
        sender:users!sender_id ( id, full_name, avatar_url ),
        receiver:users!receiver_id ( id, full_name, avatar_url )
      `)
      .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Group by conversation partner and get latest message
    const conversations = {};
    (data || []).forEach(msg => {
      const partnerId = msg.sender_id === req.user.id ? msg.receiver_id : msg.sender_id;
      if (!conversations[partnerId]) {
        const partner = msg.sender_id === req.user.id ? msg.receiver : msg.sender;
        conversations[partnerId] = {
          partner,
          last_message: msg,
          unread_count: 0
        };
      }
      if (msg.receiver_id === req.user.id && !msg.is_read) {
        conversations[partnerId].unread_count++;
      }
    });

    res.json({ conversations: Object.values(conversations) });
  } catch (err) {
    console.error('Inbox error:', err);
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

module.exports = router;
