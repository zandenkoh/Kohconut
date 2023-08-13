// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBaX__0HZ-LB5LQxxpH8AmAz-u4McKlzD8",
    authDomain: "quicklink-53b0f.firebaseapp.com",
    projectId: "quicklink-53b0f",
    storageBucket: "quicklink-53b0f.appspot.com",
    messagingSenderId: "152333304946",
    appId: "1:152333304946:web:8099b7cbc8eb0b3c1d6eeb"
  };
  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
     








    // This is very IMPORTANT!! We're going to use "db" a lot.
    var db = firebase.database()
    // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
    class MEME_CHAT{

      delete_all_messages() {
        // Get the firebase database reference to the "chats" node
        var chatsRef = db.ref('chats/');
    
        // Remove all messages from the database
        chatsRef.remove()
          .then(() => {
            // After removing the entire "chats" node, recreate it to keep the structure
            chatsRef.set({});
    
            // After successful deletion, refresh the chat to update the UI
            this.refresh_chat();
          })
          .catch((error) => {
            console.error("Error removing messages: ", error);
          });
      }
      // Home() is used to create the home page
      home(){
        // First clear the body before adding in
        // a title and the join form
        document.body.innerHTML = ''
        this.create_title()
        this.create_join_form()
      }
      // chat() is used to create the chat page
      chat(){
        this.create_title()
        this.create_chat()
      }
      // create_title() is used to create the title
      create_title(){
        // This is the title creator. 🎉
        var title_container = document.createElement('div')
        title_container.setAttribute('id', 'title_container')
        var title_inner_container = document.createElement('div')
        title_inner_container.setAttribute('id', 'title_inner_container')
  
        var title = document.createElement('h1')
        title.setAttribute('id', 'title')
        title.textContent = 'Kohconut'
  
        title_inner_container.append(title)
        title_container.append(title_inner_container)
        document.body.append(title_container)
      }
      // create_join_form() creates the join form
      create_join_form() {
        var parent = this;
      
        var join_container = document.createElement('div');
        join_container.setAttribute('id', 'join_container');
        var join_inner_container = document.createElement('div');
        join_inner_container.setAttribute('id', 'join_inner_container');
      
        var join_button_container = document.createElement('div');
        join_button_container.setAttribute('id', 'join_button_container');
      
        var join_button = document.createElement('button');
        join_button.setAttribute('id', 'join_button');
        join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>';
        join_button.classList.add('disabled'); // Start with button disabled

          // Create and style an <h3> element for the name label
          var nameLabel = document.createElement('h3');
          nameLabel.textContent = 'Name:';
          nameLabel.classList.add('label-style'); // Add your CSS class here
      
        var join_input_container = document.createElement('div');
        join_input_container.setAttribute('id', 'join_input_container');


      
        var join_input = document.createElement('input');
        join_input.setAttribute('id', 'join_input');
        join_input.setAttribute('maxlength', 15);
        join_input.placeholder = 'Write your name here';
      
        var password_input_container = document.createElement('div');
        password_input_container.setAttribute('id', 'password_input_container');

          // Create and style an <h3> element for the password label
          var passwordLabel = document.createElement('h3');
          passwordLabel.textContent = 'Password:';
          passwordLabel.classList.add('label-style'); // Add your CSS class here


      
        var password_input = document.createElement('input');
        password_input.setAttribute('id', 'password_input');
        password_input.setAttribute('type', 'password');
        password_input.setAttribute('maxlength', 20);
        password_input.placeholder = 'Enter password';
      
        // Function to check if both inputs are valid and enable/disable the button
        function checkInputs() {
          if (
            join_input.value.length > 4 &&
            password_input.value === 'fortherealones'
          ) {
            join_button.classList.add('enabled');
            join_button.onclick = function () {
              parent.save_name(join_input.value);
              join_container.remove();
              parent.create_chat();
            };
          } else {
            join_button.classList.remove('enabled');
            join_button.onclick = null;
          }
        }
      
        // Attach event listeners for input changes
        join_input.onkeyup = checkInputs;
        password_input.onkeyup = checkInputs;
      
        // Append everything to the body
        join_button_container.append(join_button);
        join_input_container.append(join_input);
        password_input_container.append(password_input);
        join_inner_container.append(join_input_container, password_input_container, join_button_container);
        join_container.append(join_inner_container);
        document.body.append(join_container);
      
        function requestNotificationPermission() {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              // User has granted permission
            }
          });
        }
      }
      
      // create_load() creates a loading circle that is used in the chat container
      create_load(container_id){
        // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
        var parent = this;
  
        // This is a loading function. Something cool to have.
        var container = document.getElementById(container_id)
        container.innerHTML = ''
  
        var loader_container = document.createElement('div')
        loader_container.setAttribute('class', 'loader_container')
  
        var loader = document.createElement('div')
        loader.setAttribute('class', 'loader')
  
        loader_container.append(loader)
        container.append(loader_container)
  
      }
      // create_chat() creates the chat container and stuff
      create_chat(){
        // Again! You need to have (parent = this)
        var parent = this;
        // GET THAT MEMECHAT HEADER OUTTA HERE
        var title_container = document.getElementById('title_container')
        var title = document.getElementById('title')
        title_container.classList.add('chat_title_container')
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title')
  
        var chat_container = document.createElement('div')
        chat_container.setAttribute('id', 'chat_container')
  
        var chat_inner_container = document.createElement('div')
        chat_inner_container.setAttribute('id', 'chat_inner_container')
  
        var chat_content_container = document.createElement('div')
        chat_content_container.setAttribute('id', 'chat_content_container')
  
        var chat_input_container = document.createElement('div')
        chat_input_container.setAttribute('id', 'chat_input_container')
  
        var chat_input_send = document.createElement('button')
        chat_input_send.setAttribute('id', 'chat_input_send')
        chat_input_send.setAttribute('disabled', true)
        chat_input_send.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`
  
        var chat_input = document.createElement('input')
        chat_input.setAttribute('id', 'chat_input')
        // Only a max message length of 1000
        chat_input.setAttribute('maxlength', 1000)
        // Get the name of the user
        chat_input.placeholder = `${parent.get_name()}, write something...`
        chat_input.onkeyup  = function(){
          if(chat_input.value.length > 0){
            chat_input_send.removeAttribute('disabled')
            chat_input_send.classList.add('enabled')
            chat_input_send.onclick = function(){
              chat_input_send.setAttribute('disabled', true)
              chat_input_send.classList.remove('enabled')
              if(chat_input.value.length <= 0){
                return
              }
              // Enable the loading circle in the 'chat_content_container'
              parent.create_load('chat_content_container')
              // Send the message. Pass in the chat_input.value
              parent.send_message(chat_input.value)
              // Clear the chat input box
              chat_input.value = ''
              // Focus on the input just after
              chat_input.focus()
            }
          }else{
            chat_input_send.classList.remove('enabled')
          }
        }

  
        var chat_logout_container = document.createElement('div')
        chat_logout_container.setAttribute('id', 'chat_logout_container')
  
        var chat_logout = document.createElement('button')
        chat_logout.setAttribute('id', 'chat_logout')
        chat_logout.textContent = `${parent.get_name()} • Logout`
        // "Logout" is really just deleting the name from the localStorage
        chat_logout.onclick = function(){
          localStorage.clear()
          // Go back to home page
          parent.home()
        }
  
        chat_logout_container.append(chat_logout)
        chat_input_container.append(chat_input, chat_input_send)
        chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
        chat_container.append(chat_inner_container)
        document.body.append(chat_container)
        // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
        parent.create_load('chat_content_container')
        // then we "refresh" and get the chat data from Firebase
        parent.refresh_chat()



       //HAHHAAHAHAHAHHAHAHAHAHHAHAHHAHAHAHAHHAHAHAHHAHAHHA//
   


       ordered.forEach(function (data) {
        var name = data.name;
        var message = data.message;
        var timestamp = data.timestamp; // Get the timestamp from the message data
        var isCurrentUser = name === parent.get_name(); // Check if the message is sent by the current user
        
        var message_container = document.createElement('div');
        message_container.setAttribute('class', `message_container ${isCurrentUser ? 'sent' : 'received'}`);
        
        var message_inner_container = document.createElement('div');
        message_inner_container.setAttribute('class', 'message_inner_container');
        
        var message_user_container = document.createElement('div');
        message_user_container.setAttribute('class', 'message_user_container');
        
        var message_user = document.createElement('p');
        message_user.setAttribute('class', 'message_user');
        message_user.textContent = `${name}`;
        
        var message_content_container = document.createElement('div');
        message_content_container.setAttribute('class', 'message_content_container');
        
        var message_content = document.createElement('p');
        message_content.setAttribute('class', 'message_content');
        message_content.textContent = `${message}`;
        
        var message_timestamp = document.createElement('p');
        message_timestamp.setAttribute('class', 'message_timestamp');
        var formattedTimestamp = formatTimestamp(timestamp);
        message_timestamp.textContent = formattedTimestamp; // Format the timestamp
        
        message_user_container.append(message_user);
        message_content_container.append(message_content, message_timestamp); // Append the timestamp
        message_inner_container.append(message_user_container, message_content_container);
        message_container.append(message_inner_container);
        
        chat_content_container.append(message_container);
      });
      
      // Function to format the timestamp to 12-hour clock with AM/PM
      function formatTimestamp(timestamp) {
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
      }
      
    
      // Go to the recent message at the bottom of the container
      const lastMessage = chat_content_container.lastElementChild;
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });



     }

      
      // Save name. It literally saves the name to localStorage
      save_name(name){
        // Save name to localStorage
        localStorage.setItem('name', name)
      }
      // Sends message/saves the message to firebase database
      send_message(message){
        var parent = this;
        
        // If the local storage name is null and there is no message,
        // then return/don't send the message. 
        // The user is somehow hacking to send messages,
        // or they just deleted the localstorage themselves.
        if (parent.get_name() == null || message == null || message.trim() === '') {
          return;
        }
      
        // Create a new timestamp for the message
        var timestamp = Date.now();
      
        // Get the firebase database reference
        var chatsRef = db.ref('chats/');
      
        // Get the number of existing messages to determine the index
        chatsRef.once('value', function(message_object) {
          var index = parseFloat(message_object.numChildren()) + 1;
      
          // Set the message data in the database
          var messageData = {
            name: parent.get_name(),
            message: message.trim(),
            timestamp: timestamp,
            index: index,
            sender: '${parent.get_name()}' // Add this property to identify the sender
            

          };
      
          // Push the message data to the database
          chatsRef.child(`message_${index}`).set(messageData)
            .then(function() {
              // After we send the chat, refresh to get the new messages
              parent.refresh_chat();
            });
        });







      }
      
      // Get name. Gets the username from localStorage
      get_name(){
        // Get the name from localstorage
        if(localStorage.getItem('name') != null){
          return localStorage.getItem('name')
        }else{
          this.home()
          return null
        }
      }
      // Refresh chat gets the message/chat data from firebase
      refresh_chat(){
        var chat_content_container = document.getElementById('chat_content_container')
  
        // Get the chats from firebase
        db.ref('chats/').on('value', function(messages_object) {
          // When we get the data clear chat_content_container
          chat_content_container.innerHTML = ''
          // if there are no messages in the chat. Retrun . Don't load anything
          if(messages_object.numChildren() == 0){
            return
          }
  
          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!
  
          // convert the message object values to an array.
          var messages = Object.values(messages_object.val());
          var guide = [] // this will be our guide to organizing the messages
          var unordered = [] // unordered messages
          var ordered = [] // we're going to order these messages
  
          for (var i, i = 0; i < messages.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i+1)
            // unordered is the [message, index_of_the_message]
            unordered.push([messages[i], messages[i].index]);
          }
  
          // Now this is straight up from stack overflow 🤣
          // Sort the unordered messages by the guide
          guide.forEach(function(key) {
            var found = false
            unordered = unordered.filter(function(item) {
              if(!found && item[1] == key) {
                // Now push the ordered messages to ordered array
                ordered.push(item[0])
                found = true
                return false
              }else{
                return true
              }
            })
          }
          
          






        )




          // Remove the "new-sent-message" class from newly sent messages after a delay
          setTimeout(function() {
            var newSentMessages = document.querySelectorAll('.new-sent-message');
            newSentMessages.forEach(function(message) {
              message.classList.remove('new-sent-message');
            });
          }, 5000); // Remove the class after 5 seconds (adjust the delay as needed)


          function receiveNewMessage(message) {
            // Code to receive a new message
          
            if (Notification.permission === 'granted') {
              const notification = new Notification('New Message', {
                body: message.sender + ': ' + message.content,
              });
              
              // Adjust notification behavior as needed
              notification.onclick = function () {
                // Handle click event when user clicks on the notification
              };
            }
          }
          
  
          // Now we're done. Simply display the ordered messages
          ordered.forEach(function(data) {
            var name = data.name
            var message = data.message
            var timestamp = data.timestamp; // Get the timestamp from the message data

  
            var message_container = document.createElement('div')
            message_container.setAttribute('class', 'message_container')


            //HAHAHAHAHAHAHAHHAHAAHHAHAHHHHHHHAHAAAAAAHHHHHAAAHHHH//
  
            var message_inner_container = document.createElement('div')
            message_inner_container.setAttribute('class', 'message_inner_container')
  
            var message_user_container = document.createElement('div')
            message_user_container.setAttribute('class', 'message_user_container')
  
            var message_user = document.createElement('p')
            message_user.setAttribute('class', 'message_user')
            message_user.textContent = `${name}`
  
            var message_content_container = document.createElement('div')
            message_content_container.setAttribute('class', 'message_content_container')
  
            var message_content = document.createElement('p')
            message_content.setAttribute('class', 'message_content')
            message_content.textContent = `${message}`
  
            message_user_container.append(message_user)
            message_content_container.append(message_content)
            message_inner_container.append(message_user_container, message_content_container)
            message_container.append(message_inner_container)
  
            chat_content_container.append(message_container)



                    // Create the timestamp element
             var message_timestamp = document.createElement('p');
             message_timestamp.setAttribute('class', 'message_timestamp');
             message_timestamp.textContent = new Date(timestamp).toLocaleString(); // Format the timestamp

             message_user_container.append(message_user);
             message_content_container.append(message_content, message_timestamp); // Append the timestamp
             message_inner_container.append(message_user_container, message_content_container);
             message_container.append(message_inner_container);

             chat_content_container.append(message_container);
            });
          // Go to the recent message at the bottom of the container
          chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })
  

      }






    }





























    // So we've "built" our app. Let's make it work!!
    var app = new MEME_CHAT()
    // If we have a name stored in localStorage.
    // Then use that name. Otherwise , if not.
    // Go to home.
    if(app.get_name() != null){
      app.chat()
    }

    if (app.get_name() != null) {
      app.chat();
      // Delete all existing messages from the database
      app.delete_all_messages();
    }







  }
