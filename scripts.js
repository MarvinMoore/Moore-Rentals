function updateModelOptions() {
    var makeSelect = document.getElementById("makeSelect");
    var modelSelect = document.getElementById("modelSelect");
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