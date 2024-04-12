async function registerFetch(body) {
    try {
        return await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        })
    } catch ({ message }) {
        console.log("Register error: ", message);
        return message;
    }
};

module.exports = registerFetch;