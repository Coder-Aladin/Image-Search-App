const queryBox = document.querySelector("#input_box");
const searchBtn = document.querySelector("#search_btn");
const imgContainer = document.querySelector(".img_container");
const body = document.querySelector(".body");
const main = document.querySelector("body");
const pageBox = document.querySelector(".page_box");
const totalPage = document.querySelector("#t_pages");
const currentPage = document.querySelector("#current_page");
const prevBtn = document.querySelector("#prev_btn");
const nextBtn = document.querySelector("#next_btn");
const modeBtn = document.querySelector("#mode_btn");

let page = 1;
let currentQuery = "";

const searchImg = async (query) => {
    try {
        currentQuery = query;
    const accessKey = window.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
        throw new Error("Missing Unsplash access key");
    }
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30&client_id=${accessKey}`;
    
    let response = await fetch(url);
    let imgData = await response.json();
    let data = imgData.results
    
    totalPage.innerHTML = imgData.total_pages;
    currentPage.innerHTML = page;
    
    for (let i = 0; i < data.length; i++) {
        const image = document.createElement("img");
        image.className = "fetchImg";
        image.title = data[i].description || query;
        image.src = data[i].urls.regular;
        image.alt = image.title;
        imgContainer.appendChild(image);
    }
    
    const fetchImgs = document.querySelectorAll(".fetchImg");
    
    fetchImgs.forEach((image) => {
        image.addEventListener("click", () => {
            let url = image.getAttribute("src");
            let des = image.getAttribute("title");
            let title = ""
            if (des == "null") {
                title = queryBox.value
            } else {
                title = des
            }
            imgCard(`${url}`, fetchImgs, `${title}`);
        });
    });
    }
    catch (error) {
        imgContainer.innerHTML = `<h2>image not found</h2>`;
    }
};

let cardBox = document.createElement("div");

const imgCard = (url, images, title) => {
    main.classList.add("freeze");
    queryBox.disabled = true;
    searchBtn.disabled = true;
    cardBox.innerHTML = `
        
            <div class="card_element">
      <div class="c_top">
        <h3>Image Search App</h3>
        <div class="icon_box">
               <i class="material-icons download_btn">download</i>
               <i class="material-icons close_btn">close</i>
    </div>
        
      </div>
      
      <img id="c_img" src=${url}>
      
      <div class="c_bottom">
        <div><p>${title}</p></div>
      </div>
    </div>
            
            `;
    cardBox.classList.add("card_box");
    body.append(cardBox);
    
    let closeBtns = document.querySelectorAll(".close_btn");
    
    for(let closeBtn of closeBtns){
        closeBtn.addEventListener("click", () => {
            cardBox.remove();
            main.classList.remove("freeze");
            queryBox.disabled = false;
            searchBtn.disabled = false;
        });
    }
    
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === Number(totalPage.innerHTML);
};

searchBtn.addEventListener("click", () => {
    let query = queryBox.value.trim().toLowerCase();
    
    if (query !== "") {
        page = 1;
        imgContainer.innerHTML = "";
        searchImg(query);
        pageBox.classList.remove("hide");
    } else{
        imgContainer.innerHTML = `<h2>enter query to search</h2>`;
        pageBox.classList.add("hide");
    }
    
});

prevBtn.addEventListener("click", () => {
    if (page > 1) {
        page--;
        imgContainer.innerHTML = "";
        
        searchImg(currentQuery);
    }
});

nextBtn.addEventListener("click", () => {
    if (page < Number(totalPage.innerHTML)) {
        page++;
        imgContainer.innerHTML = "";
        
        searchImg(currentQuery);
    }
});

const navBar = document.querySelector(".nav");
const navHead = document.querySelector(".nav h3");
const navIcon = document.querySelector(".nav .mode_box i");
navHead.classList.add("light_text");
navIcon.classList.add("light_text", "light_border");
queryBox.classList.add("light_text", "light_bg");
main.classList.add("light_text", "light_bg");
searchBtn.classList.add("light_text", "light_bg", "light_border");
imgContainer.classList.add("light_text", "light_bg");
cardBox.classList.add("light_bg");
pageBox.classList.add("light_text");
totalPage.classList.add("light_bg", "light_border");
prevBtn.classList.add("light_bgc");
nextBtn.classList.add("light_bgc");
currentPage.classList.add("light_bg", "light_border");

const darkMode = () => {
    navBar.classList.add("dark_bg");
    navHead.classList.add("dark_text");
    navHead.classList.remove("light_text");
    navIcon.classList.add("dark_text", "dark_border");
    navIcon.classList.remove("light_text", "light_border");
    queryBox.classList.add("dark_text", "dark_bg");
    queryBox.classList.remove("light_text", "light_bg");
    main.classList.add("dark_text", "dark_bg");
    main.classList.remove("light_text", "light_bg");
    searchBtn.classList.add("dark_text", "dark_bg", "dark_border");
    searchBtn.classList.remove("light_text", "light_bg", "light_border");
    imgContainer.classList.add("dark_text", "dark_bg");
    imgContainer.classList.remove("light_text", "light_bg");
    cardBox.classList.add("dark_bg");
    cardBox.classList.remove("light_bg");
    pageBox.classList.add("dark_text");
    pageBox.classList.remove("light_text");
    totalPage.classList.add("dark_border", "dark_bg");
    totalPage.classList.remove("light_border", "light_bg");
    prevBtn.classList.add("dark_bgc");
    prevBtn.classList.remove("light_bgc");
    nextBtn.classList.add("dark_bgc");
    nextBtn.classList.remove("light_bgc");
    currentPage.classList.add("dark_border", "dark_bg");
    currentPage.classList.remove("light_border", "light_bg");
};

const lightMode = () => {
    navBar.classList.remove("dark_bg");
    navHead.classList.remove("dark_text");
    navHead.classList.add("light_text");
    navIcon.classList.remove("dark_text", "dark_border");
    navIcon.classList.add("light_text", "light_border");
    queryBox.classList.remove("dark_text", "dark_bg");
    queryBox.classList.add("light_text", "light_bg");
    main.classList.remove("dark_text", "dark_bg");
    main.classList.add("light_text", "light_bg");
    searchBtn.classList.remove("dark_text", "dark_bg", "dark_border");
    searchBtn.classList.add("light_text", "light_bg", "light_border");
    imgContainer.classList.remove("dark_text", "dark_bg");
    imgContainer.classList.add("light_text", "light_bg");
    cardBox.classList.remove("dark_bg");
    cardBox.classList.add("light_bg");
    pageBox.classList.remove("dark_text");
    pageBox.classList.add("light_text");
    totalPage.classList.remove("dark_border", "dark_bg");
    totalPage.classList.add("light_border", "light_bg");
    prevBtn.classList.remove("dark_bgc");
    prevBtn.classList.add("light_bgc");
    nextBtn.classList.remove("dark_bgc");
    nextBtn.classList.add("light_bgc");
    currentPage.classList.remove("dark_border", "dark_bg");
    currentPage.classList.add("light_border", "light_bg");
};

modeBtn.addEventListener("click", () => {
    let mode = modeBtn.innerHTML;
    
    switch(mode){
        case "dark_mode":
        modeBtn.innerHTML = "light_mode";
        darkMode();
        break
        
        case "light_mode":
        modeBtn.innerHTML = "dark_mode";
        lightMode();
        break
    }
});


