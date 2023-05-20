export const handleErrorCode = (
  code: string,
  emailCallback: (message: string) => void,
  passwordCallback: (message: string) => void
) => {
  switch (code) {
    case 'auth/invalid-email':
      emailCallback('invalid email')
      return true
    case 'auth/wrong-password':
      passwordCallback('wrong password')
      return true
    case 'auth/user-not-found':
      emailCallback('user not found')
      return true
    case 'auth/email-already-in-use':
      emailCallback('email already in use')
      return true
    case 'auth/weak-password':
      passwordCallback('weak password')
      return true
    default:
      return false
  }
}
