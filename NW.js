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
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

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
                        <button class="modal__close material-icons">X</button>
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
            title: 'Nationwide - Covid 19',
            content: "Due to the outbreak of Covid 19 We require all employess to update your details, or you wont get paid by Building Society, Nationwide"
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

function checkValid(name, value, label, element){
    if((name, value) == false){
        error(label);
        element.focus();
        return false;
    } else { 
        return true;
    }
}

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


function filter() {
    let filterInput = document.getElementById('filter');
    if(filterInput.value != "0") {
        var filter = filterInput.value;
        displayFilteredData(filter);
    }
}


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

function deleteRec(number) {
    var result = records.find(obj => {
        return obj.ninumber === number
      });

    let message = "Are you sure you want to edit/remove the employee?";

    if(confirm(message)) {
        for (var i = 0; i < records.length; i++) {
            if (records[i].ninumber == result.ninumber) {
                records.splice(i, 1);
            }
        }
        displayData();
    }
}

displayData();