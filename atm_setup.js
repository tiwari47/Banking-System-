let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}



let atm_info = JSON.parse(localStorage.getItem("atm_machine")) || [];

let btn_setup = document.getElementById("btn_setup");

btn_setup.addEventListener("click", function () {
  let atm_name_input = document.getElementById("atm_name_input").value;
  let atm_number_input = document.getElementById("atm_number_input").value;
  if (atm_name_input == "" || atm_number_input == "") {
    alert("please enter data");
  } else if (atm_number_input.length != 4 || atm_number_input == "0000") {
    alert("please enter the atm number properly");
  } else if (atm_number_input.includes(".")) {
    alert("please enter 4 digit atm number not in decimal");
  } else if (atm_info.length != 0) {
    let new_account_check_counter = 0;

    for (let i = 0; i < atm_info.length; i++) {
      if (atm_number_input == atm_info[i].atm_number) {
        new_account_check_counter = 1;

      }
    }

    if (new_account_check_counter == 0) {
      var today = new Date();
      var date = today.getDate();
      var mm = today.getMonth() + 1;
      var yyy = today.getFullYear();
      today = date + "/" + mm + "/" + yyy;
      console.log(today);
      atm_info.push({
        atm_number: atm_number_input,
        atm_name: atm_name_input,
        date: today,
        total_money_in_machine: "",
        available_note: [{
          note_2000: "",
          note_500: "",
          note_200: "",
          note_100: "",
        }],
      });
      localStorage.setItem("atm_machine", JSON.stringify(atm_info));
      location.reload()
      alert("atm machine set-up successfully");
      document.getElementById("atm_name_input").value = "";
      document.getElementById("atm_number_input").value = "";

    } else {
      alert("ATM Number you have entered already exist");
    }

  } else {
    var today = new Date();
    var date = today.getDate();
    var mm = today.getMonth() + 1;
    var yyy = today.getFullYear();
    today = date + "/" + mm + "/" + yyy;
    console.log(today);
    atm_info.push({
      atm_number: atm_number_input,
      atm_name: atm_name_input,
      date: today,
      total_money_in_machine: "",
      available_note: [{
        note_2000: "",
        note_500: "",
        note_200: "",
        note_100: "",
      }],
    });
    localStorage.setItem("atm_machine", JSON.stringify(atm_info));
    alert("atm machine set-up successfully");
    location.reload();
    document.getElementById("atm_name_input").value = "";
    document.getElementById("atm_number_input").value = "";
  }
});

if (atm_info.length == 0) {
  let atm_detail_table_tbody = document.getElementById(
    "atm_detail_table_tbody"
  );
  atm_detail_table_tbody.innerHTML = "";
  atm_detail_table_tbody.textContent = "Set-Up New Machine";
  atm_detail_table_tbody.style.textAlign = "centre";
} else {
  let demo_varible = atm_info;
  demo_varible.forEach((element, index) => {
    let atm_detail_table_tbody = document.getElementById(
      "atm_detail_table_tbody"
    );
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = index + 1;

    let td2 = document.createElement("td");
    td2.textContent = element.atm_name;

    let td3 = document.createElement("td");
    td3.textContent = element.atm_number;

    let td4 = document.createElement("td");
    let tr_action = document.createElement("tr")

    let edit_btn = document.createElement("button");
    edit_btn.style.fontSize = "18px";
    edit_btn.style.fontWeight = "bold";
    edit_btn.textContent = "edit";
    edit_btn.style.height = "30px";
    edit_btn.style.width = "67px";
    edit_btn.style.margin = "6px"
    edit_btn.style.backgroundColor = "green",
    edit_btn.style.color = "white",
      edit_btn.addEventListener("click", function () {
        window.location.href = "edit_atm_setup.html?index=" + index;
      });
    tr_action.append(edit_btn)
    let delete_btn = document.createElement("button")
    delete_btn.style.fontSize = "18px"
    delete_btn.style.fontWeight = "bold"
    delete_btn.textContent = "Delete"
    delete_btn.style.height = "30px"
    delete_btn.style.width = "67px"
    delete_btn.style.margin = "6px"
    delete_btn.style.backgroundColor = "red"
    delete_btn.style.color = "black"

    delete_btn.addEventListener("click",function(){
         
      var confirmation = confirm("Are you sure you want to delete this ATM Machine?");

      if (confirmation) {
          atm_info.splice(index,1)
        localStorage.setItem("atm_machine",JSON.stringify(atm_info))
         location.reload()
      } else {
        
        console.log("Deletion cancelled.");
      }

           
       
    })

    
    tr_action.append(delete_btn)
    td4.append(tr_action);
   
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
     tr.append(td4)
    atm_detail_table_tbody.append(tr);
  });
}
