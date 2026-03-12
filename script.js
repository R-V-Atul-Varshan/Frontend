const API = "https://r-wsuj.onrender.com";   // change to Render URL after deploy

let user = "";
let currentImage = "";


/* SIGNUP */

function signup(){

const username = document.getElementById("su_user").value;
const password = document.getElementById("su_pass").value;

fetch(API + "/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:username,
password:password
})
})
.then(res=>res.json())
.then(data=>{
alert("Signup Successful");
});

}



/* LOGIN */

function login(){

user = document.getElementById("li_user").value;
const password = document.getElementById("li_pass").value;

fetch(API + "/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:user,
password:password
})
})
.then(res=>res.json())
.then(data=>{

if(data.status === "success"){

document.getElementById("auth").style.display="none";
document.getElementById("app").style.display="block";

loadHistory();

}
else{

alert("Login Failed");

}

});

}



/* IMAGE UPLOAD */

function upload(){

const file = document.getElementById("image").files[0];

let form = new FormData();

form.append("image",file);
form.append("username",user);

fetch(API + "/upload",{
method:"POST",
body:form
})
.then(res=>res.json())
.then(data=>{

currentImage = data.image;

document.getElementById("result").src =
API + "/download/" + currentImage;

loadHistory();

});

}



/* DOWNLOAD IMAGE */

function download(){

window.open(API + "/download/" + currentImage);

}



/* LOAD DOWNLOAD HISTORY */

function loadHistory(){

fetch(API + "/history/" + user)
.then(res=>res.json())
.then(data=>{

let history = document.getElementById("history");

history.innerHTML="";

data.forEach(img=>{

let li = document.createElement("li");

let link = document.createElement("a");

link.href = API + "/download/" + img;
link.innerText = img;

li.appendChild(link);

history.appendChild(li);

});

});

}
