let db;

// Open or create a database
let request = indexedDB.open("FinanceDB", 1);

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully!");
};

request.onerror = function (event) {
    console.error("Database error:", event.target.error);
};

request.onupgradeneeded = function (event) {
    db = event.target.result;
    
    // Create a table (object store) to store user data
    let objectStore = db.createObjectStore("users", { keyPath: "id" });

    console.log("Database setup complete.");
};

// Function to save data
function saveData() {
    let userId = parseInt(document.getElementById("userId").value);
    let income = parseFloat(document.getElementById("income").value);
    let savings = parseFloat(document.getElementById("savings").value);
    let investments = parseFloat(document.getElementById("investments").value);

    if (!userId || !income || !savings || !investments) {
        alert("Please fill all fields!");
        return;
    }

    let transaction = db.transaction(["users"], "readwrite");
    let store = transaction.objectStore("users");

    let userData = { id: userId, income: income, savings: savings, investments: investments };

    let request = store.put(userData);

    request.onsuccess = function () {
        alert("Data saved successfully!");
    };

    request.onerror = function (event) {
        alert("Error saving data!");
        console.error(event.target.error);
    };
}

// Function to get data
function getData() {
    let userId = parseInt(document.getElementById("userId").value);
    
    if (!userId) {
        alert("Please enter User ID to fetch data!");
        return;
    }

    let transaction = db.transaction(["users"], "readonly");
    let store = transaction.objectStore("users");

    let request = store.get(userId);

    request.onsuccess = function () {
        if (request.result) {
            document.getElementById("output").innerText = JSON.stringify(request.result, null, 2);
        } else {
            alert("No data found for this User ID.");
        }
    };

    request.onerror = function (event) {
        alert("Error retrieving data!");
        console.error(event.target.error);
    };
}

// Function to delete data
function deleteData() {
    let userId = parseInt(document.getElementById("userId").value);
    
    if (!userId) {
        alert("Please enter User ID to delete data!");
        return;
    }

    let transaction = db.transaction(["users"], "readwrite");
    let store = transaction.objectStore("users");

    let request = store.delete(userId);

    request.onsuccess = function () {
        alert("Data deleted successfully!");
        document.getElementById("output").innerText = "";
    };

    request.onerror = function (event) {
        alert("Error deleting data!");
        console.error(event.target.error);
    };
}
