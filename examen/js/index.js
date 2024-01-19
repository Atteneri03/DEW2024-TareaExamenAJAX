const inputLogin = document.getElementsByName("login")[0];
const inputPassword = document.getElementsByName("password")[0];

const formLogin = document.forms[0];
formLogin.addEventListener("submit", e=> {
  if(inputLogin.value && inputPassword.value){
    localStorage.login = inputLogin.value;
    //Se almacena hasta que se cierrea el navegador
    sessionStorage.password = inputPassword.value;
    // inputLogin.value = "";
    // inputPassword.value = "";
    inputLogin.remove();
    inputPassword.remove();
  } else {
    console.log("Rellena los campos login y password");
    //No deja que se acceda sin login y password
    e.preventDefault();

  }
});

formLogin.addEventListener("reset", e =>{
  localStorage.removeItem("login");
  sessionStorage.removeItem("password");
  document.getElementById("panel_password").classList.add("oculto");
});

function loadData(){
  inputLogin.value = localStorage.login ?? "";
  inputPassword.value = sessionStorage.password ?? "";
  if(inputLogin.value && inputPassword.value){
    document.getElementById("panel_password").classList.remove("oculto");
  }
}

loadData();

document.getElementById("cambiar_password").addEventListener("click", async (e)=>{
  const login = inputLogin.value;
  const oldPass = inputPassword.value;
  const newPass = document.getElementsByName("nueva")[0].value;
  console.log(login , oldPass, newPass);

  //POSTMAN
  let url = "http://localhost:3000/api/usuario/" + login;
  let passwords = {
    "old": oldPass,
    "new": newPass
  };

  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(passwords)
  }

  let response = await fetch(url, options);
  let json = await response.json();

  console.log(json);


});

