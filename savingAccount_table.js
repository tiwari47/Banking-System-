// let btn_create_table = document.getElementById("btn_create_table");
let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}
let customer_detail_table = document.getElementById(
  "customer_detail_table_body"
);


let customer_detail = JSON.parse(localStorage.getItem("detail")) || [];

let saving = customer_detail.filter((e) => e.account_type == "saving");
console.log(saving);
console.log(saving);
saving.forEach((e,index) => {
    let row = document.createElement("tr");
    let slno = document.createElement("td");
    slno.textContent = index+1;
    row.append(slno);

    let acno = document.createElement("td");
    acno.textContent = e.account_number;
    row.append(acno);
     
    let name = document.createElement("td");
    name.textContent = e.name;
    row.append(name);

    let email = document.createElement("td");
    email.textContent = e.email;
    row.append(email);
    
  

  let phone_number = document.createElement("td");
  phone_number.textContent = e.phone_number;
  row.append(phone_number);

  let age = document.createElement("td");
  age.textContent = e.age;
  row.append(age);

  let aadhar_number = document.createElement("td");
  aadhar_number.textContent = e.aadhar_number;
  row.append(aadhar_number);

  let pan_number = document.createElement("td");
  pan_number.textContent = e.pan_number;
  row.append(pan_number);

  let account_type = document.createElement("td");
  account_type.textContent = e.account_type;
  row.append(account_type);

  let max_withdrawal = document.createElement("td");
  max_withdrawal.textContent = e.max_withdrawal;
  row.append(max_withdrawal);

  let min_withdrawal = document.createElement("td");
  min_withdrawal.textContent = e.min_withdrawal;
  row.append(min_withdrawal);

  let total_limit = document.createElement("td");
  total_limit.textContent = e.total_limit;
  row.append(total_limit);

  let acstatus = document.createElement("td");
  acstatus.textContent = e.account_status == 0 ? "Active" : "Block";
  row.append(acstatus);
  customer_detail_table.append(row);
    
})
