// Get chatbox element by class name 
let chatbox = document.getElementsByClassName('chatbox')[0];

// Create export button element with id and style 
let exportButton = document.createElement('button');
exportButton.id = 'export-button';
exportButton.style.position = 'absolute';
exportButton.style.right = '10px';
exportButton.style.bottom = '10px';
exportButton.style.zIndex = '1000';
exportButton.style.backgroundColor = '#0078d4';
exportButton.style.color = 'white';
exportButton.style.border = 'none';
exportButton.style.padding = '10px 20px';
exportButton.style.cursor = 'pointer';
exportButton.innerText = 'Export Chatlogs';

// Append export button to chatbox element 
chatbox.appendChild(exportButton);

// Add click event listener to export button 
exportButton.addEventListener('click',() => {

  // Get all user messages and bing messages elements by class name 
  let userMessages = document.getElementsByClassName('user-message');
  let bingMessages = document.getElementsByClassName('bing-message');

  // Initialize chatlog variable as empty string 
  let chatlog = '';

  // Loop through user messages and bing messages elements 
  for(let i=0;i<userMessages.length;i++){

    // Get text content of each element and append to chatlog with format and newline 
    let userText = userMessages[i].textContent;
    let bingText = bingMessages[i].textContent;
    chatlog += `User: ${userText}\n`;
    chatlog += `Bing: ${bingText}\n\n`;
  }

  // Store chatlog data in local storage with current tab's id as key 
  chrome.storage.local.set({[chrome.runtime.id]:chatlog});

  // Send message 'export' to background script 
  chrome.runtime.sendMessage('export');
});
