import { createClient } from "@supabase/supabase-js";
import express from "express";
import "./loadEnv.js";

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;
const SUPABASE_ANON_PUBLIC_KEY = process.env.SUPABASE_ANON_PUBLIC_KEY;
const SERVICE_ROLE_SECRET_API_KEY = process.env.SERVICE_ROLE_SECRET_API_KEY;

const supabase = createClient(
  SUPABASE_PROJECT_URL,
  SERVICE_ROLE_SECRET_API_KEY,
  { auth: { persistSession: false } }
);

/*
let { data: projects, error } = await supabase
  .from('projects')
  .select('name,url')

  if (error) {
    console.error(error)
  } else {
    console.log(projects)
  }
*/

// get from supabase the url for the project name
async function constructURL(name) {
  let { data: url, error } = await supabase
    .from("projects")
    .select("url")
    .eq("name", name);

  if (error) {
    return undefined;
  } else {
    return url;
  }
}
async function getURL(name) {
  let url = await constructURL(name);
  return url ? url[0].url : undefined;
}

async function addProject(name, url) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ name: name, url: url }])
    .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
}

// client action

const app = express();
const port = 3000;

import bodyParser from "body-parser";
app.set('views', './views');
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  
  let message = ""
  let url = ""
  res.render("index.ejs", { url: url, message: message });

});

app.post("/", async (req, res) => {
  const project = req.body.project;
  const newprojectname = req.body.newprojectname;
  const newprojecturl = req.body.newprojecturl;

  if (project) {
    try {
      const url = await getURL(project);
      if (url == undefined) {
        res.render("index.ejs", {
          url: "This project does not exist in the database",
        });
      }
      res.render("index.ejs", { url: url, message: "" });
    } catch (error) {
      console.log(error);
      res.render("index.ejs", { url: "project doesn't exist", message: "" });
    }
  } else if(newprojectname && newprojecturl) {
    await addProject(newprojectname, newprojecturl);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;