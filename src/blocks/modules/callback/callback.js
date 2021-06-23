const url = "http://inka.finance:90/api/subscribe";

const btn = document.querySelector(".button");
const formError = document.querySelector(".callback__form").dataset.error;

async function sendData(formData) {
    try {

        let response = await fetch('http://inka.finance:90/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        });

        var data = await response.json(),
            contentType = response.headers.get("content-type"),
            status = response.status;

        if (contentType && contentType.indexOf("application/json") !== -1 && status === 200 && data.status === "error" || data.status === "Success!") {
            if (data.status === "Success!") {
                messageHandler(data.message, data.status)
            }
            if (data.status === "error") {
                messageHandler(data.message, data.status)
            }
        } else if (status === 419) {
            alert("Пожалуйста, повторите отправку данных еще раз после перезагрузки страницы");
            window.location.reload();
            return false;
        } else {
            return alert(formError);
        }
    } catch {
        console.log("erorr");
    }
}

const messageHandler = (message, type) => {
    let messageAnswer;

    if (type === "error") {
        messageAnswer = "Please, enter a valid E-mail address";
        footerHeading.classList.add("footer__heading_error");
    }
    if (type === "Success!") {
        messageAnswer = message;
    }
    if (type === "valid error") {
        messageAnswer = message;
    }

    const footerHeading = document.querySelector(".footer__heading");
    return footerHeading.innerHTML = messageAnswer;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputs = e.target.closest("form").querySelectorAll("input");
    let inputsData = {};

    inputs.forEach(el => {
        inputsData[el.dataset.type] = el.value;
    });


    return sendData(inputsData);

});
