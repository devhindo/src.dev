import { createClient } from '@supabase/supabase-js'
import './loadEnv.js'

// process.env.KEY

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL
const SUPABASE_ANON_PUBLIC_KEY = process.env.SUPABASE_ANON_PUBLIC_KEY
const SERVICE_ROLE_SECRET_API_KEY = process.env.SERVICE_ROLE_SECRET_API_KEY

const supabase = createClient(SUPABASE_PROJECT_URL, SERVICE_ROLE_SECRET_API_KEY, {auth: {persistSession: false}})


let { data: projects, error } = await supabase
  .from('projects')
  .select('name,url')

  if (error) {
    console.error(error)
  } else {
    console.log(projects)
  }

  const project = {
    name: 'My Project',
    description: 'This is my project.'
  }
  
  await supabase.from('projects').insert(project)

  const projectId = 1 // The ID of the project
const rows = [
  {
    name: 'Row 1',
    description: 'This is row 1.'
  },
  {
    name: 'Row 2',
    description: 'This is row 2.'
  }
]

await supabase.from('projects').update(projectId, { rows })