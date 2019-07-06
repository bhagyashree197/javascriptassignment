



function validateCredentials(spanId){
    var emailID=document.getElementById("Emailaddress");
    var password=document.getElementById("Password");
    var getUserArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var pattern=/^[a-zA-Z0-9][\w-]*@[a-zA-Z0-9][\w-\.]*\.[a-zA-Z0-9][\w-]*$/;
    let userId;
    if(!emailID.value.match(pattern))
    {
        document.getElementById(spanId).innerHTML="Invalid Email Address";
        idOfElement.value="";
        idOfElement.focus();
        return false;
    }
    else
    {
        for(var count=0;count<getUserArray.length;count++){
            if(emailID.value == getUserArray[count].emailID)
            {
                let decryptPasswordValue;
                decryptPasswordValue=decryptPassword(getUserArray[count].password);
                if(decryptPasswordValue === password.value){
                    sessionStorage.setItem("userId",count);
                    window.location.replace("mytodopage.html");
                    return true;
                }
                else{
                    document.getElementById(spanId).innerHTML="Invalid Credentials";
                    emailID.value="";
                    password.value="";
                    return false;
                }
                
            }
        }
        if(count=== getUserArray.length) {
            document.getElementById(spanId).innerHTML="EmailID not already Registered";
            emailID.value="";
            emailID.focus();
            return false;
        }
    }
}

(function(){
    document.addEventListener('keypress', function(event) {
   if (event.keyCode == 13) {
       
    validateCredentials('errorusername');
   }})
}());

function decryptPassword(passwordValue){
    let originalPasswordValue="";
    passwordValue=passwordValue.split("-");
    for(let i=0;i<passwordValue.length-1;i++){
        originalPasswordValue+=String.fromCharCode(passwordValue[i]-10);
    }
    return originalPasswordValue;
}