const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../supabase/client');
const { authMiddleware } = require('../middleware/auth');

// GET /users/profile – Get current user's profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (userError) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user, profile });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /users/profile – Update current user's profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { full_name, institution, avatar_url, bio, company, job_title, skills,
            department, graduation_year, interests, linkedin_url, phone, location,
            is_open_to_mentor } = req.body;

    // Update user record
    if (full_name || institution || avatar_url) {
      const userUpdate = {};
      if (full_name) userUpdate.full_name = full_name;
      if (institution) userUpdate.institution = institution;
      if (avatar_url) userUpdate.avatar_url = avatar_url;

      await supabaseAdmin
        .from('users')
        .update(userUpdate)
        .eq('id', req.user.id);
    }

    // Update profile
    const profileUpdate = {};
    if (bio !== undefined) profileUpdate.bio = bio;
    if (company !== undefined) profileUpdate.company = company;
    if (job_title !== undefined) profileUpdate.job_title = job_title;
    if (skills !== undefined) profileUpdate.skills = skills;
    if (department !== undefined) profileUpdate.department = department;
    if (graduation_year !== undefined) profileUpdate.graduation_year = graduation_year;
    if (interests !== undefined) profileUpdate.interests = interests;
    if (linkedin_url !== undefined) profileUpdate.linkedin_url = linkedin_url;
    if (phone !== undefined) profileUpdate.phone = phone;
    if (location !== undefined) profileUpdate.location = location;
    if (is_open_to_mentor !== undefined) profileUpdate.is_open_to_mentor = is_open_to_mentor;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(profileUpdate)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Profile updated successfully', profile: data });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
