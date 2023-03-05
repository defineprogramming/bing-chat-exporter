 // If message is 'export', get chatlog data from sender tab's storage 
 if(message === 'export'){
   chrome.storage.local.get(sender.tab.id,data => {

     // If data exists for sender tab's id 
     if(data[sender.tab.id]){

       // Create a blob object with chatlog data as text content 
       let blob = new Blob([data[sender.tab.id]],{type:'text/plain'});

       // Create a URL for blob object 
       let url = URL.createObjectURL(blob);

       // Download blob object as txt file with current date and time as name 
       chrome.downloads.download({
         url:url,
         filename:`bing-chat-${Date.now()}.txt`,
         saveAs:true
       });

       // Revoke URL after download is complete 
       chrome.downloads.onChanged.addListener(delta => {
         if(delta.state && delta.state.current === 'complete'){
           URL.revokeObjectURL(url);
         }
       });
     }
   });
 }

 // Send back response (optional)
 response('OK');
});
