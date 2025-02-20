// Hamburger Menu
const navigation = document.querySelector("#navigation");
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", ()=>{
    navigation.classList.toggle("open");
})

const bodytop = document.getElementById("back-to-top");
bodytop.addEventListener("click", ()=>{
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})

const projects = document.querySelector(".projects");
projects.addEventListener("click", (event)=>{
    event.preventDefault();
    document.querySelector(".content").scrollIntoView();
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