import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Navbar } from "../components/Navbar";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  return (
    <div className="bg-black h-screen flex justify-center ">
      <Navbar />
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-gray-100 w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"chillguy@gmail.com"} />
          <InputBox label={"Password"} placeholder={"ChillGuy123"} />
          <div className="pt-4">
            <Button label={"SignIn"} />
          </div>
          <BottomWarning label={"Not a user?"} buttonText={"SignUp"} to={"/"} />
        </div>
      </div>
    </div>
  );
};
