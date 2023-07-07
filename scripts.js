var makeSelect = document.getElementById("makeSelect");
var modelSelect = document.getElementById("modelSelect");
var searchButton1 = document.getElementById('searchButton');
function updateModelOptions() {
    var selectedMake = makeSelect.value;
    
    // Reset the model options
    modelSelect.innerHTML = "<option value=''>Select Model</option>";
    
    if (selectedMake === "Acura") {
      var acuraModels = ["TLX", "RSX"];
      addOptions(modelSelect, acuraModels);
    } else if (selectedMake === "BMW") {
      var bmwModels = ["335i", "340i", "M340i"];
      addOptions(modelSelect, bmwModels);
    } else if (selectedMake === "Buick") {
      var buickModels = ["Encore GX", "Enclave", "Enclave ST"];
      addOptions(modelSelect, buickModels);
    } else if (selectedMake === "Cadillac") {
      var cadillacModels = ["AT4", "CTSV"];
      addOptions(modelSelect, cadillacModels);
    }
  }
  
  function addOptions(selectElement, options) {
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement("option");
      option.text = options[i];
      selectElement.add(option);
    }
  }


// Add an event listener to the search button
searchButton1.addEventListener('click', () => {
  // Get the selected values
  const make = makeSelect.value;
  const model = modelSelect.value;
  const pickupLocation = document.getElementById('pickupLocationSelect').value;

  // Create the payload object
  const payload = {
    make: make,
    model: model,
    location: pickupLocation
  };
  console.log(payload)
  const queryString = new URLSearchParams(payload).toString();
  // Send the POST request
  fetch(`http://127.0.0.1:5000/cars?${queryString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(payload)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      console.log(data);
      // Perform any necessary actions with the response data
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
});