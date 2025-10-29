let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}



let atm_info = JSON.parse(localStorage.getItem("atm_machine")) || [];
let customer_detail = JSON.parse(localStorage.getItem("detail")) || [];
const url = new URL(window.location.href);
let index = url.searchParams.get("index");
document.getElementById("output_atm_1").value = `WELCOME 🙏
 TO ATM NO:${atm_info[index].atm_number}`;
document.getElementById("output_atm_3").value = "Click on START";

let index_of_user_detail;
let counter_card_number = 0;
let lock_input_for_card_number = 0;
let card_number_input_array = [];
let start_process = 0;
let withdrawal_process_start = 0;
let amount_entered_by_user = [];
let lock_amount_entered = 0;
let lock_amount_entered_displayed = 0;
let collect_cash_count = 0;

function collect_cash(count_2000, count_500, count_200, count_100) {



  if (collect_cash_count == 1) {
    if (count_2000 == 0 && count_500 == 0 && count_200 == 0 && count_100 == 0) {
      document.getElementById("output_atm_3").value =
        " 200 & 100 notes are not available";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    }

    else {
      let atm_2000 = atm_info[index].available_note[0].note_2000;
      let atm_500 = atm_info[index].available_note[0].note_500;
      let atm_200 = atm_info[index].available_note[0].note_200;
      let atm_100 = atm_info[index].available_note[0].note_100;
      let required_100_notes = atm_100 - count_100;
      let required_200_notes = atm_200 - count_200;
      let required_500_notes = atm_500 - count_500;
      let required_2000_notes = atm_2000 - count_2000;
      let tota_amount_left_in_atm_after_withdrawal = required_100_notes * 100 + required_200_notes * 200 + required_500_notes * 500 + required_2000_notes * 2000;
      atm_info[index].available_note[0].note_2000 = required_2000_notes
      atm_info[index].available_note[0].note_500 = required_500_notes
      atm_info[index].available_note[0].note_200 = required_200_notes
      atm_info[index].available_note[0].note_100 = required_100_notes
      atm_info[index].total_money_in_machine = tota_amount_left_in_atm_after_withdrawal;
      let c_d = new Date();
      console.log(c_d);
      let date_now = `${c_d.getDate()}-${c_d.getMonth() + 1}-${c_d.getFullYear()}`;
      amount_withdawal_from_atm = count_2000 * 2000 + count_500 * 500 + count_200 * 200 + count_100 * 100
      customer_detail[index_of_user_detail].total_amount_available = customer_detail[index_of_user_detail].total_amount_available - amount_withdawal_from_atm;

      customer_detail[index_of_user_detail].withdrawal_transaction.push({
        account_number: customer_detail[index_of_user_detail].account_number,
        transacation_Id: Math.floor(Math.random() * 1000000 + 1),
        amount: amount_withdawal_from_atm,
        transaction_type: "Debit",
        transaction_mode: "atm",
        date: date_now,
        current_date: c_d,
      })


      document.getElementById("output_atm_1").value = "Collect Your Cash"
      document.getElementById("output_atm_3").value = "🙏 Thanking you"
      document.getElementById("output_atm_4").value = "Press START Button"

      localStorage.setItem("detail", JSON.stringify(customer_detail))
      localStorage.setItem("atm_machine", JSON.stringify(atm_info));
      setTimeout(function () {
        location.reload()
      }, 2000)

      console.log(count_2000);
      console.log(count_500);
      console.log(count_200);
      console.log(count_100);
    }
  }
  collect_cash_count = 2;
}
function available_amount(num) {
  let atm_2000 = atm_info[index].available_note[0].note_2000;
  let atm_500 = atm_info[index].available_note[0].note_500;
  let atm_200 = atm_info[index].available_note[0].note_200;
  let atm_100 = atm_info[index].available_note[0].note_100;
  let required_2000_notes = 0;
  let required_500_notes = 0;
  let required_200_notes = 0;
  let required_100_notes = 0;
  let calculated_amount = 0;
  if (num < 500) {
    if (atm_200 == 0 && atm_100 == 0) {
      document.getElementById("output_atm_3").value =
        " 200 & 100 notes are not available";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else {
      for (let i = 0; i <= atm_200; i++) {
        for (let j = 0; j <= atm_100; j++) {
          calculated_amount = i * 200 + j * 100;
          if (calculated_amount == num) {
            required_200_notes = i;
            required_100_notes = j;
            break;
          }
          else if (i == atm_200 && j == atm_100 && calculated_amount != num) {
            document.getElementById("output_atm_3").value =
              "please enter any other amount";
            console.log("ekdam  sahi line pe ja rha hai ")
            document.getElementById("output_atm_4").value = "Press Cancel Button";
            break;
          }
        }
      }

      collect_cash(
        required_2000_notes,
        required_500_notes,
        required_200_notes,
        required_100_notes
      );
    }
  } else if (num >= 500 && num < 2000) {
    if (
      atm_500 == 0 &&
      atm_200 == 0 &&
      atm_100 == 0
    ) {
      document.getElementById("output_atm_3").value =
        " 200&500 & 100 notes are not available";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else {
      for (let i = 0; i <= atm_500; i++) {

        for (let j = 0; j <= atm_200; j++) {

          for (let k = 0; k <= atm_100; k++) {
            calculated_amount = i * 500 + j * 200 + k * 100;
            if (calculated_amount == num) {
              required_500_notes = i;
              required_200_notes = j;
              required_100_notes = k;
              break;
            } else if (i == atm_500 && j == atm_200 && k == atm_100 && calculated_amount != num) {
              document.getElementById("output_atm_3").value =
                " please enter any other amount";
              document.getElementById("output_atm_4").value = "Press Cancel Button";
              console.log("bhai tera logic ekdam sahi kaam kr rha hai"

              )
              break;

            }
          }
        }
      }

      collect_cash(
        0,
        required_500_notes,
        required_200_notes,
        required_100_notes
      );
    }
  } else if (num >= 2000) {
    if (atm_2000 == 0 && atm_500 == 0 && atm_200 == 0 && atm_100 == 0) {
      document.getElementById("output_atm_3").value = "notes are not available";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else {
      for (let i = 0; i <= atm_2000; i++) {

        for (let j = 0; j <= atm_500; j++) {

          for (let k = 0; k <= atm_200; k++) {

            for (let l = 0; l <= atm_100; l++) {
              calculated_amount = i * 2000 + j * 500 + k * 200 + l * 100;
              if (calculated_amount == num) {
                required_2000_notes = i;
                required_500_notes = j;
                required_200_notes = k;
                required_100_notes = l;
                break;
              }
              else if (i == atm_2000 && j == atm_500 && k == atm_200 && l == atm_100 && calculated_amount != num) {
                document.getElementById("output_atm_3").value =
                  "please enter any other amount ";
                document.getElementById("output_atm_4").value = "Press Cancel Button";
                break;
              }
            }
          }
        }
      }
      collect_cash(
        required_2000_notes,
        required_500_notes,
        required_200_notes,
        required_100_notes
      );
    }
  }
}

function check_balance_in_atm_and_useraccount() {
  document.getElementById("output_atm_2").value =
    amount_entered_by_user.join("");
  lock_amount_entered_displayed = 1;
}

function check_user_exist(num) {
  for (let i = 0; i < customer_detail.length; i++) {
    if (customer_detail[i].atm_info.length == 0) {
      console.log(" atm not created ")
      continue
    }

    else if (num == customer_detail[i].atm_info[0].atmnumber) {
      return i;
    }


  }
  return 404;
}

function card_number(type) {
       

  if(type == "back"){
       counter_card_number--;
       document.getElementById("output_atm_2").value =
    card_number_input_array.join("");
  }
  else{
      counter_card_number++;
  document.getElementById("output_atm_2").value =
    card_number_input_array.join("");

  if (counter_card_number == 16) {
    lock_input_for_card_number = 1;
    let temporary = card_number_input_array.join("");
    let i = check_user_exist(temporary);


    if (i == 404) {
      document.getElementById("output_atm_3").value = "User not found";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (i == 420) {
      document.getElementById("output_atm_3").value = "Please Create  Atm Card ";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else {
      document.getElementById("output_atm_3").value = customer_detail[i].name;
      document.getElementById("output_atm_4").value = "Press Submit Button";
      index_of_user_detail = i;
      withdrawal_process_start = 1;
    }
  }



  }
  
}

let btn_atm_start = document.getElementById("btn_atm_start");
btn_atm_start.addEventListener("click", function () {
  if (start_process == 0) {
    document.getElementById("output_atm_2").value = "";
    document.getElementById("output_atm_1").value = "Enter Card Number";
    document.getElementById("output_atm_4").value = "Press Submit Button";
    document.getElementById("output_atm_3").value = "";
    start_process = 1;

  }
});

let btn_atm_submit = document.getElementById("btn_atm_submit");
btn_atm_submit.addEventListener("click", function () {
  if (withdrawal_process_start == 1) {
    withdrawal_process_start = 2;
    document.getElementById("output_atm_3").value = "";
    document.getElementById("output_atm_1").value = "Enter amount";
    document.getElementById("output_atm_2").value = "";
  }

  if (lock_amount_entered_displayed == 1) {
    let temporary = amount_entered_by_user.join("");
    let total_amount_in_user_account =
      customer_detail[index_of_user_detail].total_amount_available;
    if (
      temporary > total_amount_in_user_account &&
      temporary < atm_info[0].total_money_in_machine
    ) {
      document.getElementById("output_atm_3").value =
        "Insufficint balance in account";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (
      temporary > atm_info[0].total_money_in_machine &&
      temporary > total_amount_in_user_account
    ) {
      document.getElementById("output_atm_3").value =
        "Insufficint amount in ATM";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (
      temporary > atm_info[0].total_money_in_machine &&
      temporary < total_amount_in_user_account
    ) {
      document.getElementById("output_atm_3").value =
        "Insufficint amount in ATM";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (temporary < customer_detail[index_of_user_detail].min_withdrawal && temporary > customer_detail[index_of_user_detail].max_withdrawal) {
      document.getElementById("output_atm_3").value =
        "Change your account limit";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (temporary < 100) {
      console.log("dekh le bhai ");
      document.getElementById("output_atm_3").value =
        "Amount should be multiple of 100";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (
      temporary > 20000 &&
      temporary < atm_info[0].total_money_in_machine &&
      temporary < total_amount_in_user_account
    ) {
      document.getElementById("output_atm_3").value = "limit exceed";
      document.getElementById("output_atm_4").value = "Press Cancel Button";
    } else if (temporary >= 100 && temporary < 1000) {
      if (temporary % 100 != 0) {
        console.log("kaam yaha ruk rha hai ");
        document.getElementById("output_atm_3").value =
          "Amount should be multiple of 100";
        document.getElementById("output_atm_4").value = "Press Cancel Button";
      } else {
        collect_cash_count = 1;
        available_amount(temporary);
      }
    } else if (temporary >= 100 && temporary >= 1000 && temporary < 10000) {
      if (temporary % 100 != 0) {
        console.log("kaam yaha ruk rha hai ");
        document.getElementById("output_atm_3").value =
          "Amount should be multiple of 100";
        document.getElementById("output_atm_4").value = "Press Cancel Button";
      } else {
        collect_cash_count = 1;
        available_amount(temporary);
      }
    } else if (temporary >= 100 && temporary >= 10000 && temporary <= 20000) {
      if (temporary % 100 != 0) {
        console.log("kaam yaha ruk rha hai ");
        document.getElementById("output_atm_3").value =
          "Amount should be multiple of 100";
        document.getElementById("output_atm_4").value = "Press Cancel Button";
      } else {
        collect_cash_count = 1;
        available_amount(temporary);
      }
    }
  }
});

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

btn_1.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(1);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(1);
    check_balance_in_atm_and_useraccount();
  }
});
btn_2.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(2);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(2);
    check_balance_in_atm_and_useraccount();
  }
});
btn_3.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(3);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(3);
    check_balance_in_atm_and_useraccount();
  }
});
btn_4.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(4);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(4);
    check_balance_in_atm_and_useraccount();
  }
});
btn_5.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(5);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(5);
    check_balance_in_atm_and_useraccount();
  }
});
btn_6.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(6);
    card_number("add");
  }

  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(6);
    check_balance_in_atm_and_useraccount();
  }
});
btn_7.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(7);
    card_number("add");
  }

  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(7);
    check_balance_in_atm_and_useraccount();
  }
});
btn_8.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(8);
    card_number("add");
  }

  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(8);
    check_balance_in_atm_and_useraccount();
  }
});
btn_9.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(9);
    card_number("add");
  }

  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(9);
    check_balance_in_atm_and_useraccount();
  }
});

btn_0.addEventListener("click", function () {
  if (start_process == 1 && lock_input_for_card_number == 0) {
    card_number_input_array.push(0);
    card_number("add");
  }
  if (withdrawal_process_start == 2) {
    amount_entered_by_user.push(0);
    check_balance_in_atm_and_useraccount();
  }
});


let atm_btn_cancel = document.getElementById("btn_atm_cancel");
atm_btn_cancel.addEventListener("click", function () {
  location.reload();
});

let btn_atm_back = document.getElementById("btn_atm_back")

btn_atm_back.addEventListener("click", function () {
  
  if(start_process ==1 && lock_input_for_card_number ==0 ){
     card_number_input_array.pop()
     card_number("back")
  }

  if( withdrawal_process_start == 2){
     amount_entered_by_user.pop()
      check_balance_in_atm_and_useraccount()
    }
})

