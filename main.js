const content = document.querySelector(".content")
const form = document.querySelector(".form")
const inputText = document.querySelector(".input_text")
const clock = document.querySelector(".clock h1")
const modalWarning = document.querySelector(".modal_warning")

const delYes = document.querySelector(".delYes")
const delNo = document.querySelector(".delNo")
const modalDelete = document.querySelector(".modal_delete")
const tottalCounter = document.querySelector(".tottal_counter")

setInterval(()=>{
    let time = new Date()
    let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    let second = time.getSeconds().toString().padStart(2,"0")

    clock.innerHTML = `${time.getHours()}:${minute}:${second}`
},1000)

let data = []
let colors = ["violet", "#175997", "#17976c", "#f35f24", "#3924f3"]

function colorRandom(){
    let num = Math.floor(Math.random() * colors.length)
    return colors[num]
}

let uId = 0

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let inputValue = inputText.value.trim()

    if(!inputValue){
        modal("danger", "Birornima yozing")
        return;
    }
    let time = new Date()

    uId++

    data.push({
        id: uId,
        text: inputValue,
        time: `${time.getHours()}:${time.getMinutes()}`,
        bg: colorRandom()
    })
    modal("info", "Qo'shildi")
    tottalCounter.innerHTML = data.length
    rocket()
    content.innerHTML = ""
    addText(data)
    inputText.value = ""

    console.log(data);
})

let itemId

function addText(malumotlar){
    [...malumotlar].reverse().forEach( blog => {
        let content_item = document.createElement("div")
        let content_image = document.createElement("div")
        let content_text = document.createElement("div")
        let content_controller = document.createElement("div")
        let content_time = document.createElement("div")
        let close = document.createElement("i")
        let edit = document.createElement("i")

        content_item.className = "content_item"
        content_image.className = "content_image"
        content_text.className = "content_text"
        content_controller.className = "content_controller"
        content_time.className = "content_time"


        close.className = "fa-solid fa-trash-can" 
        edit.className = "fa-solid fa-pen-to-square"

        edit.addEventListener("click", ()=>{
            if(content_text.classList.contains("contentEdit")){
                content_text.classList.remove("contentEdit")
                content_text.setAttribute("contenteditable", false)
                modal("info", "O'zgartirildi")
            }else{
                content_text.classList.add("contentEdit")
                content_text.setAttribute("contenteditable", true)
            }
        })

        close.addEventListener("click", ()=>{
            modalDelete.style.display = "flex"
            itemId = blog.id
        })


        content_time.innerHTML = blog.time

        content_text.innerHTML = blog.text

        content_image.style.background = blog.bg
        content_image.innerHTML = `<p>${blog.text.slice(0,1)}</p>`
        
        content_controller.appendChild(edit)
        content_controller.appendChild(close)
        content_item.appendChild(content_image)
        content_item.appendChild(content_text)
        content_item.appendChild(content_controller)
        content_item.appendChild(content_time)

        content.appendChild(content_item)
    })
}




delNo.addEventListener("click", ()=>{
    modalDelete.style.display = "none"  
})

delYes.addEventListener("click", ()=>{
    let itemIndex = data.findIndex(i=> i.id === itemId)
    data.splice(itemIndex, 1)
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
    addText(data)
    modalDelete.style.display = "none" 
    modal("danger", "O'chirildi") 
})


function modal( clas, matn ){
    let div = document.createElement("div")
    let text = document.createElement("p")

    div.className = `modal_item ${clas}`
    text.innerHTML = matn

    div.appendChild(text)
    modalWarning.appendChild(div)
    setTimeout(()=>{
        div.remove()
    }, 2000)
}

function rocket(){
    let div = document.createElement("div")

    div.className = `rocket`
    div.innerHTML = ` <i class="fa-solid fa-paper-plane"></i>`

    form.appendChild(div)
    setTimeout(()=>{
        div.remove()
    }, 1500)
}



const theme = document.querySelector(".theme")

theme.addEventListener("click", (e)=>{
    let typeOfTheme = e.target.value

    if(typeOfTheme === "dark"){
        document.body.classList.add("dark_theme")
    }else if(typeOfTheme === "light"){
        document.body.classList.remove("dark_theme")
    }

})


