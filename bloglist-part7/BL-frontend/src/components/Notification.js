const Notification = ({ message, typeOfMessage }) => {
  // If message is falsy, enter if block and return null
  if (!message) {
    return null
  }

  return (
    <>
      <div id='notification' className={typeOfMessage}>
        {message}
      </div>
    </>
  )
}

export default Notification