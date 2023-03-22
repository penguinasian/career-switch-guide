import { ref } from "vue";

const fetchBlog = (userEmail) => {

  const userBlogs = ref([])
  const error = ref(null)
  const loadUserBlogs = async (userEmail) => {
    try {
      const data = await fetch("http://localhost:3000/api/v1/blog/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwttoken"),
        },
      });
      console.log(data);
      if (!data.ok) {
        router.push("/");
        throw Error("no data available!");
      }
      userBlogs.value = await data.json();
      userBlogs.value = userBlogs.value.filter((userBlog) => userBlog.userEmail === userEmail)
      console.log(userBlogs.value);
    } catch (err) {
      error.value = err.message;
      console.error(error.value);
    }
  };
 
  loadUserBlogs(userEmail)

  return { userBlogs, error}
}

export default fetchBlog

