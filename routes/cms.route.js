import express from 'express';
import { pool } from '../utils/supabaseDb.js';

import authenticateAdmin from '../utils/authenticate.js';

const router = express.Router();

// GET all content (excluding archived)
router.get('/content', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cms_content WHERE status != 'archived' ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE content
router.post('/content', async (req, res) => {
  const { title, content, section } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cms_content (title, content, section) VALUES ($1, $2, $3) RETURNING *",
      [title, content, section]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE content
router.put('/content/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, section } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cms_content SET title = $1, content = $2, section = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [title, content, section, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ARCHIVE (Soft Delete) content
router.delete('/content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE cms_content SET status = 'archived', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET archives
router.get('/archives', async (req, res) => {
  try {
    const content = await pool.query("SELECT * FROM cms_content WHERE status = 'archived' ORDER BY updated_at DESC");
    const gallery = await pool.query("SELECT * FROM cms_gallery WHERE status = 'archived' ORDER BY created_at DESC");
    res.json({ content: content.rows, gallery: gallery.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RESTORE archived item
router.put('/archives/restore/content/:id', async (req, res) => {
  try {
    const result = await pool.query("UPDATE cms_content SET status = 'published' WHERE id = $1 RETURNING *", [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PAGE-WISE CMS ENDPOINTS ---

// GET all pages
router.get('/pages', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cms_pages ORDER BY page_name ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET specific page data
router.get('/pages/:id', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cms_pages WHERE page_id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Page not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE specific page data
router.put('/pages/:id', async (req, res) => {
  const { data } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cms_pages SET data = $1, updated_at = CURRENT_TIMESTAMP WHERE page_id = $2 RETURNING *",
      [data, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SUBMIT Chatbot feedback (Public)
router.post('/chatbot/feedback', async (req, res) => {
  const { rating, suggestions, chatHistory } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO chatbot_feedback (rating, suggestions, chat_history) VALUES ($1, $2, $3) RETURNING *",
      [rating, suggestions, JSON.stringify(chatHistory || [])]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all Chatbot feedback (Admin only)
router.get('/chatbot/feedback', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM chatbot_feedback ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
