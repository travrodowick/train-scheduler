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
    var trainStart = $("#first-train-input").val().trim();
    var trainRate = $("#frequency-input").val().trim();

    console.log('*****', trainStart)

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

    // train Info
    console.log('trainName = ', trainName);
    console.log('trainDest = ', trainDest);
    console.log('trainStart = ', trainStart);
    console.log('trainRate = ', trainRate);

    // var maxMoment = moment.max(moment(), trainStart)

    function toBeNamed() {
        if (trainStart < moment()) {
            var futureTrain = trainStart - moment()
        }
        console.log('futureTrain = ', futureTrain)
    }



    //format first train time
    var trainTime = trainStart;

    // moment.unix(trainStart).format("hh:mm");

    //calculate difference between times
    var difference = moment().diff(moment(trainTime), "minutes");

    console.log('diff', difference)

    //time apart
    var trainRemain = difference % trainRate;

    //minutes away 
    var minAway = trainRate - trainRemain;

    //next arrival time
    var nextArrival = moment().add(minAway, "minutes").format('hh:mm');

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainRate),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)
    );

    // Append the new row to the table
    $("#train-schedule-table").append(newRow);
});