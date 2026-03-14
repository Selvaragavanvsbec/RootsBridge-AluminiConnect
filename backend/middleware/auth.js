const { supabase } = require('../supabase/client');

/**
 * Authentication middleware
 * Verifies the JWT token from the Authorization header
 * and attaches the user to req.user
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

/**
 * Role-based access control middleware
 * @param  {...string} roles - Allowed roles
 */
function requireRole(...roles) {
  return async (req, res, next) => {
    try {
      const { supabaseAdmin } = require('../supabase/client');
      
      const { data: userData, error } = await supabaseAdmin
        .from('users')
        .select('role')
        .eq('id', req.user.id)
        .single();

      if (error || !userData) {
        return res.status(403).json({ error: 'User profile not found' });
      }

      if (!roles.includes(userData.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      req.userRole = userData.role;
      next();
    } catch (err) {
      console.error('Role check error:', err);
      res.status(500).json({ error: 'Authorization failed' });
    }
  };
}

module.exports = { authMiddleware, requireRole };
