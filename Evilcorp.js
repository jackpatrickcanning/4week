const inputs = ['ninumber', 'fullname', 'phone', 'address', 'department'];
function display(item) {
    let parent = document.getElementById('tableBody'); 
    let record = document.createElement('tr');
    let NIN = document.createElement('td');
    NIN.innerText = item.ninumber; 
    let name = document.createElement('td');
    name.innerText = item.fullname; 
    let phone = document.createElement('td');
    phone.innerText = item.phone; 
    let address = document.createElement('td');
    address.innerText = item.address;
    let department = document.createElement('td');
    department.innerText = item.department;
    let editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'edit_btn';
    editBtn.innerHTML = 'Edit';
    editBtn.onclick = function() {
        editRec(item.ninumber);
    }

    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete_btn';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = function() {
        deleteRec(item.ninumber);
    }

    let actions = document.createElement('td');
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);


    record.appendChild(NIN);
    record.appendChild(name);
    record.appendChild(phone);
    record.appendChild(address);
    record.appendChild(department);
    record.appendChild(actions);

    parent.appendChild(record);
}

function displayData() {
    document.getElementById('tableBody').innerHTML = "";
    
    for (let i = 0; i < records.length; i++) {
        display(records[i]);
    }
}

function displayFilteredData(filter) {
    document.getElementById('tableBody').innerHTML = "";

    if(filter == "All") {
        displayData();
    } else {
        for (let i = 0; i < records.length; i++) {
            if(records[i].department == filter) {
                display(records[i]);
            }
        }
    }
}

// If there is an error message on the input, remove it when something is typed into the input
function clearError(name){
    let current = document.getElementById(name);
    if(current.children.length == 1){
        current.lastChild.style.visibility = "hidden";
    }
}

// Validate input with swicth statement based on input type
function validate(inputType, element) {
    if(element != null && element.trim() != "" ) {
        switch (inputType) {
            case 'ninumber':
                if(element.match(/^[0-9a-zA-Z]+$/) && element.length <= 9) {
                    return true;
                }
                return false;
            case 'fullname':
                return true;
            case 'phone':
                if(!element.match(/^[A-Za-z]+$/)) {
                    return true;
                }
                return false;
            case 'address':
                return true;
            case 'department':
                return true;
        }
    } else {
        return false;
    }
}

// add error message to input if invalid data added, if there already was an error, make it visible again
function error(parent) {
    if (parent.children.length == 0) {
        let label = document.createElement('span');
        label.setAttribute("class", "error");
        label.innerHTML = " ** Please input a valid value **";
        parent.appendChild(label);
    } else {
        parent.lastChild.style.visibility = "visible";
    }
}

// if the input was not valid, add error message
function checkValid(name, value, label, element){
    if(validate(name, value) == false){
        error(label);
        element.focus();
        return false;
    } else {
        return true;
    }
}

// Add new data to the JSON 
function addRec(){
    const form = document.getElementById('form');
    var addedValues = [];

    for(let i = 0; i < inputs.length; i++){
        let element = form.elements.namedItem(inputs[i]);
        let value = element.value;
        let label = document.getElementById(inputs[i]);
        if(checkValid(inputs[i], value, label, element)) {
            addedValues.push(value);
        } else {
            break;
        }
    }

    if(addedValues.length == 5) {
        // Turn the added values into an object and push it into the record.
        var result = {};
        result = Object.assign(...inputs.map((k, i) => ({[k]: addedValues[i]})));

        let edit = false;

        for(let x = 0; x < records.length; x++) {
            if (result.ninumber == records[x].ninumber) {
                edit = true;
                records[x] = result;
            }
        }

        if(edit == false) {
            records.push(result);
        }

        document.getElementById('form').reset();
        displayData();
    }
}

// Hides / displays form, alters title & button text depending on desired action
function toggleVisibility(action) {
    document.getElementById('form').reset();
    var form = document.getElementById('form_cont');
    var title = document.getElementById('form_title');
    var button = document.getElementById('action');

    if (form.style.display === 'none') {
      form.style.display = 'block';
      title.innerText = action + " Employee";
      button.innerText = action;
    } else {
      form.style.display = 'none';
    }
}

// filter data based on department
function filter() {
    let filterInput = document.getElementById('filter');
    if(filterInput.value != "0") {
        var filter = filterInput.value;
        displayFilteredData(filter);
    }
}

// edits existing entry
function editRec(number) {
    var result = records.find(obj => {
        return obj.ninumber === number
      });

    toggleVisibility("Edit");
    var form = document.getElementById('form');

    for(let i = 0; i < inputs.length; i++) {
        let element = form.elements.namedItem(inputs[i]);
        element.value = result[inputs[i]];
    }
}

// deletes selected record and removes from visible
function deleteRec(number) {
    var result = records.find(obj => {
        return obj.ninumber === number
      });

    let message = "Are you sure you want to delete the entry for " + result.fullname + "?";

    if(confirm(message)) {
        for (var i = 0; i < records.length; i++) {
            if (records[i].ninumber == result.ninumber) {
                records.splice(i, 1);
            }
        }
        displayData();
    }
}
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
const ModalWindow = {
    init() {
        document.body.addEventListener("click", e => {
            if (e.target.classList.contains("modal__close")) {
                this.closeModal(e.target);
            }
        });
      
      this.openModal();
    },

    getHtmlTemplate(modalOptions) {
        return `
            <div class="modal__overlay">
                <div class="modal__window">
                    <div class="modal__titlebar">
                        <span class="modal__title">${modalOptions.title}</span>
                        <button class="modal__close material-icons">close</button>
                    </div>
                    <div class="modal__content">
                        ${modalOptions.content}
                    </div>
                </div>
            </div>
        `;
    },

    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Evil Corp - Covid 19',
            content: "Our plan worked, Covid 19 is now a thing, so just a heads up to all henchman and employees a like, you're evil I like that. Remember that all HR Work is to carry on as normal so pleaase update your details, or you wont get paid for your evilness!!!"
        }, modalOptions);

        const modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },

    closeModal(closeButton) {
        const modalOverlay = closeButton.parentElement.parentElement.parentElement;
        document.body.removeChild(modalOverlay);
    }
};

document.addEventListener("DOMContentLoaded", () => ModalWindow.init());

displayData();