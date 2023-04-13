import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("Tous les champs sont requis");
    }
    if (password.length < 8) {
      return toast.error("Le mot de passe doit contenir au moins 8 caractères");
    }
    if (!validateEmail(email)) {
      return toast.error("Veuillez entrer un e-mail valide");
    }
    if (password !== password2) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      dispach(SET_LOGIN(true));
      dispach(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>S'inscrire</h2>

          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Nom complet"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Mot de passe confirmé"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              S'inscrire
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Acceuil</Link>
            <p> &nbsp; Déjà un compte? &nbsp;</p>
            <Link to="/login">Se connecter</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
