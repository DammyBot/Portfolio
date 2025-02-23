// Hamburger Menu
const navigation = document.querySelector("#navigation");
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", ()=>{
    navigation.classList.toggle("open");
})


//Event listeners and scrolls
const bodytop = document.getElementById("back-to-top");
const home = document.querySelectorAll(".home");
bodytop.addEventListener("click", ()=>{
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})
home.forEach(house=>{
    house.addEventListener("click", (event)=>{
        event.preventDefault();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    })
})
const projects = document.querySelectorAll(".projects");
projects.forEach(project=>{
    project.addEventListener("click", (event)=>{
        event.preventDefault();
        document.querySelector(".project-content").scrollIntoView();
    })
})
const contacts = document.querySelectorAll(".contact-me");
contacts.forEach(contact => {
    contact.addEventListener("click", (event)=>{
        event.preventDefault();
        document.querySelector(".contact").scrollIntoView();
    })
})
const skill = document.querySelector(".skill");
skill.addEventListener("click", (event)=> {
    event.preventDefault();
    document.querySelector(".skills-content").scrollIntoView();
})


// Load data from projects json file
const url = "./scripts/projects.json";
const content = document.querySelector(".content");
const modal = document.querySelector("dialog");
async function loadData(url) {
    const data = await fetch(url);
    if(data.ok){
        const result = await data.json();
        // console.log(result);
        displayData(result);
    }
}
function displayData(datum) {
    datum.forEach(datum => {
        const div = document.createElement("div");
        const name = document.createElement("h3");
        const img = document.createElement("img");
        const description = document.createElement("p");
        const button = document.createElement("button");
        const close = document.createElement("button");
        const link = document.createElement("a");

        name.textContent = datum.name;
        description.textContent = datum.description;
        img.src = datum.image;
        img.alt = `Image of ${datum.name}`;
        img.loading = "lazy";
        button.textContent = "Check Details";
        close.textContent = "Close";
        link.textContent = `Website to ${datum.name}`;
        link.href = datum.link;
        link.target = "_blank";

        div.append(name, img, button);
        content.appendChild(div);

        button.addEventListener("click", ()=>{
            modal.innerHTML = "";
            const name1 = name.cloneNode(true);
            modal.append(name1, description, link, close);
            modal.showModal();
            close.addEventListener("click", ()=>{
                modal.close();
            })
        })
    });
}
loadData(url);


//Load data from skills json file
const skillURL = './scripts/skills.json';
async function loadSkills(url) {
    const result = await fetch(url);
    if (result.ok) {
        const data = await result.json();
        console.log(data);
    }
}
loadSkills(skillURL);