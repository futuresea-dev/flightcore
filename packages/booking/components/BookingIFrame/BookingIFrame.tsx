export const BookingIFrame = () => {
  return (
    <iframe
      style={{
        minWidth: 370,
        maxWidth: 980,
        width: '100%',
        height: '100%',
      }}
      loading="eager"
      src="https://flightcore.pl/booking"
      onClick={(e) => e.stopPropagation()}
    />
  )
}
