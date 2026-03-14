const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');
const { authMiddleware, requireRole } = require('../middleware/auth');

// POST /jobs/create – Alumni post a job
router.post('/create', authMiddleware, requireRole('alumni', 'admin'), async (req, res) => {
  try {
    const { title, company, location, job_type, work_mode, salary, description,
            requirements, skills_required } = req.body;

    if (!title || !company) {
      return res.status(400).json({ error: 'Title and company are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('jobs')
      .insert({
        posted_by: req.user.id,
        title,
        company,
        location,
        job_type,
        work_mode,
        salary,
        description,
        requirements,
        skills_required: skills_required || []
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Job posted successfully', job: data });
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// GET /jobs/list – List all active jobs
router.get('/list', async (req, res) => {
  try {
    const { job_type, work_mode, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('jobs')
      .select(`
        *,
        users!posted_by ( full_name, avatar_url )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (job_type) query = query.eq('job_type', job_type);
    if (work_mode) query = query.eq('work_mode', work_mode);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ jobs: data || [], page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error('List jobs error:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST /jobs/apply – Student applies for a job
router.post('/apply', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const { job_id, cover_letter, resume_url } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert({
        job_id,
        user_id: req.user.id,
        cover_letter,
        resume_url
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'You have already applied for this job' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Application submitted successfully', application: data });
  } catch (err) {
    console.error('Apply job error:', err);
    res.status(500).json({ error: 'Failed to apply' });
  }
});

module.exports = router;
