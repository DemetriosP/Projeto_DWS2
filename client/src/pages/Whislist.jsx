import {DeleteOutlineRounded} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {cleanWhislist, removeWhislistProduct} from "../redux/whislistRedux";
import React from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
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

const Button = styled.button`
  width: 100gd;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 30px;
`;

const EmptyWhislist = styled.div`
  border: 0.5px solid lightgray;
  padding: 100px;
  text-align: center;
  margin: 50px 300px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

function Whislist() {

    const whislist = useSelector((state) => state.whislist);

    const dispatch = useDispatch();

    const handleRemove = (product) => {
        dispatch(removeWhislistProduct({...product}));
    }

    const handleClean = () => {
        dispatch(cleanWhislist())
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            {whislist.products.length ? (
                <Wrapper>
                    <Title>LISTA DE DESEJOS</Title>
                    <Bottom>
                        <Info>
                            {whislist.products.map((product) => (
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
                                                <b>Valor: {product.price}</b>
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <button onClick={() => handleRemove(product, product.quantity)}>
                                            <DeleteOutlineRounded></DeleteOutlineRounded>
                                        </button>
                                    </PriceDetail>
                                </Product>
                            ))}
                            <Hr></Hr>
                        </Info>
                    </Bottom>
                    <Button onClick={() => handleClean()}>LIMPAR LISTA DE DESEJOS</Button>
                </Wrapper>
            ) : (
                <Wrapper>
                    <Title>LISTA DE DESEJOS</Title>
                    <EmptyWhislist>
                        <h1>
                            Sua lista de desejos está vazia
                        </h1>
                        <p>
                            Volte para página inicial e adicione produtos
                        </p>
                    </EmptyWhislist>
                </Wrapper>
            )}
            <Footer/>
        </Container>
    );
}

export default Whislist;
