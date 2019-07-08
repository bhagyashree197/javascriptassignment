(function(){
    if(sessionStorage.getItem("userId")!== null)
    {
        window.location.href="../html/mytodopage.html";
    }
    })();

function validatepincode(){
    let pincode=document.getElementById("pincode");
    let pincodevalue=pincode.value;
    let pattern=/^[0-9]+$/;
    if(pincodevalue == ""){
        document.getElementById("pincodespan").innerHTML="";
        return true;
    }
    if(pincodevalue<0){
        document.getElementById("pincodespan").innerHTML="Pincode cannot be negative";
        document.getElementById("pincode").value="";
        pincode.focus();
        return false;
    }
    if(!(pincodevalue.match(pattern))) {
        document.getElementById("pincodespan").innerHTML="Pincode should contain only Numbers";
        document.getElementById("pincode").value="";
        return false;
    }
    if((pincodevalue.length>6)){
        document.getElementById("pincodespan").innerHTML="Pincode length should be 6";
        document.getElementById("pincode").value="";
        pincode.focus();
        return false;
    }
    document.getElementById("pincodespan").innerHTML="";
}

(function(){
     document.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        checknullValue();
        
    }})
}());


function checknullValue(){
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var emailID=document.getElementById("emailid").value;
    var password=document.getElementById("password").value;
    if((firstName=="null")||(lastName=="")/* ||(gender.checked.value =="") */||(emailID =="")||(password=="")){
        document.getElementById("firstname").style.border="2px solid red";
        document.getElementById("lastname").style.border="2px solid red"
        document.getElementById("emailid").style.border="2px solid red"
        document.getElementById("password").style.border="2px solid red"
        document.getElementById("pagesubmission").innerHTML="**Please fill out all the mandatory Fields**";
        document.getElementById("pagesubmission").scrollIntoView({"behavior": 'smooth'})
        return false;
    } 
  storevalue();
}

function storevalue(){
    var formId=document.getElementById("formpage");
    var obj=new Object();
    var childElements=formId.elements;
    for(var i=0;i<childElements.length;i++)
    {
        var elementName=childElements[i].name;
        var elementValue=childElements[i].value;
        switch(childElements[i].getAttribute('type'))
        {
            case 'text':obj[elementName]=childElements[i].value;
                            break;
            case 'password':var encryptPasswordValue=encryptPassword(elementValue);
                            obj[elementName]=encryptPasswordValue;
                            break;
            case 'email':obj[elementName]=childElements[i].value;
                            break;
            case 'number':obj[elementName]=childElements[i].value;
                            break;
        }
    }
    obj.gender = document.querySelector('input[name="gender"]:checked').value;
    obj.todoArray=[];
    obj.image=sessionStorage.getItem("tempimgdata");
    sessionStorage.removeItem("tempimgdata");
    var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
    if(arrayofuserobject === null){
        arrayofuserobject = [];
    }
    arrayofuserobject.push(obj);
    var persondetailsinstring=JSON.stringify(arrayofuserobject);
    localStorage.setItem("registeredUserRecord",persondetailsinstring);
    var childValues=document.getElementById("formpage").childNodes;
    window.location.href="../html/loginpage.html";
}

function changeProfilePicture(){
    var Image =document.getElementById("profilepic").files[0];
    getimgbase64(Image);
    function getimgbase64(Image){
        var reader = new FileReader();
        reader.readAsDataURL(Image);
        reader.onload = function () {
        var imgdata = reader.result;
        sessionStorage.setItem("tempimgdata",imgdata);
        document.getElementById("userpic").src=sessionStorage.tempimgdata;
        };
        reader.onerror = function (error) {
         };
    }
}

function encryptPassword(passwordValue){
    let newPasswordValue="";
    for(let i=0;i<passwordValue.length;i++)
    {
        newPasswordValue+=passwordValue.charCodeAt(i)+10;
        newPasswordValue+="-";
    }
    return newPasswordValue;
}