function saveElementValue(name, classList, element) {
    if("select" == name) {
        var innerHTML = "";
        var values = element.value.split(", ");
        for(let i = 0; i < values.length; i++) {
            innerHTML += "<option value='" + values[i] + "'>" +
                values[i] +
                "</option>";
        }
    } else {
        var innerHTML = element.value;
    }
    element.outerHTML = 
        "<" + name + " class='" + classList + "'>" + 
        innerHTML + 
        "</" + name + ">";
}

function editElementValueCombo(element) {
    var options = element.previousElementSibling.getElementsByTagName('option');
    var optionElements = "";
    for(let i = 0; i < options.length; i++) {
        optionElements += options[i].value + ", ";
    }
    return optionElements.substring(0, optionElements.length - 2);
}

function editElementValue(element) {
    var psLocalName = element.previousElementSibling.localName;
    var txt = element.previousElementSibling.innerText;
    var classList = element.previousElementSibling.classList;
    var classListString = classList.value;
    
    if("select" == element.previousElementSibling.localName) 
        txt = editElementValueCombo(element);
    
    if("p" == element.previousElementSibling.localName)
        element.previousElementSibling.outerHTML = "<textarea class='" + classListString + "'>";
    else
        element.previousElementSibling.outerHTML = "<input type='text' class='" + classListString + "'></textarea>";
    
    element.previousElementSibling.value = txt;
    element.previousElementSibling.onblur = function() {
        saveElementValue(psLocalName, classListString, element.previousElementSibling);
    };
    element.previousElementSibling.focus();
    element.previousElementSibling.select();
}

function checkEditElement(element) {
    var localElement = element;
    while("button" != localElement.localName) {
        localElement = localElement.parentElement;
    }
    if("svg" == localElement.previousElementSibling.localName) {
        while("select" != localElement.previousElementSibling.localName) {
            localElement = localElement.previousElementSibling;
        }
    }
    editElementValue(localElement);  
}

function addEditListeners() {
  var editButtons = document.getElementsByClassName("btn-edit");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function(event) {
        checkEditElement(event.target || event.srcElement);
    });
  }
  document.getElementById("product__sidebar-admin-edit-button").addEventListener("click", function(event) {
    if("Save" != document.getElementById("product__sidebar-admin-edit-button").innerText) {
        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].style.display = "flex";
        }
        var headerEditButtons = document.getElementsByClassName("btn-edit-header");
        for (let i = 0; i < headerEditButtons.length; i++) 
            headerEditButtons[i].style.display = "flex";
        document.getElementById("product__sidebar-admin-edit-button").innerText = "Save";
        document.getElementsByClassName("product__sidebar-add")[0].style.display = "none";
    } else {
        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].style.display = "none";
        }
        var headerEditButtons = document.getElementsByClassName("btn-edit-header");
        for (let i = 0; i < headerEditButtons.length; i++) 
            headerEditButtons[i].style.display = "none";
        document.getElementById("product__sidebar-admin-edit-button").innerText = "Enable Editing";
        document.getElementsByClassName("product__sidebar-add")[0].style.display = "flex";
    }
  });
}

window.addEventListener("load",function() {
  addEditListeners();
});


