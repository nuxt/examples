export default eventHandler(async (event) => {
  const { email, password } = await readBody(event);
  await createUser({
     email,
     name: email.split('@')[0],
     password: await hash(password)
  });
  return {
    message: "Successfully registered!",
  };
});
