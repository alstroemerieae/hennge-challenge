const emails = document.querySelectorAll(".inbox-history-item");
const headerItems = document.querySelectorAll(".header-item");
const inboxItemExpanded = document.querySelectorAll(".inbox-item-expanded")
let windowCloseIcons = [];


const inboxContainer = document.getElementById("inbox-container");
const inboxHistory = document.getElementById("inbox-history");
const inboxViewer = document.getElementById("inbox-viewer");
const resultCounter = document.querySelector(".inbox-results");
const searchDate = document.getElementById("search-date");

let totalEmailsCounter = 0;

// windowCloseIcons.forEach(item => {
//   item.addEventListener("click", () => {
//     for(let i = 0; i < windowCloseIcons.length; i++) {
//       console.log(windowCloseIcons[i]);
//     }
//   })
// })



headerItems.forEach(item => {
  item.addEventListener("click", () => {
    // fix this later
    for(let i = 0; i < headerItems.length; i++) {
      console.log(headerItems[i]);
      console.log(headerItems[i].children[1]);
      headerItems[i].classList.remove("active-header-item");
      headerItems[i].children[1].classList.add("visibility-hidden");
    }
    item.classList.add("active-header-item");
    item.children[1].classList.remove("visibility-hidden");
  })
})


emails.forEach(item => {
  item.addEventListener("click", () => {
    if (totalEmailsCounter == 3) {
      console.log("Max allowed emails, deleting last one...");
      inboxViewer.removeChild(inboxViewer.lastElementChild);
      totalEmailsCounter--;
    }
    // let totalEmailsCounter = 0; // Why doesn't this works? Scope?
    console.log("Email Clicked");
    // console.log(item);
    // console.log(item.children[1].innerText);
    // console.log(item.children[2].innerText);
    // console.log(item.children[3].innerText);
    // console.log(item.children[4].innerText);
    // console.log(item.children[5].innerText);
    inboxHistory.classList.add("compacted-history");
    inboxViewer.classList.add("compacted-viewer");
    addDiv(item);
    totalEmailsCounter++;
    updateNode();

    // for (var i = 0; i < windowCloseIcons.length; i++) {
    //   windowCloseIcons[i].addEventListener('click', function() {
    //     console.log("clicked");
    //     console.log(windowCloseIcons[i]);
    //     // e.currentTarget.parentNode.remove();
    //   });
    // }
    console.log(totalEmailsCounter);
    // console.log(inboxViewer);
    // console.log(`The last email is`);
    // console.log(inboxViewer.lastElementChild);
  })
})



// function closeIcon() {
//   windowCloseIcons.forEach(item => {
//     item.addEventListener("click", () => {
//       console.log("clicked close icon");
//       console.log(item)
//     })
//   })
// }

resultCounter.addEventListener("click", function toggleClass() {
  switch (resultCounter.childNodes[2].innerText){
    case "10":
      console.log(`Current counter is ${resultCounter.childNodes[2].innerText}!`);
      inboxHistory.classList.toggle("visibility-hidden");
      inboxViewer.classList.toggle("visibility-hidden");
      resultCounter.childNodes[2].innerText = "0";
      searchDate.innerText = "2020/1/1 - 2020/1/1";
      inboxContainer.style.backgroundImage="url('../../src/assets/images/logo.png')";
      break;
    case "0":
      console.log(`Current counter is ${resultCounter.childNodes[2].innerText}!`);
      inboxHistory.classList.toggle("visibility-hidden");
      inboxViewer.classList.toggle("visibility-hidden");
      resultCounter.childNodes[2].innerText = "10";
      searchDate.innerText = "2019/12/31 - 2020/1/3";
      inboxContainer.style.backgroundImage="url('')";
      break;
    default:
      console.log("Error in switch");
  }
})


// afterbegin or beforeend?
function addDiv(item) { 
  document.getElementById("inbox-viewer").insertAdjacentHTML("afterbegin", 
    `
      <div class="inbox-item-expanded">
        <div class="inbox-item-expanded-sender">
          <h4>Sender</h4>
          <h5>${item.children[1].innerText}</h5>
        </div>
        <div class="inbox-item-expanded-recipient">
          <h4>Recipient</h4>
          <h5>${item.children[2].innerText}</h5>
        </div>
        <div class="inbox-item-expanded-subject">
          <h4>Subject</h4>
          <h5>${item.children[3].innerText}</h5>
        </div>
        <div class="inbox-item-expanded-date">
          <h4>Date</h4>
          <h5>${item.children[4].innerText}</h5>
        </div>
        <div class="inbox-item-expanded-body">
          <p>${item.children[5].innerText}</p>
        </div>
        <div class="window-close" onclick="deleteMessage(this)">
          X
        </div>
      </div>
    `
  );
}

function updateNode() {
  windowCloseIcons = document.querySelectorAll(".window-close");
}

function deleteMessage(el) {
  updateNode();
  console.log("clicked")
  var element = el;
  element.parentNode.remove();
  totalEmailsCounter--;
  console.log(totalEmailsCounter);

}