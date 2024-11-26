let phoneNumberUtil: any = null

async function getPhoneNumberUtil() {
  if (!phoneNumberUtil) {
    const { PhoneNumberUtil } = await import('google-libphonenumber')
    phoneNumberUtil = PhoneNumberUtil.getInstance()
  }
  return phoneNumberUtil
}

export async function validatePhoneNumber(phoneNumberText: string) {
  try {
    const phoneUtil = await getPhoneNumberUtil()
    const phoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumberText)
    return phoneUtil.isValidNumber(phoneNumber)
  } catch {
    return false
  }
}
