document.addEventListener("DOMContentLoaded", function() {

    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");
    const inseminatedField = document.getElementById("inseminated");
    const dateSection = document.getElementById("showDOI");
    const doi = document.getElementById("DOI");

    // YES button pressed
    yesBtn.addEventListener("click", function () {
        inseminatedField.value = "yes";
        dateSection.style.display = "block";   // Show date input
        doi.required = true;             // Make date required
    });
    // NO button pressed
    noBtn.addEventListener("click", function () {
        inseminatedField.value = "no";
        dateSection.style.display = "none";    // Hide date input
        doi.required = false;            // Remove requirement
        doi.value = "";                  // Clear previous input
    });
});
// var current_t=new Date().toISOString().split('T')[0]
// var month
// var days
// var adddays
// const one=[1,3,5,7,8,10,12]
// const zero=[4,6,9,11]
// const doimonth=Number(doi.slice(-5,-3))
// const doiyear=Number(doi.slice(0,4))
// if (one.includes(doimonth)){
//     adddays=31
// }
// else if (zero.includes(doimonth)){
//     adddays=30
// }
// else {
//     if (doiyear%4==0 && doiyear%100!=0 || doiyear%400==0){
//         adddays=29
//     }
//     else{
//         adddays=28
//     }
// }
// if (Number(current_t.slice(-5,-3))>=doimonth){
//     month=Number(current_t.slice(-5,-3)-doi.slice(-5,-3))
// }
// else{
//     month=Number(current_t.slice(-5,-3))+12-doimonth
// }
// if(Number(current_t.slice(-2))>=Number(doi.slice(-2))){
//     days=Number(current_t.slice(-2))-Number(doi.slice(-2))
// }
// else{
//     days=Number(current_t.slice(-2))+adddays-Number(doi.slice(-2))
//     month--
// }


// import express from "express";
// import bodyparser from "body-parser";


// const port =3000;
// const app =express();
// const __dirname="C:/Users/guest pc/OneDrive/Desktop/cowbook/cowbook";
// app.use(express.static(__dirname));
// app.use(bodyparser.urlencoded({extended:true}));

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/html.code/CBaddcow.html");

// });

// app.post("/submit",(req,res)=>{

//          const DOB=req.body["DOB"];
//          const serial_no=req.body["serial_no"];
//          const no_of_lactation=req.body["no_of_lactation"];
//          const inseminated=req.body["inseminated"];
//          const DOI=req.body["DOI"]
//        res.render(__dirname+"/html.code/CBsubmit.ejs",{DOB,serial_no,no_of_lactation,inseminated,DOI});});
// app.listen(port,()=>{
//     console.log("working");
// });