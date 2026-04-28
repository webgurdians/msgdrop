import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Database routes will fail.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CONTACTS ---
router.get('/contacts', async (req, res) => {
  const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  
  // Map snake_case from DB to camelCase for frontend
  const formatted = data.map(c => ({
    id: c.id, name: c.name, phone: c.phone, type: c.type, tag: c.tag,
    status: c.status, lastVisit: c.last_visit, visits: c.visits_count, avatar: c.avatar, color: c.color
  }));
  res.json(formatted);
});

router.post('/contacts', async (req, res) => {
  const { name, phone, type, tag, status, lastVisit, visits, avatar, color } = req.body;
  const { data, error } = await supabase.from('contacts').insert([{
    name, phone, type, tag, status: status || 'new', last_visit: lastVisit || 'Today',
    visits_count: visits || 0, avatar, color
  }]).select().single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data.id, ...req.body });
});

router.delete('/contacts/:id', async (req, res) => {
  const { error } = await supabase.from('contacts').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// --- CAMPAIGNS ---
router.get('/campaigns', async (req, res) => {
  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  
  const formatted = data.map(c => ({
    id: c.id, name: c.name, type: c.type, icon: c.icon, color: c.color, status: c.status,
    sent: c.sent_count, opened: c.opened_count, replied: c.replied_count,
    trigger: c.trigger_date, template: c.template, segment: c.segment
  }));
  res.json(formatted);
});

router.post('/campaigns', async (req, res) => {
  const { name, type, icon, color, status, sent, opened, replied, trigger, template, segment } = req.body;
  const { data, error } = await supabase.from('campaigns').insert([{
    name, type, icon, color, status: status || 'live', sent_count: sent || 0,
    opened_count: opened || 0, replied_count: replied || 0, trigger_date: trigger,
    template, segment
  }]).select().single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data.id, ...req.body });
});

router.put('/campaigns/:id', async (req, res) => {
  const { status, name, type, trigger, template, segment } = req.body;
  const updates: any = {};
  if (status !== undefined) updates.status = status;
  if (name !== undefined) updates.name = name;
  if (type !== undefined) updates.type = type;
  if (trigger !== undefined) updates.trigger_date = trigger;
  if (template !== undefined) updates.template = template;
  if (segment !== undefined) updates.segment = segment;

  const { error } = await supabase.from('campaigns').update(updates).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

router.delete('/campaigns/:id', async (req, res) => {
  const { error } = await supabase.from('campaigns').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// --- AI CONFIG ---
router.get('/config', async (req, res) => {
  const { data, error } = await supabase.from('ai_config').select('*').eq('id', 1).single();
  if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message }); // PGRST116 is 0 rows
  
  if (!data) {
    res.json({ businessContext: "", tone: "Friendly", businessHours: "", enabled: true });
  } else {
    res.json({
      businessContext: data.business_context,
      tone: data.tone,
      businessHours: data.business_hours,
      enabled: data.enabled
    });
  }
});

router.post('/config', async (req, res) => {
  const { businessContext, tone, businessHours, enabled } = req.body;
  const { error } = await supabase.from('ai_config').upsert({
    id: 1, // Singleton row
    business_context: businessContext,
    tone: tone,
    business_hours: businessHours,
    enabled: enabled,
    updated_at: new Date()
  });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
