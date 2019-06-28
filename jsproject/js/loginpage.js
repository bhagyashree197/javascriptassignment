
function validateCredentials()
{
var emailID=document.getElementById("Emailaddress");
var password=document.getElementById("Password");
var getUserArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
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