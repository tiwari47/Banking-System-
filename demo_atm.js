let atm_info = JSON.parse(localStorage.getItem("atm_machine")) || [];
let customer_detail = JSON.parse(localStorage.getItem("detail")) || [];
const url = new URL(window.location.href);
let index = url.searchParams.get("index");
document.getElementById("output_atm_1").value = `WELCOME 🙏
 TO ATM NO:${atm_info[index].atm_number}`;
document.getElementById("output_atm_3").value = "Press   START Button";

let process_counter = 0;
let card_no_length = 0;
let output_atm_1 = document.getElementById("output_atm_1");
let output_atm_2 = document.getElementById("output_atm_2");
let output_atm_3 = document.getElementById("output_atm_3");
let output_atm_4 = document.getElementById("output_atm_4");

const btn_atm_cancel = document.getElementById("btn_atm_cancel");
const btn_atm_start = document.getElementById("btn_atm_start");
const btn_atm_submit = document.getElementById("btn_atm_submit");

let btn_1 = document.getElementById("btn_1");
let btn_2 = document.getElementById("btn_2");
let btn_3 = document.getElementById("btn_3");
let btn_4 = document.getElementById("btn_4");
let btn_5 = document.getElementById("btn_5");
let btn_6 = document.getElementById("btn_6");
let btn_7 = document.getElementById("btn_7");
let btn_8 = document.getElementById("btn_8");
let btn_9 = document.getElementById("btn_9");
let btn_0 = document.getElementById("btn_0");

let array_store_card_number = [];
let array_store_amount_user_entered = [];

let user_detail_index;

let ready_to_calculate_balance = 0;

// this function will return the index of user who's card number is valid and stored in local storage
function check_user_exist(num) {
  for (let i = 0; i < customer_detail.length; i++) {
    if (num == customer_detail[i].atm_info[0].atmnumber) {
      return i;
    }
  }
  return 404;
}

function amount_input_from_user() {
  output_atm_2.value = array_store_amount_user_entered.join("");
  ready_to_calculate_balance = 1;
}

function collect_cash(amount){
  if(amount < 500){
    alert("atm machine ek dam sahi se kaam kr rha hai ")
         

  }         

}

function balance() {
  let temporary = array_store_amount_user_entered.join("");
  let available_balance_in_user_account =
    customer_detail[index_of_user_detail].total_amount_available;
  let available_balance_in_atm = atm_info[0].total_money_in_machine;
  if (temporary > available_balance_in_user_account) {
    output_atm_3.value = "Insufficient Balance";
    output_atm_4.value = "Press Submit Button";
    process_counter == 3;
    ready_to_calculate_balance = 0;
  } else if (temporary > available_balance_in_atm) {
    output_atm_3.value = "Insufficient amount in ATM ";
    output_atm_4.value = "Press Submit Button";
    process_counter == 3;
    ready_to_calculate_balance = 0;
  } else if (
    temporary < available_balance_in_user_account &&
    temporary < available_balance_in_atm
  ) {
    if (temporary < 1000 && temporary[1] != 0 && temporary[2] != 0) {
      output_atm_3.value = " amount should multiple of 100 ";
      output_atm_4.value = "Press Submit Button";
      process_counter == 3;
      ready_to_calculate_balance = 0;
    } else if (
      temporary >= 1000 &&
      temporary < 10000 &&
      temporary[2] != 0 &&
      temporary[3] != 0
    ) {
      output_atm_3.value = " amount should multiple of 100 ";
      output_atm_4.value = "Press Submit Button";
      process_counter == 3;
      ready_to_calculate_balance = 0;
    } else if (
      temporary >= 10000 &&
      temporary < 50000 &&
      temporary[3] != 0 &&
      temporary[4] != 0
    ) {
      output_atm_3.value = " amount should multiple of 100 ";
      output_atm_4.value = "Press Submit Button";
      process_counter == 3;
      ready_to_calculate_balance = 0;
    }
  }else{
     // ek baar yaad rakhna yaha pe max_withdrawal ka condition nahi lagye hai  
     // lakin jab project complete ho jyega tab laga denge   
    collect_cash(temporary);
      
  }  
}

function check_card_number_exist() {
  couter_check_card_no_length++;
  output_atm_2.value = array_store_card_number.join("");

  if (couter_check_card_no_length == 16) {
    process_counter = 2;
    let temporary = array_store_card_number.join("");

    user_detail_index = check_user_exist(temporary);
    if (user_detail_index == 404) {
      output_atm_1.value = "";
      output_atm_2.value = "";
      output_atm_3.value = "User not found";
      output_atm_4.value = "Press Start Button";
      process_counter = 0;
    } else {
      output_atm_3.value = customer_detail[index_of_user_detail].name;
      output_atm_4.value = "Press Submit Button";
      process_counter = 3;
    }
  }
}

// btn_atm_start sirf ek baar kaam krega fir kaam nahi krega
btn_atm_start.addEventListener("click", function () {
  if (process_counter == 0) {
    output_atm_1.value = "Enter Card Number";
    output_atm_3.value = "";
    output_atm_4.value = "Press Submit Button";
    process_counter = 1;
  }
});

btn_1.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(1);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(1);
    amount_input_from_user();
  }
});
btn_2.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(2);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(2);
    amount_input_from_user();
  }
});
btn_3.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(3);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(3);
    amount_input_from_user();
  }
});
btn_4.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(4);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(4);
    amount_input_from_user();
  }
});
btn_5.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(5);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(5);
    amount_input_from_user();
  }
});
btn_6.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(6);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(6);
    amount_input_from_user();
  }
});
btn_7.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(7);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(7);
    amount_input_from_user();
  }
});
btn_8.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(8);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(8);
    amount_input_from_user();
  }
});
btn_9.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(9);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(9);
    amount_input_from_user();
  }
});
btn_0.addEventListener("click", function () {
  if (process_counter == 1) {
    array_store_card_number.push(0);
    check_card_number_exist();
  }
  if (process_counter == 3) {
    array_store_amount_user_entered.push(0);
    amount_input_from_user();
  }
});

btn_atm_submit.addEventListener("click", function () {
  if (process_counter == 1 && couter_check_card_no_length < 16) {
    output_atm_3.value = "Please enter Valid card Number";
    output_atm_4.value = "Press Click Button";
    process_counter == 0;
  }

  if (process_counter == 3) {
    output_atm_1.value = "Enter Amount";
    output_atm_2.value = "";
    output_atm_3.value = "";
    output_atm_4.value = "Press Submit Button";
  }

  if (process_counter == 3 && ready_to_calculate_balance == 1) {
    process_counter = 4;
    balance();
  }
});
