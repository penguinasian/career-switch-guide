import { ref } from "vue"

const fetchABlog = (blogId, jwttoken) => {

    const blogData = ref(null)

    const blogContent = ref("")

    const getABlog = async (blogId, jwttoken) => {

        try {
          
            const response = await fetch("http://localhost:3000/api/v1/blog/post/" + blogId, {
              method: "Get",
              headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + jwttoken,  
              }
            })

            if (!response.ok) {
              throw new Error('Fetch failed')
            }
            const data = await response.json()
            console.log(data)
            blogData.value = data
            blogContent.value = data.blog
            
        } catch (err) {
            console.error(err.message)
        }
      }

      getABlog(blogId, jwttoken)

      return { blogData, blogContent }
}

export default fetchABlog