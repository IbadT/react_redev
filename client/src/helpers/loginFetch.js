async function loginFetch(body) {
    try {
        return await fetch(process.env.REACT_APP_LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });
    } catch ({ message }) {
        console.log(`login error: ${message}`);
        return message;
    }
};

module.exports = loginFetch;