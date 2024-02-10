export const getPosts = async () => {
    
    try {
        const response = await fetch("https://gentle-fawn-shrug.cyclic.app/posts/", {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }


}

