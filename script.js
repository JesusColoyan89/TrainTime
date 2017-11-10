  
  var config = {
    apiKey: "AIzaSyAIJFTi6lnKb8gFiW9JfGVJBVz4HE-aTbg",
    authDomain: "traintime-8f5ae.firebaseapp.com",
    databaseURL: "https://traintime-8f5ae.firebaseio.com",
    projectId: "traintime-8f5ae",
    storageBucket: "",
    messagingSenderId: "762843015450"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainTime1 = 0;
  var trainTime2 = 0;
  
 
  $("#addTrain").on("click", function() {
   
    event.preventDefault();

 
    database.ref().push({
      trainName: $("#addTrainName").val(),
      trainDestination: $("#addTrainDestination").val(),
      trainTime2: $("#addTrainFrequency").val(),
      trainTime1: $("#addTrainFirstTrainTime").val(),
      
    });
  });

  database.ref().on('child_added', function(snapshot) {

    var td1 = $("<td>");
    td1.attr("id", "tdtrainName");
    
    var td2 = $("<td>");
    td2.attr("id", "tdtrainDestination");
    
    var td3 = $("<td>");
    td3.attr("id", "tdtrainTime2");
    
    var td4 = $("<td>");
    td4.attr("id", "tdtrainTime1");
    
    var td5 = $("<td>");
    td5.attr("id", "tdtrainMinLeft");
  


    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDestination);
    console.log(snapshot.val().trainTime2);
    console.log(snapshot.val().trainTime1);
  
    var trs = $("<tr>");
    
    
    var timeNow = moment().format('HH:mm:ss');

    console.log(timeNow);

   
  
  var a = timeNow.split(':');
  var secondsNow = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);  
  console.log(secondsNow);
  
  
  var b = snapshot.val().trainTime1.split(':')

  var secondsTrain = ((+b[0]) * 60 * 60 + (+b[1]) * 60);  
  console.log(secondsTrain);  

  var nextTrain = (secondsNow-secondsTrain) 

  console.log(nextTrain);

 

  var minToNextTrain = (nextTrain/((snapshot.val().trainTime2)*60));

  var nextTrainT = Math.ceil(minToNextTrain);

  var mNextTrain = (nextTrainT * ((snapshot.val().trainTime2)))

  var trainF = (mNextTrain * 60) + (secondsTrain);

  var minLeftTrain = ((trainF - secondsNow)/ 60);

  var nextTrainTrue = Math.ceil(Math.abs(minLeftTrain));

  var nextTrainHHMM = moment().startOf('day')
                               .seconds(trainF)
                              .format('HH:mm');
  console.log(nextTrainHHMM);


  td1.append(snapshot.val().trainName);
    td2.append(snapshot.val().trainDestination);
    td3.append(snapshot.val().trainTime2);
    td4.append(nextTrainHHMM);
    td5.append(nextTrainTrue);
    trs.append(td1, td2, td3, td4, td5);

    
    $(".table").append(trs);
  

  }, function(errorObject) {
  });

