import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">En stock</span>;
    }
    return <span className="--color-danger">En rupture de stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>Aucune image pour ce produit</p>
              )}
            </Card>
            <h4>Disponibilité du produit: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Nom: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Catégorie : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Prix : </b> {"XOF"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantité en stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Valeur totale en stock : </b> {"XOF"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Crée le: {product.createdAt.toLocaleString("fr-FR")}
            </code>
            <br />
            <code className="--color-dark">
              Dernière mise à jour: {product.updatedAt.toLocaleString("fr-FR")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
