const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'loading...';
    e.preventDefault();
    if(searchElement){
        fetch('/weather?address=' + searchElement.value).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    msg1.textContent = data.error;
                    msg2.textContent = '';
                }
                else{
                    msg1.textContent = data.location;
                    msg2.textContent = data.forecast;
                }
            });
        });
    }
});