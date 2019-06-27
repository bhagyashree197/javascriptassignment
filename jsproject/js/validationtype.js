
function validateonlycharacters(Idofelement) {
   
    let Valueofelement = Idofelement.value;
   
    let pattern=/^[a-zA-z]+$/;
 
    if ((Valueofelement.match(pattern) || (Valueofelement == "") )) {
     
    return true;
    }
  
    alert(Idofelement.id+" should only have characters");
    Idofelement.value="";
    Idofelement.id.focus();
        return false;
    
}
function usernameValidate(idOfElement)
{
    let dummyVariable=0;
    valueOfElement=idOfElement.value;
    let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
    if((userRecordArray === null) || (valueOfElement === ""))
    return true;
        var pattern=/^[a-zA-Z0-9][\w-]*@[a-zA-Z0-9][\w-\.]*\.[a-zA-Z0-9][\w-]*$/;
        if(!valueOfElement.match(pattern))
        {
        alert("Invalid Email Address");
        idOfElement.value="";
        //idOfElement.focus();
        return false;
        }
    
    for(var count=0;count<userRecordArray.length;count++)
    {
        if(userRecordArray[count].emailID.match(valueOfElement))
        {
                dummyVariable=1;
                break;
        }
    }
    if(idOfElement.id=="Emailid")
    {
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
    else if(idOfElement.id=="Emailaddress")
    {
        if(count=== userRecordArray.length) 
        {
            alert("EmailID not already Registered");
            idOfElement.value="";
            idOfElement.focus();
            return false;
        }
        return true;

    }
}
