function signIn() {
    localStorage.setItem('isRegistered', 'true');

    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"

    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
        "client_id": "89192876707-q61vsvn6utggb1v0qkt870gcg6h9mjl7.apps.googleusercontent.com",
        "redirect_uri": "http://localhost:3000/profile.html",
        // "redirect_uri": "/profile",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly",
        "include_granted_scopes": 'true',
        'state': 'pass-through-value'
    }

    for (var p in params) {
        var input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}