
import { modalController as bookingModalController } from "../components/BookingModal/BookingModal"

export function handleBookingDataAttributeNodes() {
  document.querySelectorAll('[data-booking-button]').forEach((node) => {
    node.addEventListener('click', () => {
      bookingModalController.actions.show()
    })
  })
}
