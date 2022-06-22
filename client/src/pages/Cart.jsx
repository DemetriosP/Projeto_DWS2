import {Add, DeleteOutlineRounded, Remove} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import {changeProductQuantity, cleanCart, removeProduct} from "../redux/cartRedux";

const KEY = "pk_test_51L71WzKV5ghIcaS2zl8NoxbH9ZqyLefK9jNEztoIIpdaU8qPHAgCxkj9LJwijS4cJfVnzgmmPFIRxforG1ouJAnL009DkSAH6x";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: "5px 15px"})}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom: "20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const EmptyCart = styled.div`
  border: 0.5px solid lightgray;
  padding: 100px;
  text-align: center;
  margin: 50px 300px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 200px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

function Cart() {
    const cart = useSelector((state) => state.cart);

    const [stripeToken, setStripeToken] = useState(null);

    const navigate = useNavigate()

    const onToken = (token) => {
        setStripeToken(token);
    }

    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success", {
                    state: {
                        cart: cart,
                        stripeData: res.data
                    },

                });
            } catch (err) {
                console.log(err)
            }
        };

        stripeToken && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, navigate]);

    const handleRemove = (product) => {
        dispatch(removeProduct({...product}));
    }

    const handleClean = () => {
        dispatch(cleanCart())
    }

    const handleQuantity = (product, tipo) => {
        dispatch(changeProductQuantity({...product, tipo}))
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            {cart.products.length ? (
                <Wrapper>
                    <Title>SEU CARRINHO</Title>
                    <Top>
                        <Link to="/products">
                            <TopButton>CONTINUAR COMPRANDO</TopButton>
                        </Link>
                    </Top>
                    <Bottom>
                        <Info>
                            {cart.products.map((product) => (
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.img}/>
                                        <Details>
                                            <ProductName>
                                                <b>Produto: {product.tittle}</b>
                                            </ProductName>
                                            <ProductId>
                                                <b>Descrição: {product.desc}</b>
                                            </ProductId>
                                            <ProductId>
                                                <b>Fabricante: {product.brand}</b>
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Remove onClick={() => handleQuantity(product, "dec")}/>
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <Add onClick={() => handleQuantity(product, "inc")}/>
                                        </ProductAmountContainer>
                                        <button onClick={() => handleRemove(product, product.quantity)}>
                                            <DeleteOutlineRounded></DeleteOutlineRounded>
                                        </button>
                                        <ProductPrice>R$ {product.price * product.quantity}</ProductPrice>
                                    </PriceDetail>
                                </Product>
                            ))}
                            <Hr/>
                        </Info>
                        <Summary>
                            <SummaryTitle>RESUMO PEDIDO</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Taxa de Entrega</SummaryItemText>
                                <SummaryItemPrice>R$ {cart.shipping}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Desconto</SummaryItemText>
                                <SummaryItemPrice>R$ {cart.discount}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            {user ? (
                                <StripeCheckout
                                    name="Double Biceps"
                                    image="https://image.shutterstock.com/image-vector/double-bicep-vector-illustration-260nw-1366030016.jpg"
                                    billingAddress
                                    shippingAddress
                                    description={`O total é igual: $${cart.total}`}
                                    amount={cart.total * 100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button>FINALIZAR COMPRA</Button>
                                </StripeCheckout>
                            ) : (
                                <Link to="/login">
                                    <Button>FAZER LOGIN</Button>
                                </Link>
                            )}
                        </Summary>
                    </Bottom>
                    <Button onClick={() => handleClean()}>LIMPAR CARRINHO</Button>
                </Wrapper>
            ) : (
                <Wrapper>
                    <Title>SEU CARRINHO</Title>
                    <EmptyCart>
                        <h1>
                            Seu carrinho está vazio
                        </h1>
                        <p>
                            Volte para página inicial ou escolha outros produtos
                        </p>
                    </EmptyCart>
                </Wrapper>
            )}
            <Footer/>
        </Container>
    );
}

export default Cart;
