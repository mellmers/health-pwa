export default class API {

    /**
     * @returns API instance
     */
    static getInstance() {
        if (!this["singleton"]) {
            this["singleton"] = new API();
        }
        return this["singleton"];
    }

    login(body) {
        return new Promise( (resolve, reject) => {
            this._fetch('/users/authenticate', 'POST', body).then( result => {
                // TODO: Save result in cookie
                console.log('login', result);
                resolve(result);
            });
        });
    }

    logout() {
        // TODO: Remove login and user data from cookie and from Redux State
    }

    _fetch(url, method = "GET", body = null, query = null, header = {}, contentType = "application/x-www-form-urlencoded") {
        return new Promise((resolve, reject) => {
            if (url.indexOf("http") === -1) {
                header = Object.assign({}, {
                    "Accept": "application/json",
                    "Content-Type": contentType
                }, header);
                url = process.env.API_URL + url;
            }

            let headers = new Headers();
            for (let key in header) {
                if (!header.hasOwnProperty(key)) continue;
                headers.append(key, header[key]);
            }

            if (query) {
                url += "?";
                let keys = Object.keys(query);
                keys.forEach((key, index) => {
                    if (!query.hasOwnProperty(key)) return;
                    url += key + "=" + query[key];
                    if (keys.length-1 > index) {
                        url += "&";
                    }
                });
            }

            let formBody = null;
            if (body) {
                formBody = [];
                for (const property in body) {
                    const encodedKey = encodeURIComponent(property);
                    const encodedValue = encodeURIComponent(body[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
            }

            fetch(url, {
                headers: headers,
                body: formBody,
                method: method
            })
                .then(this._parseJson)
                .then(json => {
                    if (json.error) {
                        console.error("Status: " + json.status + ", Error: " + json.error + ", Message: " + json.message);
                        reject(this._parseError(json));
                    }
                    resolve(json);
                })
                .catch(error => {
                    console.error("Unexpected Error in API", error);
                    reject({error: this._parseError(error)});
                });
        });
    }

    _parseJson(response) {
        return [204, 409].includes(parseInt(response.status)) ? { status: response.status } : response.json()
    }

    _parseError(error) {
        if (error && error.message) {
            switch (error.message) {
                default:
                    return {
                        message: "Unbekannter Fehler - Bitte kontaktiere einen Admin"
                    };
            }
        } else {
            return error;
        }
    }
}