export default eventHandler(async (event) => {
  const session = await useAuthSession(event);
  return session.data;
});
