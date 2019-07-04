	
function validateonlycharacters(Idofelement) {
   
    let Valueofelement = Idofelement.value;
   
    let pattern=/^[a-zA-z]+$/;
 
    if ((Valueofelement.match(pattern) || (Valueofelement == "") )) {
     
    return true;
    }
  
    alert(Idofelement.id+" should only have characters");
    Idofelement.value="";
    Idofelement.focus();
        return false;
    
}
function validateCharactersandDigit(idOfElement)
{
	
	var valueOfElement=idOfElement.value;
	var pattern=/^[a-zA-Z0-9]+$/;
	if(!valueOfElement.match(pattern) && (valueOfElement!== ""))
	{
        alert(idOfElement.id+" can contain only Alphabets and Digits");
        id.value="";
		id.focus();
		return false;
	}
	return true;
}

function usernameValidate(idOfElement)
{
    let dummyVariable=0;
    valueOfElement=idOfElement.value;
    let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
    if(valueOfElement === "")
    return true;
        var pattern=/^[a-zA-Z0-9][\w-]*@[a-zA-Z0-9][\w-\.]*\.[a-zA-Z0-9][\w-]*$/;
        if(!valueOfElement.match(pattern))
        {
        alert("Invalid Email Address");
        idOfElement.value="";
        //idOfElement.focus();
        return false;
        }
		if(userRecordArray === null)
				return true;
    for(var count=0;count<userRecordArray.length;count++)
    {
        if(userRecordArray[count].emailID.match(valueOfElement))
        {
                dummyVariable=1;
                break;
        }
    }
  if(dummyVariable===1) 
    {
        alert("EmailID already Registered");
        idOfElement.value="";
        idOfElement.id.focus();
        return false;
    }
    else
    {
        return true;
    }
    
   
}

function deleteSession()
{
	sessionStorage.removeItem("userId");
	window.location.replace("loginpage.html");
	
}
function validatePassword(idOfElement)
{
  var password=idOfElement.value;
  var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(password=="")
  return true;
  if(!password.match(pattern))
  {
      alert("1.Password length should be between 8 and 15 characters  2.Should contain atleast one Uppercase and a Lowercase character  3.Should contain atleast one Digit 4.Should contain atleast one special character ");
      idOfElement.value="";
      idOfElement.focus();      
      return false;
  }
}