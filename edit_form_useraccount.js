let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}

const url = new URL(window.location.href);
let index = url.searchParams.get("index");
console.log(typeof index);
let customerdetail = JSON.parse(localStorage.getItem("detail")) || [];
console.log(customerdetail[index]);


document.getElementById("user_contact_number").value =
  customerdetail[index].phone_number;
document.getElementById("user_min_maintain_balance").value =
  customerdetail[index].min_maintain_balance;
document.getElementById("user_min_withdrawal").value =
  customerdetail[index].min_withdrawal;
document.getElementById("user_max_withdrawal").value =
  customerdetail[index].max_withdrawal;
document.getElementById("user_total_limit").value =
  customerdetail[index].total_limit;
let user_exist = 0;





function editUserDetail() {
  if (document.getElementById("user_contact_number").value.length < 10) {
    alert("please enter valid phone number");
  }  else {
    customerdetail[index].phone_number = document.getElementById(
      "user_contact_number"
    ).value;
  }
  if (document.getElementById("user_min_maintain_balance").value < 500) {
    alert("please enter amount above 500");
  } else {
    customerdetail[index].min_maintain_balance = document.getElementById(
      "user_min_maintain_balance"
    ).value;
  }
  if (document.getElementById("user_min_withdrawal").value < 100) {
    alert("please enter min withdrawal amount above 100");
  } else {
    customerdetail[index].min_withdrawal = document.getElementById(
      "user_min_withdrawal"
    ).value;
  }
  if (document.getElementById("user_max_withdrawal").value < 100) {
    alert("max withdrawal amount always greater than  100");
  } else {
    customerdetail[index].max_withdrawal = document.getElementById(
      "user_max_withdrawal"
    ).value;
  }

  if( document.getElementById("user_total_limit").value < document.getElementById("user_min_maintain_balance").value ){
    alert("Limit should always gretter than min maintaince balance  ")
  }else{
        customerdetail[index].total_limit =
         document.getElementById("user_total_limit").value;
  }
    alert("Account Settings changes saved  successfully");
  localStorage.setItem("detail", JSON.stringify(customerdetail));
}


// here we have used user_exist variable to check  the user exist in our database or not 
// if the user exist in our db then only we proceed further 

let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  for (let i = 0; i < customerdetail.length; i++) {
    if (
      document.getElementById("user_contact_number").value ==
      customerdetail[i].phone_number
    ) {
      user_exist = 1;
      console.log("user already exist");
      break;
    }
  }
   
   if(user_exist != 0){
        
       editUserDetail();
     
   }
  
  window.location.href = "totalAccount_table.html";
});
