import { signInWithGoogle } from '../../firebase.config';

const Login = () => {

  const GoogleIcon = () => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="48" height="48"
      viewBox="0 0 48 48"
    >
      <path fill="#FFC107" 
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,
      5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,
      12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
      </path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,
      0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
      </path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29211,
      35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
      </path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,
      4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,
      34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
      </path>
    </svg>)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-center bg-cover bg-[url('https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/life/life-13.jpg')]">
      <div className='grid grid-flow-row grid-rows-5 p-10 bg-opacity-40 bg-zinc-600 justify-items-center border rounded-full w-[30vw] h-[30vw] text-white'>
        <div className='flex flex-col align-center items-center justify-center my-2'>
          <p className='font-bold text-5xl'>LOG IN</p>
          <p className='font-medium text-md py-2'>ITem Support @IT.KMITL | Admin Panel</p>
        </div>
        <div className='row-start-3'>
        <div className="rounded-lg bg-white flex border p-2 w-[20vw] items-center justify-center" onClick={signInWithGoogle}>
            <GoogleIcon/>
            <p className='m-3 text-md text-gray-600 font-bold'>Sign In with Google</p>
        </div>
        {/* <p className='m-2 text-red-400 font-light mx-10'> Please use account <span className='font-medium'> @it.kmitl.ac.th </span> for sign in</p> */}
        {/* <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div> */}
        <div>
            <span>
              
            </span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login;