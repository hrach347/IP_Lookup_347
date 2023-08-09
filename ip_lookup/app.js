let xhr = new XMLHttpRequest()
xhr.open("GET", "http://api.techniknews.net/ipgeo/")
xhr.responseType = "json"

let ip = document.getElementById('ipAddress')
let infos = document.querySelector("#infos>div")


xhr.onload = () => {
    show()
}

xhr.send()

let button = document.getElementById('look')
button.addEventListener('click', () => {
    xhr.open("GET", `http://api.techniknews.net/ipgeo/${ip.value}`)
    xhr.onload = () => {
        show()
    }
    xhr.send()
})


function show() {
    let res = xhr.response
    infos.innerHTML = ``
    if (res.ip === undefined || res.status == "fail") {
        ip.value = "IP Failed"
        return 0
    }
    infos.innerHTML = `
    <div class="info">
    <h3>
        Location
    </h3>
    <h4>
    <a href="#" target="_blank" id="locationLink" title="Click here!">
        <span class="material-symbols-outlined" style="font-size: 40px;color: #0096FF;">
            share_location
        </span>
    </a>  
    </h4>
    </div>
        `
    let locationLink = document.getElementById("locationLink")
    locationLink.href = `https://www.google.com/maps/place/${res.lat},${res.lon}`
    ip.value = res.ip
    for (let key in res) {
        if (key === "ip" || key === "lat" || key === "lon" || key === "reverse") {
            continue
        }
        let div = document.createElement('div')
        div.className = "info"
        let h3 = document.createElement('h3')
        let keyUppercase = key.charAt(0).toUpperCase() + key.slice(1)
        h3.innerText = keyUppercase + ": "
        let h4 = document.createElement('h4')
        if (res[key] === "" || res[key] === "null") {
            h4.innerText = "Not Found"
        }
        else {
            h4.innerText = res[key]
        }
        div.append(h3)
        div.append(h4)
        infos.append(div)
    }

}