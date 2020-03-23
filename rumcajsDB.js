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
                let userObjectStore = db.createObjectStore("user", { keyPath: "publicKey" });
                let friendsObjectStore = db.createObjectStore("friends", { keyPath: "publicKey" });  
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


    //module.exports = createDb;