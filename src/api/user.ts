export async function login(email?: string, password?: string) {
  if (!email || !password) {
    return null;
  }
  const userResult = await fetch("http://localhost:3000/user");
  const user = await userResult.json();
  if (user.email === email && user.password === password) {
    return "mock-token";
  } else {
    return null;
  }
}
