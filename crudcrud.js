const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const myForm = document.getElementById('my-form');
const userList = document.getElementById('users');
const deletebtn = document.getElementById('deleteButton')


myForm.addEventListener('submit', onSubmit);
userList.addEventListener('click', function (e) {

    const targetElement = e.target;
    if (targetElement.id === 'deleteButton') {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are You Sure??')) {
                var li = e.target.parentElement;
                const delValue = li.id
                userList.removeChild(li);
                axios.delete(`https://crudcrud.com/api/c37feade4ec44a4aa90006531b36ca76/userData/${delValue}`)
            }
        }
    } else if (targetElement.id === 'editButton') {
        if (e.target.classList.contains('edit')) {
            if (confirm('Are You Sure??')) {
                var li = e.target.parentElement;
                nameInput.value = li.firstChild.textContent;
                emailInput.value = li.firstChild.nextSibling.nextSibling.textContent
                phoneInput.value = li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.textContent
                const delValue = li.id
                userList.removeChild(li);
                axios.delete(`https://crudcrud.com/api/c37feade4ec44a4aa90006531b36ca76/userData/${delValue}`)
            }
        }

    }
});

function createLiElement(userDetails) {
    const li = document.createElement('li');

    const name = document.createTextNode(userDetails.name);
    const email = document.createTextNode(userDetails.email);
    const phone = document.createTextNode(userDetails.phone);
    const hyphen1 = document.createTextNode('--');
    const hyphen2 = document.createTextNode('--');
    li.id = userDetails._id;
    li.appendChild(name);
    li.appendChild(hyphen1);
    li.appendChild(email);
    li.appendChild(hyphen2);
    li.appendChild(phone);

    var delbtn = document.createElement('button')
    delbtn.type = 'button'
    delbtn.className = 'delete';
    delbtn.id = 'deleteButton'
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn);

    var editBtn = document.createElement('button')
    editBtn.type = 'button'
    editBtn.className = 'edit';
    editBtn.id = 'editButton'
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);

    userList.appendChild(li);
}

function onSubmit(e) {
    e.preventDefault();
    //creating an object with user details
    let userDetails = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
    }


    axios.post("https://crudcrud.com/api/c37feade4ec44a4aa90006531b36ca76", userDetails)
        .then((response) => {
            createLiElement(response.data);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
        });


    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
}

document.addEventListener('DOMContentLoaded', loadServerDetais);

function loadServerDetais() {
    axios.get("https://crudcrud.com/api/c37feade4ec44a4aa90006531b36ca76").then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                createLiElement(response.data[i])
            }
            if (response.data.length === 0) {
                document.body.innerHTML = document.body.innerHTML + "<h4>No Appointment Data Available</h4>"
            }
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
        });
}