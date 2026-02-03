const para = document.querySelector('#para');
para.innerText = "This is updated paragraph text.";
para.style.color = 'blue';
console.log(para);

const para2 = document.querySelectorAll('.para2');
para2.forEach(p => p.innerText = "This is updated paragraph text for para2.");
para2[1].style.color = 'red';
console.log(para2);

const container = document.querySelector('#container');
container.innerHTML = "<h2>This is a new heading inside container</h2>";
console.log(container);

const toggleBtn = document.createElement('button');
toggleBtn.innerText = 'Toggle Dark Mode';
document.body.prepend(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const btn=document.querySelector("button");
btn.classList.add("btn")

function print(){
    console.log("Button clicked!")
}
btn.addEventListener("click",print);

const click=document.querySelector("#click ")
const stop=document.querySelector("#stop")

function message (){
    console.log("Button clicked ")
}

click.addEventListener('click',message)
stop.addEventListener('click',()=>{
    console.log("Stop button clicked!")
    click.removeEventListener('click',message)
})

const form=document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("Form submitted!")
})

div.addEventListener("click",()=>{console.log("Clicked the Dev")},f
div2

var a=678
let b=456

function print(){
    let c=69
    console.log(c)
    console.log("inside fn")
}
print()

function first(){
    second()
}

function second(){
    third()
}

function third(){
    console.trace()
}
first()