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
	var user=document.getElementById("userName1");
	alert(user.value);
	//=arrayUserRecord[userId].firstName;
	
	firstName.value=arrayUserRecord[userId].firstName;
	lastName.value=arrayUserRecord[userId].lastName;
	streetName.value=arrayUserRecord[userId].streetName;
	cityName.value=arrayUserRecord[userId].cityName;
	stateName.value=arrayUserRecord[userId].stateName;
	countryName.value=arrayUserRecord[userId].countryName;
	pincode.value=arrayUserRecord[userId].pincode;
}

function profileinEditmode()
{
	document.getElementById("Edit").disabled=true;
	document.getElementById("Save").disabled=false;
	document.getElementById("Firstname").disabled=false;
	document.getElementById("Lastname").disabled=false;
	document.getElementById("Streetname").disabled=false;
	document.getElementById("Pincode").disabled=false;
	document.getElementById("Statename").disabled=false;
	document.getElementById("Countryname").disabled=false;
	document.getElementById("Cityname").disabled=false;
		 
		var firstName = document.getElementById("Firstname");
		var lastName = document.getElementById("Lastname");
		var streetName = document.getElementById("Streetname");
		var cityName = document.getElementById("Cityname");
		var stateName = document.getElementById("Statename");
		var countryName = document.getElementById("Countryname");
		var pincode = document.getElementById("Pincode");
		var obj=new Object();
  
}
function saveChangedData()
{
	var firstName = document.getElementById("Firstname").value;
	var lastName = document.getElementById("Lastname").value;
	var streetName = document.getElementById("Streetname").value;
	var cityName = document.getElementById("Cityname").value;
	var stateName = document.getElementById("Statename").value;
	var countryName = document.getElementById("Countryname").value;
	var pincode = document.getElementById("Pincode").value;
	var obj=new Object();
  
	obj.firstName=firstName;
	obj.lastName=lastName;
	obj.streetName=streetName;
	obj.cityName=cityName;
	obj.stateName=stateName;
	obj.countryName=countryName;
	obj.pincode=pincode;
	var persondetailsinstring=JSON.stringify(obj);
	localStorage.setItem("registeredUserRecord[userid]",persondetailsinstring);

	 disableTextbox();
   
   return true;
}
function disableTextbox()
{
		document.getElementById("Edit").disabled=false;
	document.getElementById("Save").disabled=true;
	document.getElementById("Firstname").disabled=true;
	document.getElementById("Lastname").disabled=true;
	document.getElementById("Streetname").disabled=true;
	document.getElementById("Pincode").disabled=true;
	document.getElementById("Cityname").disabled=true;
	document.getElementById("Statename").disabled=true;
	document.getElementById("Countryname").disabled=true;
	
}