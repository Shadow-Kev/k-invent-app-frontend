import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const Reset = () => {
  const initialState = {
    password: "",
    password2: "",
  };
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("Veuillez remplir tous les champs");
    }

    if (password.length < 8) {
      return toast.error("Le mot de passe doit contenir au moins 8 caractères");
    }

    if (password !== password2) {
      return toast.error("Les mots de passe ne correspondent pas");
    }
    const userData = {
      password,
      password2,
    };
    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Réinitialisation</h2>

          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="Votre nouveau mot de passe"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirmé votre mot de passe"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Réinitialiser
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Acceuil</Link>
              </p>
              <p>
                <Link to="/login">- Se Connecter</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
