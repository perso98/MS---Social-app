import axios from "axios";
axios.defaults.withCredentials = true;
export const register = async (e, registerForm, setRegisterForm, setAlert) => {
  e.preventDefault();
  await axios
    .post("/user/register", {
      email: registerForm.email,
      password: registerForm.password,
      name: registerForm.name,
      surname: registerForm.surname,
    })
    .then((res) => {
      if (res.data.success) {
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
        setRegisterForm({
          email: "",
          password: "",
          password2: "",
          name: "",
          surname: "",
        });
      } else {
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
      }
    });
};
export const auth = async (setUser) => {
  await axios.get("/user/auth").then((res) => {
    if (res.data.success) {
      setUser(res.data.user);
    }
  });
};
export const login = async (e, loginForm, setAlert, setUser, navigate) => {
  e.preventDefault();
  await axios
    .post("/user/login", {
      email: loginForm.email,
      password: loginForm.password,
    })
    .then((res) => {
      if (res.data.success) {
        setUser(res.data.user);
        navigate("/");
      } else {
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
      }
    });
};
export const logout = async (setUser, navigate) => {
  await axios.post("/user/logout").then((res) => {
    setUser(null);
    navigate("/auth");
  });
};
