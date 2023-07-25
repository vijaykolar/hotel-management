import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mnvndfloczahgpsauyvj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udm5kZmxvY3phaGdwc2F1eXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMTM2MjQsImV4cCI6MjAwNTc4OTYyNH0.W731PAClsLigaz8KXFYlZLY79kSRygkGkBPn_F5upfg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;