const showLoader=()=>{
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('video-container').classList.add('hidden')
}
const hideLoader=()=>{
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('video-container').classList.remove('hidden')
}



function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
    
  // step-01: fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //    step-02: convert promise t json
    .then((res) => res.json())
    //    step-03: Send data to displayCategory function
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    showLoader();
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const btnAll = document.getElementById("btn-all");
      btnAll.classList.add("active");
      displayVideos(data.videos);
    });
}

function loadCategoryVideos(id) {
    showLoader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
}

function displayCategories(categories) {
  // get the container
  const categorayContainer = document.getElementById("category-container");
  // loop oparation on array of object
  for (let cat of categories) {
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
       <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
       `;
    // append the element
    categorayContainer.appendChild(categoryDiv);
  }
}

const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};
const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `

<div class="card  image-full ">
  <figure class="opacity-5">
    <img 
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body z-10 ">
    <h2 class="card-title">${video.title}</h2>
    <p >${video.description}</p>
   
  </div>
</div>
`;
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
     <div class="flex flex-col items-center justify-center py-20 col-span-full">
                <img class="w-[120px]" src="assets/Icon.png" alt="">
                <h2 class="text-3xl font-bold">Oops!! Sorry,There is no content here</h2>
            </div>
    `;
    hideLoader();
    return;
  }
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
  <div class="card bg-base-100 ">
                <figure class="relative">
                    <img class="w-full md:h-[200px] lg:h-[200px] object-cover h-[220px]"
                        src="${video.thumbnail}" />
                    <span
                        class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs
                        56 min ago</span>
                </figure>
                <div class=" flex gap-3 px-0 py-4">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                    </div>
                    <!-- aveter end -->
                    <div class="intro">
                        <h2 class="text-base font-semibold">${video.title}</h2>

                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                         ${video.authors[0].verified==true?`<img 
                           class="w-5 h-5" src="assets/social-media.png" alt="">`:``}</p>

                           <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                    <!-- end -->
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Discription</button>
            </div>
   `;
    videoContainer.append(videoCard);
  });
  hideLoader()
};

document.getElementById('search-input').addEventListener('keyup',(e="")=>{
    const input=e.target.value;
    
    const url=` https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideos(data.videos))

})

loadCategories();
loadVideos();
