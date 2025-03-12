// Import Supabase from CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm'


// Set up Supabase client
const SUPABASE_URL = "https://qtfarqhcvjdkxiryqlmw.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZmFycWhjdmpka3hpcnlxbG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODY2NTMsImV4cCI6MjA1NjU2MjY1M30.Xlcdo56vYswWNsiGVsFUbjOfNdyPSZsUm2ZqUXntuOc"

// Create and export Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


supabase
  .from('users')
  .select('*')
  .then(response => console.log(response))
  .catch(error => console.error('Supabase test error:', error));
