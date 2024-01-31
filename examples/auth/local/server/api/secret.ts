export default eventHandler(async (event) => {
  const auth = await requireAuthSession(event)
  return {
    message: `You are accessing secret api with email: ${auth.data.email}`,
  }
})
