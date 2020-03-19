    function isIndexedDbSuported(){
        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }
    }

    function createDb(dbName, user, friends){
        let request = indexedDB.open(dbName, 1);
        request.onerror = event =>{
            console.log("error connecting to " + dbName + " DB details:\n" + event);
        }
        request.onupgradeneeded = event =>{
            let db = event.target.result;
            let userObjectStore = db.createObjectStore("user", { keyPath: "publicKey" });
            let friendsObjectStore = db.createObjectStore("friends", { keyPath: "publicKey" });  
            userObjectStore.transaction.oncomplete = function(event) {
                let userObjectStore = db.transaction("user", "readwrite").objectStore("user");
                    userObjectStore.add(user);
                let friendsObjectStore = db.transaction("friends", "readwrite").objectStore("friends");
                if(Array.isArray(friends)){
                    friends.forEach(friend =>{
                        friendsObjectStore.add(friend);
                    });
                }
                else
                    friendsObjectStore.add(friends);
            };
        }
    }

    //Update DB
    function addNewFriend(dbName, friend){
        let request = indexedDB.open(dbName, 1);
        request.onerror = event =>{
            console.log("error connecting to " + dbName + " DB details:\n" + event);
        }
        request.onsuccess = event =>{
            db = event.target.result;
            
            let transaction = db.transaction("friends", "readwrite")
            let objectStore = transaction.objectStore("friends");
            objectStore.add(friend);
        }
    }
    function addMessage(dbName, friend, message){
        let request = indexedDB.open(dbName, 1);
        request.onerror = event =>{
            console.log("error connecting to " + dbName + " DB details:\n" + event);
        }
        request.onsuccess = event =>{
            db = event.target.result;
            
            let transaction = db.transaction("friends", "readwrite")   
            let objectStore = transaction.objectStore("friends");
            let request = objectStore.get(friend.publicKey);
            request.onsuccess = event =>{
                let data = request.target.result;
                data.messagesList.push(message);
                let requestUpdate = objectStore.put(data);
                requestUpdate.onsuccess = event => {
                    console.log("Message added");
                }
                requestUpdate.onerror = event =>{
                    console.log("Error adding message");
                }
            }
        }
    }

