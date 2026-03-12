const API = "https://r-wsuj.onrender.com";

let user = "";
let currentImage = "";

/* ---------------- SIGNUP ---------------- */

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
alert(data.message);
})
.catch(err=>{
alert("Signup error");
console.log(err);
});

}

/* ---------------- LOGIN ---------------- */

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

if(data.message === "Login success"){

document.getElementById("auth").style.display="none";
document.getElementById("app").style.display="block";

loadHistory();

}
else{

alert("Login Failed");

}

})
.catch(err=>{
alert("Login error");
console.log(err);
});

}

/* ---------------- IMAGE UPLOAD ---------------- */

function upload(){

const file = document.getElementById("image").files[0];

if(!file){
alert("Please select an image");
return;
}

let form = new FormData();

form.append("image",file);
form.append("username",user);

fetch(API + "/upload",{
method:"POST",
body:form
})
.then(res=>res.json())
.then(data=>{

currentImage = data.download.split("/").pop();

document.getElementById("result").src =
API + "/download/" + currentImage;

loadHistory();

})
.catch(err=>{
alert("Upload failed");
console.log(err);
});

}

/* ---------------- DOWNLOAD IMAGE ---------------- */

function download(){

if(currentImage){
window.open(API + "/download/" + currentImage);
}
else{
alert("No image available");
}

}

/* ---------------- LOAD HISTORY ---------------- */

function loadHistory(){

fetch(API + "/history/" + user)
.then(res=>res.json())
.then(data=>{

let history = document.getElementById("history");

history.innerHTML = "";

data.forEach(item => {

let li = document.createElement("li");

let link = document.createElement("a");

link.href = API + item.download;
link.innerText = item.output + " (" + item.date + ")";

li.appendChild(link);

history.appendChild(li);

});

})
.catch(err=>{
console.log(err);
});

}

