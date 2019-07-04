
function validateCredentials()
{
        var emailID=document.getElementById("Emailaddress");
        var password=document.getElementById("Password");
        var getUserArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
        var pattern=/^[a-zA-Z0-9][\w-]*@[a-zA-Z0-9][\w-\.]*\.[a-zA-Z0-9][\w-]*$/;
        
        if(!emailID.value.match(pattern))
        {
        alert("Invalid Email Address");
        idOfElement.value="";
        //idOfElement.focus();
        return false;
        }
        else
        {
            for(var count=0;count<getUserArray.length;count++){
                if(emailID.value == getUserArray[count].emailID)
                break;
            }
            if(count=== getUserArray.length) 
            {
                alert("EmailID not already Registered");
                emailID.value="";
                emailID.focus();
                return false;
            }
            else{
                for(var count=0;count<getUserArray.length;count++)
                {
                    
                    if(getUserArray[count].emailID===emailID.value)
                    {
                        if(getUserArray[count].password===password.value)
                        {
                        sessionStorage.setItem("userId",count);
                        window.location.replace("profilepage.html");
                        return true;
                        }
                        else
                        {
                            alert("Invalid Credentials");
                            emailID.value="";
                            password.value="";
                            return false;
                        }
                    }
                }
               
            }
        }
}
