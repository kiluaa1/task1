let fForm = document.querySelector('#addForm')
const userHeads = ["userId", "userName", "age"]
let contentWrap=document.querySelector("#contentWrap")

// function to read from storage :
const readFromStorage = (key) => {
    
    let data
    try {
        data = JSON.parse(localStorage.getItem(key));
        if(!Array.isArray(data)) throw new Error("select right data ya hamosh");
    }
    catch(e){
        data =[];
    }
    return data
}

// function of write to storage :
const writeToStorage = (key,value) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value))
    }
    catch(e){
        localStorage.setItem(key,"[]")
    }   
}

// function to take form and push into local storage

if (fForm){
fForm.addEventListener("submit" , function(e) {
    e.preventDefault()
    const user = {status:"active"}
    userHeads.forEach( i => user[i] = fForm.elements[i].value)
    let allUsers=readFromStorage("users")
    allUsers.push(user)
    writeToStorage("users",allUsers)
    fForm.reset();
    window.location.href='index.html'
})}

// create element
// const createMyOwnElement = (parent , child , text , class)  => {}
const createMyOwnElement = (parent,ele,text,clas)  =>{
    const myEle=document.createElement(ele)
    if(text) myEle.textContent=text
    if(clas) myEle.classList=clas
    parent.appendChild(myEle)
    return myEle
}


// show all
const showAll = (data)=>{
    contentWrap.innerHTML=""
    if(data.length==0){
        const tr =createMyOwnElement(contentWrap,"tr",null,null)
        const td =createMyOwnElement(contentWrap,"td","no data yet","alert alert-danger")
        td.setAttribute("colspan", "5")
    }
    data.forEach( (user,i) => {
        const tr = createMyOwnElement(contentWrap,"tr",null,null)
        createMyOwnElement(tr,"td",user.userId,null)
        createMyOwnElement(tr,"td",user.userName,null)
        createMyOwnElement(tr,"td",user.status,null)
        createMyOwnElement(tr,"td",user.age,null)
        const td = createMyOwnElement(tr,"td",null,null)
        const showBtn = createMyOwnElement(td, "button", "show","btn btn-primary mx-3")
        const editBtn = createMyOwnElement(td, "button", "Edit","btn btn-warning mx-3")
        const delBtn = createMyOwnElement(td, "button", "Delete","btn btn-danger mx-3")
        const editStatus = createMyOwnElement(td, "button", "edit status","btn btn-dark mx-3")

        delBtn.addEventListener("click", (e)=>{
            data.splice(i,1)
            writeToStorage("users", data)
            showAll(data)
        })
        editStatus.addEventListener("click",()=>{
            if (user.status=="active"){
                user.status="inactive"
            }
            else{
                user.status="active"
            }
            writeToStorage("users", data)
            showAll(data)
        })
    })
}

if(contentWrap){
    let data = readFromStorage("users")
    showAll(data)
    
}