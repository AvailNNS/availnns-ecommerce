import axios from "axios";


const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api",

});





const getStoredToken = () => {

  if(typeof window === "undefined"){

    return null;

  }


  return localStorage.getItem("token");

};





const isPublicRequest = (url:string = "") => {


  const normalizedUrl =
    url.startsWith("/")
    ? url
    : `/${url}`;



  return [

    "/auth/login",

    "/auth/register",

    "/auth/forgot-password",

    "/auth/reset-password",

    "/products",

    "/products/featured",

    "/products/best-sellers",

    "/products/new-arrivals",

    "/categories",

    "/search",

  ].some(

    (path)=>
      normalizedUrl.startsWith(path)

  );


};






// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use(

(config)=>{


  if(
    !isPublicRequest(
      config.url || ""
    )
  ){


    const token =
      getStoredToken();



    if(token){


      config.headers.Authorization =
        `Bearer ${token}`;


    }


  }



  return config;


},


(error)=>{

  return Promise.reject(error);

}

);







// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(


(response)=>response,


(error)=>{


  if(error.response?.status === 401){


    console.log(
      "Unauthorized"
    );


  }



  return Promise.reject(error);


}


);





export default api;