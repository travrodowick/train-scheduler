//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb1Gko8o3Gq3SmTiOukpjngbmuGKGPsQ4",
    authDomain: "employeedatamanagement-58847.firebaseapp.com",
    databaseURL: "https://employeedatamanagement-58847.firebaseio.com",
    projectId: "employeedatamanagement-58847",
    storageBucket: "employeedatamanagement-58847.appspot.com",
    messagingSenderId: "234103386340",
    appId: "1:234103386340:web:8e5c89016861b15a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#first-train-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainRate = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        startTime: trainStart,
        frequency: trainRate
    };

    // Uploads train data to the database
    database.ref().push(newTrain);


    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().startTime;
    var trainRate = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainRate);

    // Prettify the train start
    // var trainStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        // $("<td>").text(trainStartPretty),
        // $("<td>").text(empMonths),
        $("<td>").text(trainRate),
        // $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#train-schedule-table").append(newRow);
});