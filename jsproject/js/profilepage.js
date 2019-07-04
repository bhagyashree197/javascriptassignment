function profileInDisabledMode()
{
	 disableTextbox();

	
	var arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	
	var userId=sessionStorage.getItem("userId");
	
	var firstName = document.getElementById("Firstname");
	var lastName = document.getElementById("Lastname");
	var streetName = document.getElementById("Streetname");
	var cityName = document.getElementById("Cityname");
	var stateName = document.getElementById("Statename");
	var countryName = document.getElementById("Countryname");
	var pincode = document.getElementById("Pincode");
	 if(arrayUserRecord[userId].Gender === "Male")
		 document.getElementById("Male").checked=true;
	 else if(arrayUserRecord[userId].Gender === "Female")
		 document.getElementById("Female").checked=true;
	 else{
		 document.getElementById("Other").checked=true;
	 }
		firstName.value=arrayUserRecord[userId].firstName;
	lastName.value=arrayUserRecord[userId].lastName;
	streetName.value=arrayUserRecord[userId].streetName;
	cityName.value=arrayUserRecord[userId].cityName;
	stateName.value=arrayUserRecord[userId].stateName;
	countryName.value=arrayUserRecord[userId].countryName;
	pincode.value=arrayUserRecord[userId].pincode;
	Emailid.value=arrayUserRecord[userId].emailID;
	document.getElementById("edituserpic").src=arrayUserRecord[userId].image;
}
function profileinEditmode()
{
	document.getElementById("Save").style.display="inline-block";
	document.getElementById("Edit").style.display="none";
  	document.getElementById("Edit").disabled=true;
	document.getElementById("Male").disabled=false;
	document.getElementById("Female").disabled=false;
	document.getElementById("Other").disabled=false;
	document.getElementById("Save").disabled=false;
	document.getElementById("Firstname").disabled=false;
	document.getElementById("Lastname").disabled=false;
	document.getElementById("Streetname").disabled=false;
	document.getElementById("Pincode").disabled=false;
	document.getElementById("Statename").disabled=false;
	document.getElementById("Countryname").disabled=false;
	document.getElementById("Cityname").disabled=false;
	document.getElementById("getnewimage").disabled=false;
}



function saveChangedData()
{
	var firstName = document.getElementById("Firstname").value;
    var lastName = document.getElementById("Lastname").value;
/* var gender = document.getElementsByName("Gender").value; */
	if((firstName=="")||(lastName==""))
    {

        document.getElementById("Firstname").style.border="2px solid red";
        document.getElementById("Lastname").style.border="2px solid red";
       
        alert("Please fill out all the mandatory Elements");
		return false;
	}
	else
	{
		document.getElementById("Firstname").style.border="";
        document.getElementById("Lastname").style.border="";
	var userId=sessionStorage.getItem("userId");
	var firstName = document.getElementById("Firstname").value;
	var lastName = document.getElementById("Lastname").value;
	var streetName = document.getElementById("Streetname").value;
	var cityName = document.getElementById("Cityname").value;
	var stateName = document.getElementById("Statename").value;
	var countryName = document.getElementById("Countryname").value;
	var pincode = document.getElementById("Pincode").value;
	var userArrayRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var Gender = document.querySelector('input[name="Gender"]:checked').value;
	var password=userArrayRecord[userId].password;
	var emailID=userArrayRecord[userId].emailID;
	var obj=new Object();
  obj.firstName=firstName;
  obj.lastName=lastName;
  obj.Gender=Gender;
   obj.streetName=streetName;
  obj.cityName=cityName;
  obj.stateName=stateName;
  obj.countryName=countryName;
  obj.pincode=pincode;
  obj.emailID=emailID;
  obj.password=password;
	obj.todoArray=userArrayRecord[userId].todoArray;
	obj.image=userArrayRecord[userId].image;
	
	userArrayRecord[userId]=obj;
	var persondetailsinstring=JSON.stringify(userArrayRecord);
	localStorage.setItem("registeredUserRecord",persondetailsinstring);

	 disableTextbox();
   
	}
}

function disableTextbox()
{
	document.getElementById("Edit").style.display="inline-block";
	document.getElementById("Save").style.display="none";
	document.getElementById("getnewimage").disabled=true;
	document.getElementById("Edit").disabled=false;
	document.getElementById("Save").disabled=true;
	document.getElementById("Firstname").disabled=true;
	document.getElementById("Lastname").disabled=true;
	document.getElementById("Streetname").disabled=true;
	document.getElementById("Pincode").disabled=true;
	document.getElementById("Cityname").disabled=true;
	document.getElementById("Statename").disabled=true;
	document.getElementById("Countryname").disabled=true;
	document.getElementById("Emailid").disabled=true;
	document.getElementById("Male").disabled=true;
	document.getElementById("Female").disabled=true;
	document.getElementById("Other").disabled=true;
	
	
}



function editImage()
{
    
    var Image =document.getElementById("getnewimage").files[0];

    getimgbase64(Image);
    function getimgbase64(Image){
        var reader = new FileReader();
        reader.readAsDataURL(Image);
       
        reader.onload = function () {
          
            var imgdata = reader.result;
            sessionStorage.setItem("tempimgdata1",imgdata);
			document.getElementById("edituserpic").src=sessionStorage.tempimgdata1;
			var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
			var userid=sessionStorage.getItem("userId");

			arrayofuserobject[userid].image=sessionStorage.getItem("tempimgdata1");
			var tostring=JSON.stringify(arrayofuserobject);
			localStorage.setItem("registeredUserRecord",tostring);
        };
    
        reader.onerror = function (error) {
        };
      
		

    }
    
}

  

