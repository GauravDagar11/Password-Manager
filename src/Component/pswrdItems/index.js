import './index.css'

const PasswordItems = props => {
  const {list, showPassword, delItem} = props
  const {id, website, username, password} = list

  const delItems = () => {
    delItem(id)
  }

  const passwordText = showPassword ? (
    <p className="user-details">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-icon"
    />
  )

  return (
    <li className="list-container">
      <div className="user-profile-details-container">
        <div className="name-logo">
          <p className="user-name-logo">G</p>
        </div>
        <div className="user-details-container">
          <p className="user-details">{website}</p>
          <p className="user-details">{username}</p>
          {passwordText}
        </div>
      </div>
      <button
        type="button"
        data-testid="delete"
        className="del-btn"
        onClick={delItems}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItems
