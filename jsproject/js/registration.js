function validatepincode()
{
    var pincode=document.getElementById("Pincode");
    var pincodevalue=pincode.value;
  
    var pattern=/^[0-9]+$/;
    if(pincodevalue == "")
    return true;
    if(pincodevalue<0)
    {
        alert("Pincode cannot be negative");
        document.getElementById("Pincode").value="";
        pincode.focus();
        return false;
    }
    if(!(pincodevalue.match(pattern))) 
    {
        alert("Pincode should contain only Numbers");
        document.getElementById("Pincode").value="";

      return false;
    }
    if((pincodevalue.length>0) && (pincodevalue.length<6))
    {
        alert("Pincode length should be 6");
        document.getElementById("Pincode").value="";
        pincode.focus();
        return false;

    }

 }

function checknullValue()
{
    var firstName = document.getElementById("Firstname").value;
    var lastName = document.getElementById("Lastname").value;
/* var gender = document.getElementsByName("Gender").value; */

var emailID=document.getElementById("Emailid").value;
 var password=document.getElementById("setPassword").value;
    if((firstName=="null")||(lastName=="")/* ||(gender.checked.value =="") */||(emailID =="")||(password==""))
    {
        document.getElementById("Firstname").style.border="2px solid red";
        document.getElementById("Lastname").style.border="2px solid red"
        document.getElementById("Emailid").style.border="2px solid red"
        document.getElementById("setPassword").style.border="2px solid red"
        alert("Please fill out all the mandatory Elements");
        return false;

 } 

    storevalue();
}
function storevalue(){

var firstName = document.getElementById("Firstname").value;

var lastName = document.getElementById("Lastname").value;
var gender = document.querySelector('input[name="Gender"]:checked').value;
var streetName = document.getElementById("Streetname").value;
 var cityName = document.getElementById("Cityname").value;
 var stateName = document.getElementById("Statename").value;
 var countryName = document.getElementById("Countryname").value;
 var pincode = document.getElementById("Pincode").value;
 var emailID=document.getElementById("Emailid").value;
 var password=document.getElementById("setPassword").value;
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
  obj.password=password;
  obj.todoArray=[];
  obj.image=sessionStorage.getItem("tempimgdata");
  sessionStorage.removeItem("tempimgdata");
var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
   
    if(arrayofuserobject === null)
    {
        arrayofuserobject = [];
       
    }
    arrayofuserobject.push(obj);
    var persondetailsinstring=JSON.stringify(arrayofuserobject);
   localStorage.setItem("registeredUserRecord",persondetailsinstring);
   sessionUserid=arrayofuserobject.length-1;
   sessionStorage.setItem("userId",sessionUserid);
   window.location.replace("../html/loginpage.html");



}
function changeProfilePicture()
{
    
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
