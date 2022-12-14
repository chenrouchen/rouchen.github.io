const url = "http://localhost:3000/";
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const designer = document.querySelector('#yes');
const noDesigner = document.querySelector('#no')
const singUpBtn = document.querySelector('.singUpBtn');
const area = document.querySelector('#area');

//註冊
singUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    singUp();
})

function singUp() {
    if (userName.value.trim() === "" || email.value.trim() === "" || area.value === "") {
        alert(`請填寫正確`);
        return
    } else if (password.value !== password2.value) {
        alert(`密碼錯誤`);
        return
    }
    let role;
    if (designer.checked === true) {
        role = "designer";
    } else if (noDesigner.checked === true) {
        role = "";
    }
    axios.post(`${url}signup`, {
        "name": userName.value,
        "email": email.value,
        "password": password.value,
        "area": area.value,
        "img": "",
        "role": role
    })
        .then(function (response) {
            alert(`恭喜${userName.value},註冊成功~`);
            if (response.data.role === "designer") {
                let userId = response.data.id;
                designerPost(userId);
            }
            document.location.href = `http://127.0.0.1:5500/index.html`;
        })
        .catch(function (err) {
            console.log(err);
        });
}
function designerPost(userId) {
    axios.post(`${url}designers`, {
        userId
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}