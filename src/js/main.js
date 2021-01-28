// Constants
const inboxContainer = document.getElementById("inbox-container");
const searchDate = document.getElementById("search-date");
const headerItems = document.querySelectorAll(".header-item");
const resultCounter = document.querySelector(".inbox-results");
const inboxHistory = document.getElementById("inbox-history");
const inboxViewer = document.getElementById("inbox-viewer");
const inboxEmails = document.querySelectorAll(".inbox-history-email");

// Variables
let totalExpandedEmailsCounter = 0;


// This will allow you to inspect the inbox email body content on click
inboxEmails.forEach(email => {
  email.addEventListener("click", () => {
    // This will limit the expanded emails on display to 3
    if (totalExpandedEmailsCounter == 3) {
      console.log("Max allowed emails, deleting last one...");
      inboxViewer.removeChild(inboxViewer.lastElementChild);
      totalExpandedEmailsCounter--;
    }
    console.log("Email clicked, expanding email");
    // These classes will split up the layout in two columns for better readibility
    inboxHistory.classList.add("compacted-history");
    inboxViewer.classList.add("compacted-viewer");
    createExpandedEmail(email);
    totalExpandedEmailsCounter++;
    console.log(`Current expanded emails: ${totalExpandedEmailsCounter}`);
  })
})


// This will add an active class on the clicked header items
// (Purely visual, it doesn't has any function in the app)
headerItems.forEach(headerItem => {
  headerItem.addEventListener("click", () => {
    // fix this later
    for(let i = 0; i < headerItems.length; i++) {
      console.log(headerItems[i]);
      console.log(headerItems[i].children[1]);
      headerItems[i].classList.remove("active-header-item");
      headerItems[i].children[1].classList.add("visibility-hidden");
    }
    headerItem.classList.add("active-header-item");
    headerItem.children[1].classList.remove("visibility-hidden");
  })
})


// This would help to visualize the inbox with and without email items on it, as requested on Mission #1
// (Purely visual, it doesn't has any function in the app)
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


// This function will create a new expanded email with the data of the clicked email
function createExpandedEmail(item) { 
  inboxViewer.insertAdjacentHTML("afterbegin", 
    `
      <div class="inbox-email-expanded">
        <div class="inbox-email-expanded-sender">
          <h4>Sender</h4>
          <h5>${item.children[1].innerText}</h5>
        </div>
        <div class="inbox-email-expanded-recipient">
          <h4>Recipient</h4>
          <h5>${item.children[2].innerText}</h5>
        </div>
        <div class="inbox-email-expanded-subject">
          <h4>Subject</h4>
          <h5>${item.children[3].innerText}</h5>
        </div>
        <div class="inbox-email-expanded-date">
          <h4>Date</h4>
          <h5>${item.children[4].innerText}</h5>
        </div>
        <div class="inbox-email-expanded-body">
          <p>${item.children[5].innerText}</p>
        </div>
        <div class="window-close" onclick="deleteEmail(this)">
          X
        </div>
      </div>
    `
  );
}


// This function will delete the expanded email on click
function deleteEmail(el) {
  console.log("Deleting email")
  var element = el;
  element.parentNode.remove();
  totalExpandedEmailsCounter--;
  console.log(`Current expanded emails: ${totalExpandedEmailsCounter}`);
}