import {logout, snackbar} from "../redux/actions/ApplicationActions";

export default class API {
    dispatchFn;
    userToken;

    constructor(dispatchFn) {
        this.dispatchFn = dispatchFn;
    }

    /**
     * creates and returns an API instance (must be included in first level of the application)
     */
    static createInstance(dispatchFn) {
        if (!this["singleton"]) {
            this["singleton"] = new API(dispatchFn);
        }
        return this["singleton"];
    }

    /**
     * @returns API instance
     */
    static getInstance() {
        return this["singleton"];
    }

    login(body) {
        return new Promise( (resolve, reject) => {
            this.fetch('/users/authenticate', 'POST', body).then(result => {
                if (result.status === 'success') {
                    let user = {
                        ...result.data.user,
                        expiresIn: result.data.expiresIn,
                        token: result.data.token
                    };
                    this.userToken = user.token;
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve({...result, data: { user: user }});
                }

                resolve(result);
            });
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.userToken = null;
        if (this.dispatchFn) {
            this.dispatchFn(logout());
        }
    }

    fetch(url, method = "GET", body = null, query = null, header = {}, contentType = "application/x-www-form-urlencoded") {
        return new Promise((resolve, reject) => {
            if (url.indexOf("http") === -1) {
                header = Object.assign({}, {
                    "Accept": "application/json",
                    "Content-Type": contentType
                }, header);
                url = process.env.API_URL + url;
            }

            if (this.userToken) {
                header = Object.assign({}, {
                    "Authorization": "Bearer " + this.userToken
                }, header);
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
                    if (json.message === 'Unauthorized' && localStorage.getItem('user') !== null) {
                        this.logout();
                        this.dispatchFn(snackbar({
                            open: true,
                            message: 'Unberechtigter Zugriff - Bitte melde dich erneut an',
                            variant: 'error'
                        }));
                        console.error("Status: " + json.status + ", Message: " + json.message);
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
                case 'Unauthorized':
                    return { message: 'Unberechtigter Zugriff - Bitte melde dich erneut an' };
                default:
                    return { message: "Unbekannter Fehler - Bitte kontaktiere einen Admin" };
            }
        } else {
            return error;
        }
    }
}