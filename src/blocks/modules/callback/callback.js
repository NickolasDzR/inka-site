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

        var data = await response.json(),
            contentType = response.headers.get("content-type"),
            status = response.status;
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
