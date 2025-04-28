import { useState } from "react";
import { Button, Input, PasswordInput } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import service from "../services/service";

export const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notifications.show({
        title: "All fields required",
        color: "red",
      });
      return;
    }
    setLoading(true);

    // Login logic here
    try {
      const response = await service.post("/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        notifications.show({
          title: "Login Success",
          message: "You have been logged in successfully.",
          color: "green",
        });
        localStorage.setItem("token", response.data.data.token);
        onClose();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Login Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-2 text-white/80 text-center">
        SignIn
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <Input.Wrapper label="Email">
          <Input
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            styles={{
              input: {
                backgroundColor: "black",
              },
            }}
          />
        </Input.Wrapper>
        {/* password input */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          styles={{
            innerInput: {
              backgroundColor: "black",
            },
          }}
        />
        {/* Submit Button */}
        <div className="text-center">
          <Button
            w="100%"
            mb="sm"
            size="sm"
            type="submit"
            color="indigo"
            loading={loading}
            mt="sm"
          >
            SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};
