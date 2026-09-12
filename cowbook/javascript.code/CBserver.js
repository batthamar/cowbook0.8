import express from "express";
import { p_t } from './timepassed.js';
import axios from "axios";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "cowbook",
  password: "",
  port: 5432,
});

db.connect();

const port =3000;
const app =express();
const __dirname="C:/Users/guest pc/OneDrive/Desktop/cowbook/cowbook";
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.render(__dirname+"/html.code/index.ejs");
});
app.get("/about",(req,res)=>{
    res.render(__dirname+"/html.code/CBabout.ejs");
});
app.get("/ask",(req,res)=>{
    res.render(__dirname+"/html.code/CBask.ejs",{answer:""});
});
app.post("/ask",async(req,res)=>{
    const question=req.body.question;
    const payload = {
    contents: [
      {
        parts: [
          { text: question }
        ]
      }
    ]
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try{
    const answer= await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=",payload,config);
    res.render(__dirname+"/html.code/CBask.ejs",{answer:answer.data.candidates[0].content.parts[0].text});}
  catch(error){
    if (error.response){
      res.render(__dirname+"/html.code/CBask.ejs",{answer:JSON.stringify(error.response.data,null,2)});
    }
    else {
      res.render(__dirname+"/html.code/CBask.ejs",{answer:error.message});
    }

    }
   
});
app.get("/profile",async(req,res)=>{ 
    const data= await db.query("SELECT COUNT(*) FROM farm_data;");
    const no_of_animals=data.rows[0].count;
    res.render(__dirname+"/html.code/CBprofile.ejs",{no_of_animals});
});
app.get("/addcow",(req,res)=>{
    res.render(__dirname+"/html.code/CBaddcow.ejs");
});
app.post("/search",async(req,res)=>{
  const data=await db.query("SELECT * FROM farm_data WHERE id=$1",[req.body.serial_no]);
  if (data.rows[0]){
    const searched=data.rows[0];
    const DOB=searched.dob;
    const serial_no=searched.id;
    const no_of_lactation=searched.lactations;
    const doi=searched.doi;
    const inseminated = searched.inseminated;
    if (inseminated=='yes'){
    p_t(doi);
    const m_d=p_t(doi);
    const month=m_d[0];
    const days=m_d[1];
    return res.render(__dirname+"/html.code/CBsearch.ejs",{DOB,serial_no,no_of_lactation,inseminated,doi,days,month});
    }
    else{
    const month="";
    const days="";
    return res.render(__dirname+"/html.code/CBsearch.ejs",{DOB,serial_no,no_of_lactation,inseminated,doi,days,month});
    }
  }
  else{
    return res.render(__dirname+"/html.code/index.ejs",{error:"No cow exist for this Serial number"});
  }
});

app.post("/submit",async(req,res)=>{
         const dob=req.body.DOB;
         const serial_no=req.body.serial_no;
         const no_of_lactation=req.body.no_of_lactation;
         const inseminated=req.body.inseminated;
         const doi=req.body.DOI;

        //  p_t(doi);
        //  const m_d=p_t(doi);
        //  const month=m_d[0];
        //  const days=m_d[1];
         if (inseminated=='yes'){
          await db.query("INSERT INTO farm_data VALUES ($1,$2,$3,$4,$5)",[serial_no,dob,no_of_lactation,inseminated,doi]);
         }
         else{
          await db.query("INSERT INTO farm_data (id,dob,lactations,inseminated) VALUES ($1,$2,$3,$4)",[serial_no,dob,no_of_lactation,inseminated])
         }
               //  res.render(__dirname+"/html.code/CBsubmit.ejs",{DOB,serial_no,no_of_lactation,inseminated,doi,days,month});});
      res.redirect("/");
});
app.get("/allcows",async(req,res)=>{
  const data = (await db.query("SELECT * FROM farm_data;")).rows;
  res.render(__dirname+"/html.code/CBallcows.ejs",{data});
});
app.post("/update",async(req,res)=>{
  const id =req.body.id;
  const dob =req.body.dob;
  const lactations =req.body.lactations;
  const inseminated=req.body.inseminated;
  const doi=req.body.doi;
  console.log(id,dob,lactations,inseminated,doi)
  res.render(__dirname+"/html.code/CBupdate.ejs",{id,dob,lactations,inseminated,doi});
});
app.post("/submitupdate",async(req,res)=>{
         const dob=req.body.DOB;
         const serial_no=req.body.serial_no;
         const no_of_lactation=req.body.no_of_lactation;
         const inseminated=req.body.inseminated;
         const doi=req.body.DOI;
          await db.query("UPDATE farm_data SET  dob=$1, lactations=$2, inseminated=$3, doi=$4  WHERE id = $5",[dob,no_of_lactation,inseminated,doi,serial_no]);
                   res.redirect("/");
});
app.listen(port,()=>{
    console.log("working");
});
