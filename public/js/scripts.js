// event listeners
document.getElementById("buttonRandomComic").addEventListener("click", displayRandomComic);
//let addCommentButton = document.getElementById("showAddCommentModal");

async function displayRandomComic(){
    // use local API created in index.js
    let url = `/api/comic/`;
    let response = await fetch(url);
    let data = await response.json();
    let displayRandomComic = document.getElementById("displayRandomComic");
    displayRandomComic.innerHTML = `<img src="${data[0].comicUrl}" alt="Random Comic">`;
    displayRandomComic.innerHTML += `<h4>${data[0].comicTitle}</h4>`;
}



  