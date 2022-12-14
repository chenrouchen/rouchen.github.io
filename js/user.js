const url = "http://localhost:3000/";
let id = localStorage.getItem('id');
let token = localStorage.getItem('accessToken');
let userData;
function getUser() {
    axios.get(`${url}600/users/${id}`, { "headers": { "authorization": `Bearer ${token}` } })
        .then((res) => {
            userData = res.data;
            render();
        }).catch((err) => {
            console.log(err.data)
        });

}
getUser();

const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const area = document.querySelectorAll('option');
const userImg = document.querySelector('#userImg')
function render() {
    userName.value = userData.name;
    email.value = userData.email;
    area.forEach(i => {
        if (i.label === userData.area) {
            i.setAttribute('selected', "selected")
        }
    });
    userImg.setAttribute('src', userData.img)
}
const imgBtn = document.querySelector('#imgBtn');
const img = document.querySelector('#img');
imgBtn.addEventListener('click', changeImg);

function changeImg() {
    axios.patch(`${url}600/users/${id}`, {
        "img": img.value
    }, { "headers": { "authorization": `Bearer ${token}` } })
        .then((res) => {
            userData = res.data;
            render();
        }).catch((err) => {
            console.log(err.data)
        });
}

const btn = document.querySelector('#user');
const select = document.querySelector('select');
btn.addEventListener('click', changeUser);
function changeUser() {
    axios.patch(`${url}600/users/${id}`, {
        "name": userName.value,
        "area": select.value
    }, { "headers": { "authorization": `Bearer ${token}` } })
        .then((res) => {
            userData = res.data;
            render();
        }).catch((err) => {
            console.log(err.data)
        });
}