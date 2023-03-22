import { useRouter } from "vue-router";

const logOutUser = async (email, isLoggedIn) => {

    const router = useRouter()

    try {
        
        const response = await fetch('http://localhost:3000/api/v1/user/signout', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({email})
            })

        localStorage.setItem('jwttoken', '')
        localStorage.setItem('email', '')
        console.log(response)
        isLoggedIn = false
        
        // router.push({name: "login"})


    } catch (err) {
        console.error(err.message)
    }
}

export default logOutUser