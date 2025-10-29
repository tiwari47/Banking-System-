let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}


let atm_info = JSON.parse(localStorage.getItem("atm_machine")) || []

if(atm_info.length == 0){
      document.getElementById("h1_select_atm_machine_withdrawal_money").style.display = "none";
      let h1 = document.createElement("h1");
       h1.textContent = "PLEASE  SET-UP   ATM MACHINE " ;
       h1.style.marginTop = "300px";
       h1.style.fontWeight = "bold"
       h1.style.color = "red"
       h1.style.textAlign = "center"
        var body = document.getElementsByTagName("BODY")[0];
        body.append(h1)
       
}


let atm_machine_option = document.getElementById("atm_machine_option");

atm_info.forEach( (element,index) => {
     let main_div = document.createElement("div");
      main_div.id = "div1"
      main_div.style.height = "300px";
         main_div.style.width = "200px"
           main_div.style.background = "linear-gradient(to top, rgb(95, 174, 213), white)"
           main_div.style.padding = "40px";
           main_div.style.border = "1px solid black"   
           main_div.style.margin = "15px";
           let h2_machine = document.createElement("h2");
      h2_machine.style.textAlign = "center";
      h2_machine.textContent = `Machine${index+1}`
      main_div.append(h2_machine);
      for(let i = 0 ; i <=3; i++){
          if(i == 0 ){
            let div = document.createElement("div");
             let  label = document.createElement("label");
             label.textContent = "ATM NAME:"
             label.style.display = "block";
             label.style.fontSize = "large";
             label.style.fontWeight = "bold";
             let input = document.createElement("input")
             input.type = "text";
             input.style.textAlign = "center";
             input.style.fontWeight = "bold";
             input.value = atm_info[index].atm_name
             div.append(label);
             div.append(input);
             main_div.append(div)
          }
          else if(i == 1){
            let div = document.createElement("div");
             let  label = document.createElement("label");
             label.textContent = "ATM NUMBER:"
             label.style.display = "block";
             label.style.fontSize = "large";
             label.style.fontWeight = "bold";
             let input = document.createElement("input")
             input.type = "text";
             input.style.textAlign = "center";
             input.style.fontWeight = "bold";
             input.value = element.atm_number
             div.append(label);
             div.append(input);
             main_div.append(div)
                
          }else if(i==2){
              let div = document.createElement("div");
             let  label = document.createElement("label");
             label.textContent = "BALANCE IN MACHINE:"
             label.style.display = "block";
             label.style.fontSize = "large";
             label.style.fontWeight = "bold";
             let input = document.createElement("input")
             input.type = "text";
              input.style.textAlign = "center";
              input.style.fontWeight = "bold";
             input.value = element.total_money_in_machine
             div.append(label);
             div.append(input);
              main_div.append(div)
          }else if (i ==3){
             let div = document.createElement("div");
             let  label = document.createElement("label");
             label.textContent = "NOTE AVAILABLE:"
             label.style.display = "block";
             label.style.fontSize = "large";
             label.style.fontWeight = "bold";
             let input = document.createElement("input")
             input.type = "text";
              input.style.textAlign = "center";
              input.style.fontWeight = "bold";
             if(atm_info[index].available_note[0].note_2000 == ""  && atm_info[index].available_note[0].note_500 == "" && atm_info[index].available_note[0].note_200 == ""  && atm_info[index].available_note[0].note_100 == "" ){
                  input.value = "Offline"
                  input.style.color = "red"

             }
             else if(atm_info[index].available_note[0].note_2000 == 0   && atm_info[index].available_note[0].note_500 != 0  && atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_100 != 0 ){
                       input.value = " 500, 200,100"
             }else if(atm_info[index].available_note[0].note_2000 != 0 && atm_info[index].available_note[0].note_500 == 0 &&  atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_100 != 0){
                    input.value = " 2000 , 200,100"
             }else if(atm_info[index].available_note[0].note_2000 != 0   && atm_info[index].available_note[0].note_500 != 0 &&  atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_100 != 0){
                   input.value= " 2000 ,500, 100"
             }else if(atm_info[index].available_note[0].note_2000 != 0 &&  atm_info[index].available_note[0].note_500 != 0 &&  atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_100 == 0) {
                 input.value = " 2000 ,500, 200"
             }else if( atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 == 0  && atm_info[index].available_note[0].note_500 != 0 &&  atm_info[index].available_note[0].note_100 != 0 ) {
                input.value = "500,100"
             }else if(atm_info[index].available_note[0].note_2000 != 0 && atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 == 0 ){
                   input.value = "2000,200"  
             }else if(atm_info[index].available_note[0].note_2000 != 0 && atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_500 != 0 && atm_info[index].available_note[0].note_100 == 0 ){
                   input.value = "2000,500"
             }else if(atm_info[index].available_note[0].note_2000 != 0 && atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 != 0 ){
                   input.value = "2000,100"
             }else if(atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 != 0 ){
                   input.value = "200,100"
             }else if(atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_500 != 0 && atm_info[index].available_note[0].note_100 != 0 ){
                   input.value = "500,200"
             }else if(atm_info[index].available_note[0].note_2000 != 0 && atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 == 0 ){
                   input.value = "2000"
             }else if(atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 != 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 == 0 ){
                   input.value = "200"
             }else if(atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_500 != 0 && atm_info[index].available_note[0].note_100 == 0 ){
                   input.value = "500"
             }else if(atm_info[index].available_note[0].note_2000 == 0 && atm_info[index].available_note[0].note_200 == 0 && atm_info[index].available_note[0].note_500 == 0 && atm_info[index].available_note[0].note_100 != 0 ){
                   input.value = "100"
             }else{
                input.value = "2000,500,200,100"
             }
             
             div.append(label);
             div.append(input); 
              main_div.append(div)
            
          }

        
      }

      let button = document.createElement("button")
      button.textContent = "SELECT"
      button.style.height = "40px"
      button.style.width = "180px"
      button.style.borderRadius = "10px"
      button.style.fontWeight = "bold";
      button.style.fontSize = "20px";
      button.style.background = "linear-gradient(to top, rgb(95, 174, 213), white)";
      button.style.marginTop = "30px"
      button.style.left = "7%";
      
      main_div.append(button);
        
      atm_machine_option.append(main_div);
     button.addEventListener("click",function(){
         if(atm_info[index].available_note[0].note_2000 == ""  && atm_info[index].available_note[0].note_500 == "" && atm_info[index].available_note[0].note_200 == ""  && atm_info[index].available_note[0].note_100 == "" ){
            alert("This atm machine is offline")
         }else{
            window.location.href = "atm_service.html?index="+index;
         }
         
     })
        

});

