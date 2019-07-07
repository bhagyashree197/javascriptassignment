
function validatepincode(){
    let pincode=document.getElementById("setpincode");
    let pincodevalue=pincode.value;
    let pattern=/^[0-9]+$/;
    if(pincodevalue == ""){
        document.getElementById("pincodespan").innerHTML="";
        return true;
    }
    if(pincodevalue<0){
        document.getElementById("pincodespan").innerHTML="Pincode cannot be negative";
        document.getElementById("setpincode").value="";
        pincode.focus();
        return false;
    }
    if(!(pincodevalue.match(pattern))) {
        document.getElementById("pincodespan").innerHTML="Pincode should contain only Numbers";
        document.getElementById("setpincode").value="";
        return false;
    }
    if((pincodevalue.length>6)){
        document.getElementById("pincodespan").innerHTML="Pincode length should be 6";
        document.getElementById("setpincode").value="";
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
    var firstName = document.getElementById("setfirstname").value;
    var lastName = document.getElementById("setlastname").value;
    var emailID=document.getElementById("setemailid").value;
    var password=document.getElementById("setpassword").value;
    if((firstName=="null")||(lastName=="")/* ||(gender.checked.value =="") */||(emailID =="")||(password=="")){
        document.getElementById("setfirstname").style.border="2px solid red";
        document.getElementById("setlastname").style.border="2px solid red"
        document.getElementById("setemailid").style.border="2px solid red"
        document.getElementById("setpassword").style.border="2px solid red"
        document.getElementById("pagesubmission").innerHTML="**Please fill out all the mandatory Fields**";
        document.getElementById("pagesubmission").scrollIntoView({"behavior": 'smooth'})
        return false;
    } 
  storevalue();
}

function storevalue(){
    var firstName = document.getElementById("setfirstname").value;
    var lastName = document.getElementById("setlastname").value;
    var gender = document.querySelector('input[name="setgender"]:checked').value;
    var streetName = document.getElementById("setstreetname").value;
    var cityName = document.getElementById("setcityname").value;
    var stateName = document.getElementById("setstatename").value;
    var countryName = document.getElementById("setcountryname").value;
    var pincode = document.getElementById("setpincode").value;
    var emailID=document.getElementById("setemailid").value;
    var password=document.getElementById("setpassword").value;
    var obj=new Object();
    obj.firstName=firstName;
    obj.lastName=lastName
    obj.Gender=gender;
    obj.streetName=streetName;
    obj.cityName=cityName;
    obj.stateName=stateName;
    obj.countryName=countryName;
    obj.pincode=pincode;
    obj.emailID=emailID;
    var password=encryptPassword(password);
    obj.password=password;
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
    var Image =document.getElementById("setprofilepic").files[0];
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
    alert(newPasswordValue);
    return newPasswordValue;
}