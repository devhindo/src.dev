const createClient = require('@supabase/supabase-js').createClient
const dotenv = require('dotenv');

dotenv.config({path: '../.env'})
// process.env.KEY

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL
const SUPABASE_ANON_PUBLIC_KEY = process.env.SUPABASE_ANON_PUBLIC_KEY

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_PUBLIC_KEY)

