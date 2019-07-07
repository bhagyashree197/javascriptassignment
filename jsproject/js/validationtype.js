	
function validateonlycharacters(Idofelement, spanId) {
    let Valueofelement = Idofelement.value;
    let pattern=/^[a-zA-z]+$/;
    if ((Valueofelement.match(pattern) || (Valueofelement == "") )) {
        document.getElementById(spanId).innerHTML= " ";
        return true;
    }
    document.getElementById(spanId).innerHTML= "Should only have characters!!";
    Idofelement.value="";
    Idofelement.focus();
    return false;
}

function validateCharactersandDigit(idOfElement,spanid){
	var valueOfElement=idOfElement.value;
	var pattern=/^[a-zA-Z0-9\s]+$/;
	if(!valueOfElement.match(pattern) && (valueOfElement!== "")){
        document.getElementById(spanid).innerHTML=idOfElement.id+" can contain only Alphabets and Digits!!!";
        idOfElement.value="";
		idOfElement.focus();
		return false;
	}
    document.getElementById(spanid).innerHTML=" ";
	return true;
}

function usernameValidate(idOfElement,spanId){
    let dummyVariable=0;
    valueOfElement=idOfElement.value;
    let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
    if(valueOfElement === "")
    {
        document.getElementById(spanId).innerHTML=" ";
        return true;
    }
    var pattern=/^[a-zA-Z0-9][\w-]*@[a-zA-Z0-9][\w-\.]*\.[a-zA-Z0-9][\w-]*$/;
    if(!valueOfElement.match(pattern)){
        document.getElementById(spanId).innerHTML="Invalid Email Address";
        idOfElement.value="";
        idOfElement.focus();
        return false;
    }
	if(userRecordArray === null){
        document.getElementById(spanId).innerHTML=" ";
		return true;
    }
    for(var count=0;count<userRecordArray.length;count++){
        if(userRecordArray[count].emailID.match(valueOfElement)){
            dummyVariable=1;
            break;
        }
    }
    if(dummyVariable===1) {
        document.getElementById(spanId).innerHTML="EmailID already Registered";
        idOfElement.value="";
        idOfElement.focus();
        return false;
    }
    else{
         document.getElementById(spanId).innerHTML=" ";
         return true;
    }
    
}

function deleteSession(){
	sessionStorage.removeItem("userId");
	window.location.replace("loginpage.html");
}

function validatePassword(idOfElement,spanId){
  var password=idOfElement.value;
  var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(password=="")
  {
  document.getElementById(spanId).innerHTML="";
  return true;
  }
  if(!password.match(pattern)){
      document.getElementById(spanId).innerHTML="1.Password length should be between 8 and 15 characters  2.Should contain atleast one Uppercase and a Lowercase character  3.Should contain atleast one Digit 4.Should contain atleast one special character ";
      idOfElement.value="";
      idOfElement.focus();      
      return false;
  }
  document.getElementById(spanId).innerHTML="";
}