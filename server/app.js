import { createClient } from '@supabase/supabase-js'
import './loadEnv.js'

// process.env.KEY

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL
const SUPABASE_ANON_PUBLIC_KEY = process.env.SUPABASE_ANON_PUBLIC_KEY

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_PUBLIC_KEY, {auth: {persistSession: false}})

// check if we can connect to supabase
async function testConnection() {
    let { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    console.log(error)
    console.log(projects)
    
}

testConnection()

/*
let { data: projects, error } = async function() { await supabase
  .from('projects')
  .select('*')
}()
console.log(JSON.stringify(projects))
*/