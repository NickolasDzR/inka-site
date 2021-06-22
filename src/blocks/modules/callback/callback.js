const url = "http://inka.finance:90/api/subscribe";

async function sendData() {
    try {
        let response = await fetch('http://inka.finance:90/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"email": "aema2i@qemail.com", "username": "user2"})
        });

        let result = await response.json();
        console.log(result.message);
        // var response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        //     mathod: "POST",
        //     body: JSON.stringify({email: "email@email.com", user: "user"}),
        // })
        //
        // var data = await response.json(),
        //     contentType = response.headers.get("content-type"),
        //     status = response.status;
    } catch {
        console.log("erorr");
    }
}


const btn = document.querySelector(".button");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const input = e.target.closest("form").querySelector("input");
    const value = input.value;

    sendData();
});
