import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {mobile} from "../responsive";
import {login} from "../redux/apiCalls";
import {Link, useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "75%"})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #195128;
  color: white;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password}, navigate);
    };
    return (
        <Container>
            {" "}
            <Wrapper>
                <Title>Login</Title>
                <Form>
                    <Input placeholder="usuario" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="senha" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick}>Entrar</Button>
                    <Link to="/register">Cadastre-se</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
