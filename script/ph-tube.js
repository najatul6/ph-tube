const fullCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const tabContainer = document.getElementById("tabs-container");

    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a class="btn" onclick="loadCategory('${category.category_id}'), categoryButton(this)">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
};


// Loads videos 
const loadCategory = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardContainer = document.getElementById("card_container")

    cardContainer.innerHTML = "";

    const errorShow = document.getElementById("emty-contianer");
    if (data.data.length === 0) {
        errorShow.classList.remove("hidden");
    }
    else {
        errorShow.classList.add("hidden");
    }

    data.data.forEach((videos) => {
        if (data.data.legth === 0) {
            errorShow.classList.remove("hidden");
        }
        else {
            errorShow.classList.add("hidden");
        }
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card">
                    <figure class="rounded-lg relative"><img class="h-[200px] w-full rounded-lg" src="${videos?.thumbnail}" alt="" />
                    <div class="absolute bottom-2 right-2">
                        <span id="timeing-view" class="countdown font-normal text-xs bg-black px-[5px] py-[4px] text-white rounded-md">
                        ${videos.others.posted_date ? secondToHourMinitue(videos.others.posted_date) : ""}
                        
                        </span>
                    </div>
                    </figure>
                    <div class="card-body px-1 py-[20px]">
                        <div class="flex gap-3">
                            <div class="avatar">
                                <div class="w-[40px] h-[40px] rounded-full ring-offset-base-100 ring-offset-2">
                                    <img src="${videos.authors[0]?.profile_picture}"/>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <h2 class="card-title text-[#171717] font-bold text-base">${videos?.title}</h2>
                                <div class="flex gap-2">
                                <h3 class="text-detail-color font-normal text-sm">${videos.authors[0]?.profile_name}</h3>
                                <span>
                                ${videos.authors[0].verified ? '<img src="../resource/sign.svg" />' : ""}
                                <span>
                                
                                </div>
                                <h4 class="text-detail-color font-normal text-sm">${videos.others?.views} views</h4>
                            </div>
                        </div>

                    </div>
                </div>
        `
        cardContainer.appendChild(div);
    })
}

// Sort View Section

const sortView = () =>{
}

sortView()


const timeingView = document.getElementById("timeing-view")
function secondToHourMinitue(p) {
    let second = parseFloat(p);
    const hour = Math.floor(second / 3600);
    second %= 3600;
    const minute = Math.floor(second / 60);
    const time = `${hour}hrs ${minute} min ago`
    return time;
}

fullCategory();

const categoryButton = categroycls => {
    const isSelect = categroycls.className.includes("btn");
        categroycls.classList.add("selected");
        return isSelect;
    
}

loadCategory(1000);