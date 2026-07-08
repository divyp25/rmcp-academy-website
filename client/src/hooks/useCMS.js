import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../assets/constant';

export const useCMS = (pageId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/cms/pages/${pageId}`);
        setData(res.data.data); // data column is JSONB
      } catch (err) {
        console.error(`Error fetching CMS data for page ${pageId}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchPageData();
    }
  }, [pageId]);

  return { data, loading, error };
};
