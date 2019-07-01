


function validatepincode()
{
    var pincode=document.getElementById("Pincode");
    var pincodevalue=pincode.value;
  
    var pattern=/^[0-9]{6}$/;
    if(pincodevalue == "")
    {
        alert("Pincode should only be digits");
        pincode.value="";
        pincode.id.focus();
        return false;
    }
    if(pincodevalue<0)
    {
        alert("Pincode cannot be negative");
        pincode.value="";
        pincode.id.focus();
        return false;
    }
    if(pincodevalue.match(pattern)) 
    {
      return true;
    }
    else
    {
        alert("Pincode should contain only numbers and length should be 6");
        pincode.value="";
        pincode.id.focus();
    return false;

    }
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


  var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
   
    if(arrayofuserobject === null)
    {
        arrayofuserobject = [];
       
    }
    arrayofuserobject.push(obj);
    var persondetailsinstring=JSON.stringify(arrayofuserobject);
   localStorage.setItem("registeredUserRecord",persondetailsinstring);
   sessionUserid=arrayofuserobject.length-1;
   sessionStorage.setItem("sessionUserId",sessionUserid);
   window.location.replace("profilepage.html");



}
function changeProfilePicture()
{
    var imageName=document.getElementById("profilepic").value;
    alert(imageName);
    alert("hello");
    
}
