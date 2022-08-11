import { User } from "../Api/User";

function Login(userdetails: any) {
  return new Promise((resolve, reject) => {
    User.login(userdetails)
      .then((res) => {
        if (res.status === 200) {
          saveToken(res.data);
          resolve(res);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

function Refresh() {
  console.log("test");
  User.refresh().then((res) => {
    saveToken(res.data);
  });
}
function Me() {
  return User.me()
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {};
    });
}
function isLoggedIn() {
  const auth = localStorage.getItem("Auth");

  if (!auth) return false;
  const isExpired = Date.now() > JSON.parse(auth).expires_in;
  return !isExpired;
}

function saveToken(data: any) {
  localStorage.setItem(
    "Auth",
    JSON.stringify({
      ...data,
      expires_in: Date.now() + data.expires_in * 1000,
    })
  );
}

function Logout() {
  localStorage.removeItem("Auth");
  User.logout();
}
function Register(data: any) {
  User.register(data);
}

export const UserAuth = {
  login: Login,
  isLoggedIn: isLoggedIn,
  logout: Logout,
  register: Register,
  refresh: Refresh,
  me: Me,
};
