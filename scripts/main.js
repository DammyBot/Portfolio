// Hamburger Menu
const navigation = document.querySelector("#navigation");
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", ()=>{
    navigation.classList.toggle("open");
    document.querySelector("main").classList.toggle("open");
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
const projectcontent = document.querySelector(".project-content");
projects.forEach(project=>{
    project.addEventListener("click", (event)=>{
        event.preventDefault();
        projectcontent.scrollIntoView();
        // navigation.classList.toggle("open");
    })
})
const contacts = document.querySelectorAll(".contact-me");
const contact_details = document.querySelector(".contact");
contacts.forEach(contact => {
    contact.addEventListener("click", (event)=>{
        event.preventDefault();
        contact_details.scrollIntoView();
    })
})
const skill = document.querySelector(".skill");
skill.addEventListener("click", (event)=> {
    event.preventDefault();
    document.querySelector(".skills-content").scrollIntoView();
})


//Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            bodytop.classList.add("show");
        }else{
            bodytop.classList.remove("show");
        }
    })
}, {
    threshold: .5,
})
observer.observe(contact_details);


// Toggle activation based on categories;
const web = document.getElementById("web");
const video = document.getElementById("video");
const game = document.getElementById("game");

// Load data from projects json file
const url = "./scripts/projects.json";
const content = document.querySelector(".content");
const modal = document.querySelector("dialog");
async function loadData(url) {
    const data = await fetch(url);
    if(data.ok){
        const result = await data.json();
        displayData(result);
        // web.addEventListener("click", dataDisplay(data, "Website"));
    }
}
function displayData(data) {
    data.forEach(datum => {
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
        link.textContent = `Link to ${datum.name}`;
        link.href = datum.link;
        link.target = "_blank";

        div.append(name, img, button);
        content.appendChild(div);

        button.addEventListener("click", ()=>{
            modal.innerHTML = "";
            const name1 = name.cloneNode(true);
            modal.append(name1, description, link, close);
            modal.showModal();
            document.body.style.overflow = "hidden";
            // document.onkeydown("escape" , ()=>{
            //     document.body.style.overflow = "auto";
            // })
            close.addEventListener("click", ()=>{
                modal.close();
                document.body.style.overflow = "auto";
            })
        })
    });
}
function displayBasedonCategory(data, category){
    content.innerHTML = "";
    data.forEach(datum=>{
        if(datum[category] === "Website"){
        displayData(data);
        console.log("Website");
        }
    })
}
loadData(url);


//Load data from skills json file
const skillbody = document.querySelector(".skills-body");
const skillURL = './scripts/skills.json';
async function loadSkills(url) {
    const result = await fetch(url);
    if (result.ok) {
        const data = await result.json();
        displaySkills(data);
    }
}

function displaySkills(data) {
    data.forEach(datum => {
        showData(datum, "programming");
        showData(datum, "game_dev");
        showData(datum, "systems_software");
        showData(datum, "motion_graphics");
    }) 
}

function showData(data, data_item) {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const details = document.createElement("p");

    if(data_item === "programming") {
        title.textContent = "Programming";
        details.textContent = `${data[data_item].languages}, ${data[data_item].frontend}, ${data[data_item].version_control}`;

    }else if (data_item === "game_dev"){
        title.textContent = "Game Development";
        details.textContent = `${data[data_item].engine}, ${data[data_item].programming}, ${data[data_item].ai_in_games}, ${data[data_item].modeling}`

    }else if (data_item === "systems_software"){
        title.textContent = "Systems software";
        details.textContent = `${data[data_item].operating_systems}, ${data[data_item].concurrency_multithreading}, ${data[data_item].software_design}`;

    }else if (data_item === "motion_graphics"){
        title.textContent = "Motion Graphics"
        details.textContent = `${data[data_item].software}, ${data[data_item].motion_graphics}, ${data[data_item].video_editing}`;
        
    }

    div.append(title,details);
    skillbody.append(div);
}

loadSkills(skillURL);