const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY =  ${{ secrets.TOKEN }

sendBtn.onclick = function () {
  if(messageBar.value.length > 0){
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message =
    `<div class="chat message">
    <img src="user.png">
    <span>
      ${UserTypedMessage}
    </span>
  </div>`;

  let response = 
  `<div class="chat response">
  <img src="IMG_3889.png">
  <span class= "new">...
  </span>
</div>`

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() =>{
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${{ secrets.TOKEN }`
        },
        body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user", 
            "content": "Please respond in Kurdish Sorani"
        }
    ]
})

      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        const ChatBotResponse = document.querySelector(".response .new");
        ChatBotResponse.innerHTML = data.choices[0].message.content;
        ChatBotResponse.classList.remove("new");
      }).catch((error) => {
        ChatBotResponse.innerHTML = "Opps! An error occured. Please try again"
      })
    }, 100);
  }
}
