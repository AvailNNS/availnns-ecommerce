"use client";


import {
  MapPin,
  ExternalLink,
  Navigation,
  Copy,
  Check,
} from "lucide-react";


import {
  useState,
} from "react";


interface Props {

location:any;

}



export default function OrderLocationCard({

location,

}:Props){



const [copied,setCopied] =
useState(false);





if(!location){

return null;

}




const mapLink =

location.googleMapLink

?

location.googleMapLink

:

location.latitude &&
location.longitude

?

`https://www.google.com/maps?q=${location.latitude},${location.longitude}`

:

"";







const fullAddress =

location.formattedAddress ||

[
location.area,
location.district,
location.division
]
.filter(Boolean)
.join(", ");







const copyAddress = async()=>{


try{


await navigator.clipboard.writeText(

fullAddress

);


setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);



}
catch(error){

console.log(error);

}



};






return (


<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">







{/* HEADER */}


<div className="
flex
items-center
gap-3
mb-6
">


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-black
text-white
">


<MapPin size={24}/>


</div>





<div>


<h2 className="
text-xl
font-black
">

Delivery Location

</h2>


<p className="
text-sm
text-zinc-500
">

Customer selected location

</p>



</div>



</div>









{/* ADDRESS GRID */}



<div className="
grid
gap-5
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
font-bold
">

{
location.division || "-"
}

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
font-bold
">

{
location.district || "-"
}

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
font-bold
">

{
location.area || "-"
}

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
font-bold
">

{
location.road || "-"
}

</p>


</div>




</div>









{/* FULL ADDRESS */}



<div className="
mt-6
rounded-2xl
bg-zinc-50
p-5
">


<div className="
flex
justify-between
items-center
">


<p className="
text-sm
text-zinc-500
">

Full Address

</p>





<button

onClick={copyAddress}

className="
text-zinc-500
hover:text-black
"


>

{

copied

?

<Check size={18}/>

:

<Copy size={18}/>

}


</button>



</div>





<p className="
mt-2
font-semibold
leading-relaxed
">


{
fullAddress || "-"
}


</p>



</div>









{/* COORDINATES */}



<div className="
mt-6
grid
gap-4
md:grid-cols-2
">





<div className="
rounded-2xl
border
p-4
">


<p className="
text-xs
text-zinc-500
">

Latitude

</p>


<p className="
font-bold
">

{
location.latitude || "-"
}

</p>


</div>








<div className="
rounded-2xl
border
p-4
">


<p className="
text-xs
text-zinc-500
">

Longitude

</p>


<p className="
font-bold
">

{
location.longitude || "-"
}

</p>


</div>




</div>









{/* MAP BUTTON */}



{

mapLink &&


<a

href={mapLink}

target="_blank"

rel="noopener noreferrer"


className="
mt-6
flex
items-center
justify-center
gap-3
rounded-2xl
bg-black
py-4
font-bold
text-white
transition
hover:opacity-90
"


>


<Navigation size={18}/>


Open Google Map


<ExternalLink size={18}/>



</a>



}








</div>


);


}