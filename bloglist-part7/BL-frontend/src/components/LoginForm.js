import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange} // Couple the React state and username input field with this function
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password" // Hides the text
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm