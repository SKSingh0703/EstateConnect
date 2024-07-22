// import {Link} from "react-router-dom"

// export default function SignUp() {
//   return (
//     <div className="p-3 max-w-lg mx-auto"> 
//       <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//       <form className="flex flex-col gap-4  ">
//         <input type="text" placeholder="username"  className="border p-3 rounded-lg" id="username" />
//         <input type="email" placeholder="email"  className="border p-3 rounded-lg" id="email" />
//         <input type="password" placeholder="password"  className="border p-3 rounded-lg" id="password" />
//         <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 " >Sign up</button>
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>Hava an account?</p>
//         <Link to={"/sign-in"}>
//           <span className="text-blue-700">Sign in</span>
//         </Link>
//       </div>
//     </div>
//   )
// }

import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-14">
      <h1 className="text-4xl text-center font-bold text-gray-900">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" />
        <button className="bg-blue-600 text-white py-3 rounded-lg uppercase hover:bg-blue-700 transition duration-300" type="submit">Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5 text-gray-600">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700 hover:underline">Sign In</Link>
      </div>
    </div>
  );
}


