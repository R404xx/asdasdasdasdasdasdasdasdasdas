const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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"; // Replace with your actual API key

sendBtn.onclick = function () {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message = `
      <div class="chat message">
        <img src="user.png">
        <span>${User TypedMessage}</span>
      </div>`;

    let response = `
      <div class="chat response">
        <img src="IMG_3889.png">
        <span class="new">...</span>
      </div>`;

    messageBox.insertAdjacentHTML("beforeend", message);
    messageBox.insertAdjacentHTML("beforeend", response);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": UserTypedMessage // Send the user's message
          }
        ]
      })
    };

    setTimeout(() => {
      fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
          const ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = data.choices[0].message.content;
          ChatBotResponse.classList.remove("new");
        })
        .catch((error) => {
          const ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
        });
    }, 100);
  }
};
