// Submit the form data to a Google spreadsheet, prevent the page from reloading,
// and disable the submit button while the form is being submitted, to prevent multiple submissions

const form = document.getElementById("form")
const submitButton = document.getElementById("submit")
const scriptURL = 'https://script.google.com/macros/s/AKfycbwZe0Y0zXJ7PfeKBu2XYy6btpnzmVnF8JjbNfL-itjrdT3MRBW9JNP5sgAB1cwIZ9hOfA/exec'
const formStatus = document.getElementById("formStatus")
formStatus.style.display = "block";
form.addEventListener('submit', e => {
    submitButton.disabled = true
    e.preventDefault()
    let requestBody = new FormData(form)
    fetch(scriptURL, { method: 'POST', body: requestBody})
        .then(response => {
            document.getElementById("formStatus").innerHTML = "Your feedback has been sent, thank you!"
            form.reset()
            submitButton.disabled = false
        })
        .catch(error => {
            document.getElementById("formStatus").innerHTML = "Sorry, there was an error submitting your feedback, please try again"
            submitButton.disabled = false
        })
    }
)

// Note: the 3 ways below are similar approaches to the one above
// Any of the 4 only works in a separate js file, but not in script.js,
// regardless of the position of the script path in the html
// All 3 approaches below require <form method="POST" action="YOUR_WEBAPP_URL"> in HTML

/*window.addEventListener("load", function() {
  const form = document.getElementById('test');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  });
});*/

/*window.addEventListener("DOMContentLoaded", function() { // 'window.onload = function...' also works 
  const yourForm = document.getElementById("form");
  yourForm.addEventListener("submit", function(e) { // 'yourForm.onsubmit = function...` also works too
    e.preventDefault(); 
    const data = new FormData(yourForm); 
    const action = e.target.action; 
    fetch(action, { 
      method: 'POST', 
      body: data, 
    }).then((response) => {
      response.json();
    }).then((data) => {
      if (data.result == "success") {
        // finished, you can do whatever you want here
        alert("Success!")
      }
    })
  })
});*/

/*var form = document.getElementById('form');
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
      method : "POST",
      body: new FormData(document.getElementById("form")),
  }).then(
      response => response.json()
  ).then((html) => {
    alert('success')
  });
});*/