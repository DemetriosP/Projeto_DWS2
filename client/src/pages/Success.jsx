import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {userRequest} from "../requestMethods";

const Success = () => {
    const location = useLocation();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.
    const data = location.state.stripeData;
    const trans = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    name: currentUser.username,
                    products: trans.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: trans.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (erro){
                console.log(erro.response.data)
            }
        };
        data && createOrder();
    }, [trans, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Orem foi criada, Id da ordem: ${orderId}`
                : `Está sendo preparada...`}
            <Link to="/">
                <button style={{padding: 10, marginTop: 20}}>Voltar para a Home</button>
            </Link>

        </div>
    );
};

export default Success;
