const url = "http://localhost:3000/";
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const logInBtn = document.querySelector('.logInBtn');

logInBtn.addEventListener('click', logIn)

function logIn() {
    axios.post(`${url}login`, {
        "email": email.value,
        "password": password.value
    })
        .then((res) => {
            alert(`HI~${res.data.user.name},登入成功`)
            let token = res.data.accessToken;
            let id = res.data.user.id;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('id', id);
            document.location.href = `http://127.0.0.1:5500/user.html`;
        }).catch((err) => {
            console.log(err)
            alert('帳號或密碼錯誤')
        });
}