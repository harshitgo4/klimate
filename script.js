const tempfield=document.querySelector(".weather1");
const locafield=document.querySelector(".weather2 p");
const timefield=document.querySelector(".weather2 span");
const cond_field=document.querySelector(".weather3 span");
const icon_field=document.querySelector(".weather3 img");
const cont=document.querySelector(".container");
const input=document.querySelector("#location");
const btn=document.querySelector("#btn");
let target="london";
//console.log(input.value);
const setloc=(event)=>{
    event.preventDefault();
    target=input.value;
    console.log(input.value);
     const p=document.querySelector(".error")
    if(p)
     p.remove();
    loaddata();
}
btn.addEventListener("click",setloc)

const loaddata= async ()=>{
    try{
        const url=`https://api.weatherapi.com/v1/current.json?key=218fdb4eecbd44c2b0d93227231507&q=${target}`;
        const response = await fetch(url);
       
        const data=await response.json();
        console.log(data);
        const {
            current :{temp_c,
            condition:{text,icon}},
            location:{name,localtime}
        }=data;
        UpdateData(temp_c,text,icon,name,localtime);
    }
    catch{
        const p=document.createElement('p');
        p.innerText="Check the Location or The connection";
        p.setAttribute("class","error")
        cont.append(p);
    }
}

const UpdateData=(temp_c,text,icon,name,localtime)=>
{
    tempfield.innerHTML=`${temp_c}°`;
    locafield.innerText=name;
    icon_field.src=icon;
    cond_field.innerText=text;
    const date=localtime.split(" ")[0];
    const time=localtime.split(" ")[1];
    console.log(date);
    console.log(time);
    const day=new Date(date).getDay();
    const D=getday(day);
    timefield.innerText=`${time} ${D} ${date}`;
}

const getday=(day)=>
{
    switch(day)
    {
        case 0:
            return "sunday";
            case 1:
            return "Monday";
            case 2:
            return "Tuesday";
            case 3:
            return "Wednesday";
            case 4:
            return "Thursday";
            case 5:
            return "Friday";
            case 6:
            return "Saturday";  
    }
}
loaddata();