const API = "https://r-v-atul-varshan.onrender.com"

let currentUser = ""


function signup(){

fetch(API+"/signup",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:username.value,

password:password.value

})

})

.then(res=>res.json())

.then(data=>alert(data.msg))

}



function login(){

fetch(API+"/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:username.value,

password:password.value

})

})

.then(res=>res.json())

.then(data=>{

alert(data.msg)

currentUser=username.value

})

}



function upload(){

let file=image.files[0]

let form=new FormData()

form.append("image",file)

form.append("username",currentUser)

fetch(API+"/upload",{

method:"POST",

body:form

})

.then(res=>res.blob())

.then(blob=>{

let url=URL.createObjectURL(blob)

result.innerHTML=`<img src="${url}">`

})

}



function loadHistory(){

fetch(API+"/history/"+currentUser)

.then(res=>res.json())

.then(data=>{

history.innerHTML=""

data.forEach(i=>{

let img=document.createElement("img")

img.src=API+"/"+i

history.appendChild(img)

})

})

}
