import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Navbar } from "../components/Navbar";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <div className="rounded-lg bg-gray-800 w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"chillguy@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"ChillGuy123"}
          />
          <div className="pt-4">
            <Button
              label={"SignUp"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:7777/user/signup",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label={"Already a user"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

