import { parsePhoneNumber } from 'libphonenumber-js/max' // używamy /max dla pełnych reguł

export async function validatePhoneNumber(phoneNumberText: string) {
  try {
    const phoneNumber = parsePhoneNumber(phoneNumberText, { extract: false }) // strict mode
    return phoneNumber?.isValid() || false
  } catch {
    return false
  }
}
