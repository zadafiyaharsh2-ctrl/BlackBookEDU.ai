const User = require('../models/User');
const Plan = require('../models/Plan');

const TIER_RANK = { free: 0, basic: 1, premium: 2, institute: 3 };

async function getUserMaxTier(userId) {
  const user = await User.findById(userId).populate('plans').select('plans');
  if (!user || !user.plans || user.plans.length === 0) return 'free';
  let max = 'free';
  for (const plan of user.plans) {
    const t = (plan && plan.tier) || 'free';
    if (TIER_RANK[t] > TIER_RANK[max]) max = t;
  }
  return max;
}

function requirePaid(req, res, next) {
  requirePlanTier('basic')(req, res, next);
}

function requirePlanTier(minTier = 'premium') {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
      const tier = await getUserMaxTier(req.user.id);
      if (TIER_RANK[tier] < TIER_RANK[minTier]) {
        return res.status(402).json({ message: `Upgrade required: ${minTier}` });
      }
      next();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Subscription check failed' });
    }
  };
}

module.exports = { requirePaid, requirePlanTier, getUserMaxTier };