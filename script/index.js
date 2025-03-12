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






function displayCategories(categories){
    // get the container
    const categorayContainer=document.getElementById('category-container');
    // loop oparation on array of object
    for(let cat of categories){
        // create element
      const categoryDiv=document.createElement('div');
       categoryDiv.innerHTML=`
       <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
       `;
    // append the element
    categorayContainer.appendChild(categoryDiv)
    }
  
}


const displayVideos=(videos)=>{
 
}

loadCategories()
loadVideos()