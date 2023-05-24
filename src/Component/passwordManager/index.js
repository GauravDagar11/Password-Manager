import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItems from '../pswrdItems'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchedInput: '',
    showPassword: false,
    count: 0,
  }

  onAddPasswordList = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const addPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, addPassword],
    }))
    this.setState({websiteInput: '', usernameInput: '', passwordInput: ''})
    this.setState(prevVal => ({count: prevVal.count + 1}))
  }

  onAddWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onAddUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onAddPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  checkbox = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  delList = id => {
    const {passwordList} = this.state
    const deletedList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: deletedList})
    this.setState(prevVal => ({count: prevVal.count - 1}))
  }

  searchPasswords = event => {
    this.setState({searchedInput: event.target.value})
  }

  render() {
    const {
      passwordList,
      websiteInput,
      usernameInput,
      passwordInput,
      showPassword,
      searchedInput,
    } = this.state
    let {count} = this.state
    const searchedResult = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchedInput.toLowerCase()),
    )
    count = searchedResult.length
    let text
    if (count === 0) {
      text = (
        <div className="no-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-image"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    } else {
      text = (
        <ul className="ul-list">
          {searchedResult.map(eachItem => (
            <PasswordItems
              key={eachItem.id}
              list={eachItem}
              showPassword={showPassword}
              delItem={this.delList}
              count={count}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="add-password-container">
          <form className="form-container" onSubmit={this.onAddPasswordList}>
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-icon"
              />
              <input
                type="text"
                className="form-control input"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onAddWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-icon"
              />
              <input
                type="text"
                className="form-control input"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onAddUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-icon"
              />
              <input
                type="password"
                className="form-control input"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onAddPassword}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="btn btn-primary add-btn">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-img"
          />
        </div>
        <div className="show-password-container">
          <div className="passwordCount-searchBar-container">
            <div className="password-count-container">
              <h1 className="password-text">Your Passwords</h1>
              <p className="password-count">{count}</p>
            </div>
            <div className="search-bar-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                onChange={this.searchPasswords}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox" onClick={this.checkbox} />
            <label htmlFor="checkbox" className="checkbox-label">
              Show passwords
            </label>
          </div>
          {text}
        </div>
      </div>
    )
  }
}

export default PasswordManager
