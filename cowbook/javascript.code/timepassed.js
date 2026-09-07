export function p_t(doi){
var current_t=new Date().toISOString().split('T')[0];
console.log(doi);
var y_m_d=doi.split("-")
console.log(y_m_d);
var c_y_m_d=current_t.split("-")
var month
var days
var adddays

const one=[1,3,5,7,8,10,12]
const zero=[4,6,9,11]
const doimonth=Number(y_m_d[1])
const doiyear=Number(y_m_d[0])
const doiday=Number(y_m_d[2])
const c_day=Number(c_y_m_d[2])
const c_month=Number(c_y_m_d[1])
const c_year=Number(c_y_m_d[0])

if (one.includes(doimonth)){
    adddays=31
}
else if (zero.includes(doimonth)){
    adddays=30
}
else {
    if (doiyear%4==0 && doiyear%100!=0 || doiyear%400==0){
        adddays=29
    }
    else{
        adddays=28
    }
}
if (c_month>=doimonth){
    month=c_month-doimonth
}
else{
    month=c_month+12-doimonth
}
if(c_day>=doiday){
    days=c_day-doiday
}
else{
    days=c_day+adddays-doiday
    month--
}
return [month,days]}
