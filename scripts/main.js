// Hamburger Menu
const navigation = document.querySelector("#navigation");
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", ()=>{
    navigation.classList.toggle("open");
    document.querySelector("main").classList.toggle("open");
})

//Changing active link based on observer
const home1 = document.getElementById("home");
const projects1 = document.getElementById("projects");
const skill1 = document.getElementById("skill");
const contact1 = document.getElementById("contact-me")

const activeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            home1.classList.add("active");
        }else {
            home1.classList.remove("active");
        }
    })
}, {
    threshold: .5
})
const activeObserver1 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            projects1.classList.add("active");
        }else {
            projects1.classList.remove("active");
        }
    })
},{
    threshold: .5
})
const activeObserver2 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            skill1.classList.add("active");
        }else {
            skill1.classList.remove("active");
        }
    })
},{
    threshold: .5
})
const activeObserver3 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            contact1.classList.add("active");
        }else {
            contact1.classList.remove("active");
        }
    })
},{
    threshold: .5
})
activeObserver.observe(document.querySelector(".information"));
activeObserver1.observe(document.querySelector(".project-content"));
activeObserver2.observe(document.querySelector(".skills-content"));
activeObserver3.observe(document.querySelector(".contact-container"));

//Event listeners and scrolls
const bodytop = document.getElementById("back-to-top");
const home = document.querySelectorAll(".home");
bodytop.addEventListener("click", ()=>{
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    bodytop.classList.remove("show");
})
home.forEach(house=>{
    house.addEventListener("click", (event)=>{
        event.preventDefault();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        navigation.classList.remove("open");
        document.querySelector("main").classList.remove("open");
    })
})
const projects = document.querySelectorAll(".projects");
const projectcontent = document.querySelector(".project-content");
projects.forEach(project=>{
    project.addEventListener("click", (event)=>{
        event.preventDefault();
        projectcontent.scrollIntoView();
        navigation.classList.remove("open");
        document.querySelector("main").classList.remove("open");
    })
})
const contacts = document.querySelectorAll(".contact-me");
const contact_details = document.querySelector(".contact");
contacts.forEach(contact => {
    contact.addEventListener("click", (event)=>{
        event.preventDefault();
        contact_details.scrollIntoView();
        navigation.classList.remove("open");
        document.querySelector("main").classList.remove("open");
    })
})
const skills = document.querySelectorAll(".skill");
skills.forEach(skill=>{
    skill.addEventListener("click", (event)=> {
        event.preventDefault();
        document.querySelector(".skills-content").scrollIntoView();
        navigation.classList.remove("open");
        document.querySelector("main").classList.remove("open");
    })
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

const texts = document.querySelectorAll(".txt");
const btn = document.querySelectorAll(".btn");
const btn1 = document.querySelectorAll(".btn1");
const contact = document.querySelector(".div");
const textAnim = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
        // else{
        //     entry.target.classList.remove("show");
        // }
    })
})
textAnim.observe(contact);
texts.forEach(text=>{
    textAnim.observe(text);
})
btn.forEach(bt=>{
    textAnim.observe(bt);
})
btn1.forEach(bt=>{
    textAnim.observe(bt);
})

// Toggle activation based on categories;
const all = document.getElementById("all");
const web = document.getElementById("web");
const video = document.getElementById("video");
const game = document.getElementById("game");
let result = [];

// Load data from projects json file
const url = "./scripts/projects.json";
const content = document.querySelector(".content");
const modal = document.querySelector("dialog");
async function loadData(url) {
    const data = await fetch(url);
    if(data.ok){
        result = await data.json();
        displayData(result);
    }
}
function displayData(data) {
    data.forEach(datum => {
        const div = document.createElement("div");
        div.classList.add("pj");
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
        img.loading = "eager";
        button.textContent = "Check Details";
        close.textContent = "❌";
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
            close.addEventListener("click", ()=>{
                modal.classList.add("remove");
                modal.close();
                document.body.style.overflow = "auto";
            })
        })

        textAnim.observe(div);
    });
}

web.addEventListener("click", ()=>{
    web.classList.add("click");
    all.classList.remove("click");
    video.classList.remove("click");
    game.classList.remove("click");
    content.innerHTML = "";
    result.forEach(item=>{
        if(item.category == "Website"){
            displayInfo(item);
        }
    })
})
all.addEventListener("click", ()=>{
    web.classList.remove("click");
    all.classList.add("click");
    video.classList.remove("click");
    game.classList.remove("click");
    content.innerHTML = "";
    displayData(result);
})
video.addEventListener("click", ()=>{
    web.classList.remove("click");
    all.classList.remove("click");
    video.classList.add("click");
    game.classList.remove("click");
    content.innerHTML = "";
    result.forEach(item=>{
        if(item.category == "Video"){
            displayInfo(item);
        }
    })
})
game.addEventListener("click", ()=>{
    web.classList.remove("click");
    all.classList.remove("click");
    video.classList.remove("click");
    game.classList.add("click");
    content.innerHTML = "";
    result.forEach(item=>{
        if(item.category == "Game"){
            displayInfo(item);
        }
    })
})

function displayInfo(datum){
    const div = document.createElement("div");
    div.classList.add("pj");
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
    textAnim.observe(div);
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
    div.classList.add("sk");
    const title = document.createElement("h3");
    title.classList.add("txt")
    const details = document.createElement("p");
    details.classList.add("txt")

    if(data_item === "programming") {
        title.textContent = "Programming";
        details.textContent = `${data[data_item].languages}, ${data[data_item].frontend}, ${data[data_item].version_control}`;

    }else if (data_item === "game_dev"){
        title.textContent = "Game Development";
        details.textContent = `${data[data_item].engine}, ${data[data_item].programming}, ${data[data_item].ai_in_games}, ${data[data_item].modeling}`

    }else if (data_item === "systems_software"){
        title.textContent = "Systems software";
        details.textContent = `${data[data_item].operating_systems}, ${data[data_item].software_design}`;

    }else if (data_item === "motion_graphics"){
        title.textContent = "Motion Graphics"
        details.textContent = `${data[data_item].software}, ${data[data_item].motion_graphics}, ${data[data_item].video_editing}`;
        
    }

    div.append(title,details);
    skillbody.append(div);
    textAnim.observe(div);
    textAnim.observe(title);
    textAnim.observe(details);
}

loadSkills(skillURL);