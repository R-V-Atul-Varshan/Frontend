const API="https://r-v-atul-varshan.onrender.com"


function showSignup(){

document.getElementById("loginBox").classList.add("hidden")
document.getElementById("signupBox").classList.remove("hidden")

}

function showLogin(){

document.getElementById("signupBox").classList.add("hidden")
document.getElementById("loginBox").classList.remove("hidden")

}


async function signup(){

let username=document.getElementById("username").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

await fetch(API+"/signup",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({username,email,password})

})

alert("Account created")

showLogin()

}


async function login(){

let email=document.getElementById("loginEmail").value
let password=document.getElementById("loginPassword").value

let res=await fetch(API+"/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,password})

})

let data=await res.json()

localStorage.setItem("user_id",data.user_id)

document.getElementById("loginBox").classList.add("hidden")

document.getElementById("dashboard").classList.remove("hidden")

loadHistory()

}


async function uploadImage(){

let file=document.getElementById("image").files[0]

let form=new FormData()

form.append("image",file)

form.append("user_id",localStorage.getItem("user_id"))

await fetch(API+"/upload",{method:"POST",body:form})

alert("Image processed")

loadHistory()

}


async function loadHistory(){

let user=localStorage.getItem("user_id")

let res=await fetch(API+"/history/"+user)

let data=await res.json()

let list=document.getElementById("history")

list.innerHTML=""

data.forEach(img=>{

let li=document.createElement("li")

li.innerHTML=`<a href="${API}/download/${img}" download>${img}</a>`

list.appendChild(li)

})

}


function logout(){

localStorage.removeItem("user_id")

location.reload()

}
