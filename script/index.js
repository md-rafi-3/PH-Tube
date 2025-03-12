function loadCategories(){
    // step-01: fetch the data
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//    step-02: convert promise t json
   .then((res)=>res.json())
//    step-03: Send data to displayCategory function
   .then((data)=>displayCategories(data.categories))
}

function loadVideos (){
   fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
   .then(res=>res.json())
   .then(data=>displayVideos(data.videos))
   
   
}

function loadCategoryVideos(id){

const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
console.log(url)

fetch(url)
.then(res=>res.json())
.then(data=>displayVideos(data.category))

}






function displayCategories(categories){
    // get the container
    const categorayContainer=document.getElementById('category-container');
    // loop oparation on array of object
    for(let cat of categories){
        // create element
      const categoryDiv=document.createElement('div');
       categoryDiv.innerHTML=`
       <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
       `;
    // append the element
    categorayContainer.appendChild(categoryDiv)
    }
  
}


const displayVideos=(videos)=>{
 const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML="";
 videos.forEach((video)=>{
   const videoCard=document.createElement('div');
   videoCard.innerHTML=`
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

                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img 
                           class="w-5 h-5" src="assets/social-media.png" alt=""></p>

                           <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                    <!-- end -->
                </div>
            </div>
   `;
   videoContainer.append(videoCard)
 })
}

loadCategories()
loadVideos()