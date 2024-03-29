homeBtn = document.querySelector(".home");
homeBtn.onclick = () => {
  window.location.href = '../home';
}
myProfileBtn = document.querySelector(".myprofile");
myProfileBtn.onclick = () => {
  window.location.href = './';
}
editBtn = document.querySelector(".edit");
editBtn.onclick = () => {
  window.location.href = './edit';
}

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  localStorage['currentuser'] = '';
  localStorage['jwt'] = '';
  window.location.href = "../";
})

const firstLastName = document.querySelector('#name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const cellphone = document.querySelector('#cellphone');

let auth = 'Bearer ' + localStorage['jwt'];
let currentUser = {};
//fetch current user
fetch('https://olshop-kel-f-db.herokuapp.com/users/me', {
    method: 'GET',
    headers: {
      /*
      'Content-Type': 'application/json',
      'Connection' : 'keep-alive',
      */
      'Authorization': auth,
      }
    })
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(credential => {
        console.log(credential);
        currentUser = credential;
        localStorage['currentuser'] = currentUser;
        
        firstLastName.innerHTML = currentUser.firstname + " " + currentUser.lastname;
        username.innerHTML = currentUser.username;
        email.innerHTML = currentUser.email;
        cellphone.innerHTML = currentUser.cellphone;

        }).catch(e => {
        console.log(e);
        });

//add capacity to delete your own account.
deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  //fetch request delete with bearer token(logged in user only)
  fetch('https://olshop-kel-f-db.herokuapp.com/users/' + currentUser.id, {
    method: 'DELETE',
    body: {},
    headers: {
      //'Content-Type': 'application/json',
      'Connection' : 'keep-alive',
      'Authorization': auth,
    }
  })
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(credential => {
        console.log(credential);
        window.location.href = "../";
        return false; 
        }).catch(e => {
        console.log(e);
        alert("Anda Harus Login Terlebih Dahulu")
        });
})