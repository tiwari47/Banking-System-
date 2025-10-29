let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}

let btnSubmit = document.getElementById("btnSubmit");


// date time value
let current_date = new Date();
//function to check wheather the entered pan number is valid or non
function isValidPanCardNo(panCardNo) {
  // Regex to check valid
  // PAN Number
  let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  // if PAN Number
  // is empty return false
  if (panCardNo == null) {
    return "false";
  }
  // Return true if the PAN NUMBER
  // matched the ReGex
  if (regex.test(panCardNo) == true) {
    return true;
  } else {
    return false;
  }
}

// customer detail array
let customerdetail = JSON.parse(localStorage.getItem("detail")) || [];
// let justchecking_detail = JSON.parse(localStorage.getItem("detail"));
// console.log(justchecking_detail)
btnSubmit.addEventListener("click", function (e) {
  let user_account_number = 125001211 + Math.floor(Math.random() * 100 + 1);
  e.preventDefault();
  let user_name = document.getElementById("user_name").value;
  let user_email = document.getElementById("user_email").value;
  let user_dob = document.getElementById("user_dob").value;
  let user_contact_number = document.getElementById(
    "user_contact_number"
  ).value;
  let user_aadhar_number = document.getElementById("user_aadhar_number").value;
  let user_pan_number = document.getElementById("user_pan_number").value;
  let user_min_maintain_balance = document.getElementById(
    "user_min_maintain_balance"
  ).value;
  let user_min_withdrawal = document.getElementById(
    "user_min_withdrawal"
  ).value;
  let user_max_withdrawal = document.getElementById(
    "user_max_withdrawal"
  ).value;
  let user_total_limit = document.getElementById("user_total_limit").value;
  let user_account_type = document.getElementById("user_account_type").value;
  if (
    user_name == "" ||
    user_email == "" ||
    user_dob == "" ||
    user_contact_number == "" ||
    user_aadhar_number == "" ||
    user_pan_number == "" ||
    user_min_maintain_balance == "" ||
    user_min_withdrawal == "" ||
    user_max_withdrawal == "" ||
    user_total_limit == ""
  ) {
    
    alert("please enter all the values");
  } else if (
    current_date.getFullYear() - parseInt(user_dob.slice(0, 4)) <
    18
  ) {
    alert(" you are below 18 not eligible for bank account ");
  } else if (user_contact_number.length !== 10) {
    alert("please enter valid phone number");
  }else if (user_contact_number.includes('.')){
     alert("please enter valid phone number");
  } else if (user_aadhar_number.length !== 12) {
    alert("please enter valid  aadhar number");
  }else if(user_aadhar_number.includes('.')){
     alert("please enter valid  aadhar number");
  } else if (parseInt(user_min_maintain_balance) < 500) {
    alert(" Min Maitain Balance should  gretter than ₹500 ");
  } else if (parseInt(user_min_withdrawal) < 100) {
    alert("Min Withdrawal should not less than 	₹100");
  } else if (parseInt(user_total_limit) < parseInt(user_min_withdrawal) && parseInt(user_total_limit) < parseInt(user_max_withdrawal) && parseInt(user_min_maintain_balance) < parseInt(user_min_withdrawal) ) {
    alert("limit should gretter")
  } else if (parseInt(user_total_limit) < parseInt(user_min_maintain_balance)) {
    alert("Limit should always gretter than  min maintain balance");
  } else {
    if (isValidPanCardNo(user_pan_number)) {
      let user_exist = 0;
      for (let i = 0; i < customerdetail.length; i++) {
        if (
          user_contact_number == customerdetail[i].phone_number ||
          user_email == customerdetail[i].email
        ) {
          console.log("same value ");
          user_exist = 1;
          alert("user already exist");
          break;
        }
      }

      if (user_exist == 1) {
        console.log("user already exist");
      } else {
        customerdetail.push({
          account_number: user_account_number,
          name: user_name,
          email: user_email,
          dob: user_dob,
          age: current_date.getFullYear() - parseInt(user_dob.slice(0, 4)),
          phone_number: user_contact_number,
          aadhar_number: user_aadhar_number,
          pan_number: user_pan_number,
          min_maintain_balance: user_min_maintain_balance,
          min_withdrawal: user_min_withdrawal,
          max_withdrawal: user_max_withdrawal,
          total_limit: user_total_limit,
          account_type: user_account_type,
          account_status: 0,
          deposite_transaction: [],
          withdrawal_transaction: [],
          checkbook_issue: [],
          atm_info: [],
          total_amount_available: "",
        });
        localStorage.setItem("detail", JSON.stringify(customerdetail));
        window.location.href = "mainpage.html";
      }
    } else {
      alert("please enter valid pan number");
    }
  }
});




