const AV = require('leancloud-storage')

const UserProvider = {
  _loadingPromise: null,
  login (username, password = username) {
    if (!this._loadingPromise)
      this._loadingPromise = AV.User.logIn(username, password)  
    return this._loadingPromise
  },
  logout () {
    return AV.User.logOut()
  }
}

export default UserProvider