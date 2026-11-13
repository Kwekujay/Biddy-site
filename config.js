// BIDDY site settings. Only PUBLIC values go in this file.
// NEVER put a secret key (starts with sk_) or the Supabase service_role key here.
window.BIDDY_CONFIG = {
  supabaseUrl: 'https://qzrxclwnoguperoapsxp.supabase.co',   // check this matches your Project URL in Supabase
  supabaseAnonKey: 'PASTE_YOUR_PUBLIC_ANON_KEY_HERE',          // Supabase > Project Settings > API Keys > anon / publishable key
  allowIndexing: false,   // change to true on launch day so Google can list the site
  previewAdmin: false     // staging demo only. Keep false on the live site.
};
