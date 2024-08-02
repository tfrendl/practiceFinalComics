// Event listeners
let addCommentsLinks = document.querySelectorAll(".showAddCommentModal"); // creates an array with all of the elements with the showAddCommentModal class

for(let i = 0; i < addCommentsLinks.length; i++) {
  addCommentsLinks[i].addEventListener("click", addComments);
}

// Functions
async function addComments() {
 // alert(this.id) // "this" refers to the element that we are clicking on

  // Show modal window
  const myModal = new bootstrap.Modal(document.getElementById('addCommentModal'));
  myModal.show()

  let comicInfo = document.querySelector(".modal-body");
  comicInfo.innerHTML = this.id; // this.id is the comicId
  console.log(this.id);
}
