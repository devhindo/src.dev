import { createClient } from '@supabase/supabase-js'
import './loadEnv.js'


const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL
console.log(SUPABASE_PROJECT_URL)
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

// client action

import express from 'express'
const app = express()
const port = 3000

import bodyParser from 'body-parser';
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
// Middleware to reset the 'data' variable when the page is refreshed

app.get("/", (req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.render('index.ejs', {url: ""});
  //res.sendFile(path.join(__dirname, "client/index.ejs"));
  //res.sendFile(path.join(__dirname, "client/css/style.css"));
  //res.sendFile(path.join(__dirname, "client/js/script.js"));


});

app.post("/", (req, res) => {
  const project = req.body.project;

  const url = "https://www.google.com/search?q=" + project;
  res.render('index.ejs', {url: url});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})