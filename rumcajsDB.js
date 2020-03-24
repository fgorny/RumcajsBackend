    function isIndexedDbSuported(){
        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }
    }

    let db;
    function setUpDb(){
        return new Promise((resolve, reject) => {
            if(db){
                resolve();
                return;
            }
            let dbreq = indexedDB.open('rumcajsDb', 1);
            dbreq.onupgradeneeded = event =>{
                db = event.target.result;
                let userObjectStore = db.createObjectStore("user", { keyPath: "id", autoIncrement: true });
                userObjectStore.createIndex('publicKey','publicKey', {unique: true});
                let friendsObjectStore = db.createObjectStore("friends", { keyPath: "id", autoIncrement: true }); 
                friendsObjectStore.createIndex('publicKey','publicKey', {unique: true});
 
            }
            dbreq.onsuccess = event =>{
                db = event.target.result;
                resolve();
            }
            dbreq.onerror = event =>{
                reject("error connecting to rumcajsDb" + " DB details:\n" + event);
            }
        });
    }

    //Update DB
    function addNewFriend(friend){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("friends", 'readwrite');
            let store = tx.objectStore("friends");
            store.add(friend);
            tx.oncomplete = resolve();
            tx.onerror = error =>{
                reject('error storing friend' + error.target.errorCode);
            }
        });
    }
    function addNewUser(user){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", 'readwrite');
            let store = tx.objectStore("user");
            store.add(user);
            tx.oncomplete = resolve();
            tx.onerror = error =>{
                reject('error storing friend' + error.target.errorCode);
            }
        });
    }
    function addMessage(friend, message){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction('friends', 'readwrite');
            let store = tx.objectStore('friends');
            let getReq = store.get(friend.publicKey);
            getReq.onsuccess = event =>{
                let friend = event.target.result;
                friend.messagesList.push(message);
                let updateReq = store.put(friend);
                updateReq.onerror = error =>{
                    console.error('error adding message' + error.target.errorCode);
                }
            }
            tx.oncomplete = resolve();
            tx.onerror = reject();
        });
    }

    //Query db
    function getUser(){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", "readonly")
            let store = tx.objectStore("user");
            let getReq = store.get(1);
            getReq.onsuccess = event =>{
                let user = event.target.result;
                resolve(user);
            }
        });
    }
    
    function getFriend(friendsPublicKey){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("friends", "readonly")
            let store = tx.objectStore("friends");
            let index = store.index('publicKey');
            let getReq = index.get(friendsPublicKey)
            getReq.onsuccess = event =>{
                let data = event.target.result;
                resolve(data);
            }
        });
    }

    //Quering user's info
    function getUserPublicKey(user){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", "readonly")
            let store = tx.objectStore("user");
            let getReq = store.get(1);
            getReq.onsuccess = event =>{
                let data = event.target.result.publicKey;
                resolve(data);
            }
        });
    }
    
    function getUserPrivateKey(user){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", "readonly")
            let store = tx.objectStore("user");
            let index = store.index('publicKey');
            let getReq = index.get(user.publicKey);
            getReq.onsuccess = event =>{
                let data = event.target.result.privateKey;
                resolve(data);
            }
        });
    }
    
    function getUserIpAddress(user){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", "readonly")
            let store = tx.objectStore("user");
            let getReq = store.get(user.publicKey);
            getReq.onsuccess = event =>{
                let data = event.target.result.ipAddress;
                resolve(data);
            }
        });
    }
    
    function getUserAlPortNumber(user){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("user", "readonly")
            let store = tx.objectStore("user");
            let getReq = store.get(user.publicKey);
            getReq.onsuccess = event =>{
                let data = event.target.result.AlPort;
                resolve(data);
            }
        });
    }


    function getMessagessWithFriend(friend){
        return new Promise((resolve, reject) =>{
            let tx = db.transaction("friends", "readonly")
            let store = tx.objectStore("friends");
            let getReq = store.get(friend.publicKey);
            getReq.onsuccess = event =>{
                let data = event.target.result.messagesList;
                resolve(data);
            }
        });
    }