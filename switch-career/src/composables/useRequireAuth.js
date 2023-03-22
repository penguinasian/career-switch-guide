import { useRouter } from "vue-router";
import { ref} from "vue";

const useRequireAuth = (email) => {
  const isLoggedIn = ref(false)
  const userName = ref('')
  const requireAuth = async (email) => {
    
    
      const router = useRouter()
      console.log("email: ", email)
  
      try {
          const response = await fetch(
            "http://localhost:3000/api/v1/user/route-guard",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwttoken"),
              },
              body: JSON.stringify({email})
              // body: JSON.stringify({token}),
            }
          );
          console.log(response)

          
          if (!response.ok) {
              
              router.push("/")
              throw Error('Sorry, Please log in first!')
  
          }

          const userData = await response.json()
          console.log(userData)
          isLoggedIn.value = true
          
          userName.value = userData[0].name
          console.log(response.ok)
          
          
        } catch (err) {
          
          console.error(err.message);
        }
  }

  return { requireAuth, isLoggedIn, userName }
}


export default useRequireAuth