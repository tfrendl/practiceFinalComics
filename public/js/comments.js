let viewCommentsButtons = document.querySelectorAll(".viewComments"); // creates an array with all of the elements in the view comments class

// Event listeners
for(let i = 0; i < viewCommentsButtons.length; i++) {
    viewCommentsButtons[i].addEventListener("click", getComicComments);
}

async function getComicComments() {
    const myModal = new bootstrap.Modal(document.getElementById('displayComments'));
    myModal.show();

    console.log(`This is the comic id ${this.id}`);
  
    //show all comments for that specific comic
    let url = `/api/comic/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();

    let modalBody = document.getElementById("allComments");
    modalBody.innerHTML = "";

   if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      modalBody.innerHTML += `<h5>${data[i].comment}</h5>`;
      modalBody.innerHTML += `- ${data[i].author}<br><br>`;
      console.log(data[i].author);
    }
   } else {
     modalBody.innerHTML = `<h4>No comments yet!</h4>`;
   }
}

