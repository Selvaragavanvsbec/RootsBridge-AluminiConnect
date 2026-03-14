const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');

// GET /alumni/search – Search alumni with filters
router.get('/search', async (req, res) => {
  try {
    const { query, department, skills, graduation_year, company, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let dbQuery = supabaseAdmin
      .from('users')
      .select(`
        id, full_name, email, institution, avatar_url,
        profiles!inner (
          bio, company, job_title, skills, department,
          graduation_year, interests, location, is_open_to_mentor
        )
      `)
      .eq('role', 'alumni')
      .range(offset, offset + limit - 1);

    // Text search on name
    if (query) {
      dbQuery = dbQuery.ilike('full_name', `%${query}%`);
    }

    const { data, error, count } = await dbQuery;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Client-side filtering for profile fields
    let results = data || [];

    if (department) {
      results = results.filter(a =>
        a.profiles?.department?.toLowerCase().includes(department.toLowerCase())
      );
    }
    if (skills) {
      const skillList = skills.split(',').map(s => s.trim().toLowerCase());
      results = results.filter(a =>
        a.profiles?.skills?.some(s => skillList.includes(s.toLowerCase()))
      );
    }
    if (graduation_year) {
      results = results.filter(a => a.profiles?.graduation_year === graduation_year);
    }
    if (company) {
      results = results.filter(a =>
        a.profiles?.company?.toLowerCase().includes(company.toLowerCase())
      );
    }

    res.json({
      alumni: results,
      total: results.length,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    console.error('Alumni search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
