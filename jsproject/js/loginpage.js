
function validateCredentials()
{
var emailID=document.getElementById("Emailaddress").value;
var password=document.getElementById("Password").value;
var getUserArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
for(var count=0;count<getUserArray.length;count++)
{
    if(getUserArray[count].emailID===emailID)
    {
        if(getUserArray[count].password===password)
        {
         alert("Succesfully logged in");
         return true;
        }
        else
        {
            alert("Invalid Credentials");
            return false;
        }
    }
}
}