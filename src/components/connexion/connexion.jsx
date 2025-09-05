
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../slices/usersapiSlice";
import { setCredentials } from "../../slices/authSlice";
import "./connexion.scss";
import { useEffect, useState } from "react";
import animationData from "../lottieLogin.json";
import Lottie from "lottie-react";

const Connexion = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/admin");
    }
  }, [navigate, userInfo]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ pseudo, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div id="container-fluid m-0">
        <div className="row min-vh-100">
          {/* Colonne du formulaire */}
          <div className="col-12 col-md-5 my-3 my-md-5">
            <div className="w-100 d-flex justify-content-center align-items-center flex-column h-100">
              <p className="title">BIG MONEY BUSINESS</p>
              <p className="title">عالم البزنس مودل بين يديك</p>
              <p className="title">أهلاً بك</p>
              <form className="form" onSubmit={onSubmit}>
                <input
                  className="input"
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  value={pseudo}
                  placeholder="إسم الحساب"
                  onChange={(e) => setPseudo(e.target.value)}
                />
                <input
                  type="password"
                  className="input"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة السر"
                />
                <button className="form-btn">دخول</button>
              </form>
            </div>
            <div className=" d-flex justify-content-center align-items-center">

              <Link className="btn btn-elegant text-white d-inline-flex align-items-center"

                to="/Condition"

              >
                شروط الخدمة
              </Link>


              <Link className="btn btn-elegant text-white d-inline-flex align-items-center"

                to="/About"

              >
                قصتنا
              </Link>


              <Link className="btn btn-elegant text-white d-inline-flex align-items-center"

                to="/Vision"

              >
                رؤيتنا
              </Link>

            </div>
          </div>

          {/* Colonne de l'animation - cachée sur mobile */}
          <div className="d-none d-md-block col-md-7 bg-light" style={{ minHeight: "100vh" }}>
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>


  );
};

export default Connexion;
