"use client";


import {
  useState,
} from "react";


import {
  MapPin,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";



interface Props {


location:{

formattedAddress:string;

division:string;

district:string;

area:string;

road:string;

latitude:string;

longitude:string;

googleMapLink:string;

};


setLocation:(data:any)=>void;


}




export default function LocationPicker({

location,

setLocation,

}:Props){



const [loading,setLoading]=
useState(false);



const [error,setError]=
useState("");







const getCurrentLocation=()=>{


if(
!navigator.geolocation
){

setError(
"Location not supported"
);

return;

}





setLoading(true);

setError("");





navigator.geolocation.getCurrentPosition(

async(position)=>{



try{



const lat =
position.coords.latitude;


const lng =
position.coords.longitude;






// REVERSE GEO CODE


const response =
await fetch(

`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

);




const data =
await response.json();





const address =
data.address || {};







const locationData={



formattedAddress:

data.display_name || "",




division:

address.state || "",




district:

address.city ||

address.county ||

"",




area:

address.suburb ||

address.town ||

"",




road:

address.road ||

"",




latitude:

String(lat),




longitude:

String(lng),




googleMapLink:

`https://www.google.com/maps?q=${lat},${lng}`



};








setLocation(
locationData
);






}
catch(err){


setError(
"Address fetch failed"
);


}

finally{


setLoading(false);


}





},




(error)=>{


console.log(error);


setError(
"Please allow location permission"
);


setLoading(false);


},


{

enableHighAccuracy:true,

timeout:10000,

}


);



};







return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">






<div className="
mb-6
flex
items-center
gap-3
">


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-zinc-100
">


<MapPin size={24}/>


</div>




<div>


<h2 className="
text-xl
font-bold
">

Delivery Location

</h2>


<p className="
text-sm
text-zinc-500
">

Choose your delivery location

</p>



</div>



</div>









<button


type="button"


onClick={getCurrentLocation}



disabled={loading}



className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-black
py-4
font-semibold
text-white
transition
hover:opacity-90
disabled:opacity-50
"


>


{


loading

?

<>

<Loader2

size={20}

className="
animate-spin
"

/>

Finding location...

</>


:

<>

<MapPin size={20}/>

Use Current Location

</>


}



</button>









{
error &&


<div className="
mt-4
rounded-xl
bg-red-50
p-4
text-sm
text-red-600
">

{error}

</div>


}









{
location.latitude &&



<div className="
mt-6
space-y-4
rounded-2xl
bg-green-50
p-5
"
>




<div className="
flex
items-center
gap-2
font-bold
text-green-700
">

<CheckCircle size={20}/>

Location Selected

</div>









<div className="
grid
gap-3
md:grid-cols-2
">





<div>

<p className="
text-xs
text-zinc-500
">

Division

</p>


<p className="
font-semibold
">

{location.division || "-"}

</p>


</div>






<div>

<p className="
text-xs
text-zinc-500
">

District

</p>


<p className="
font-semibold
">

{location.district || "-"}

</p>


</div>







<div>

<p className="
text-xs
text-zinc-500
">

Area

</p>


<p className="
font-semibold
">

{location.area || "-"}

</p>


</div>







<div>

<p className="
text-xs
text-zinc-500
">

Road

</p>


<p className="
font-semibold
">

{location.road || "-"}

</p>


</div>






</div>









<div>


<p className="
text-xs
text-zinc-500
">

Full Address

</p>



<p className="
font-semibold
">

{location.formattedAddress}

</p>


</div>









<a


href={location.googleMapLink}


target="_blank"



className="
inline-flex
items-center
gap-2
rounded-xl
bg-white
px-4
py-3
font-semibold
shadow
"


>


<ExternalLink size={18}/>

Open Google Map


</a>








</div>



}



</div>


);


}