import React, { useState } from "react";
import { Avatar, Container } from "@mantine/core";
import Home1 from "../Home/HomeParts/Home1";
import { Button } from "@mantine/core";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { InputWrapper } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../state/auth/auth.state";
import { useHistory } from "react-router-dom";
import { Modal, Autocomplete } from "@mantine/core";
import { Loader } from "@mantine/core";

import {
  RegionInterface,
  regions,
  useSignUp,
} from "../../server-state/mutations/use-register";
import { useUpload } from "../../server-state/mutations/use-upload";
import { useVerfication } from "../../server-state/mutations/use-confirm-email";

const Input = styled("input")({
  display: "none",
});

interface FormValue extends RegionInterface {
  email: string;
  password: string;
  confirmPassword: string;
  fName: string;
  lName: string;
  phone: string;
  code: string;
  city: string;
  profile_image_id: number;
}

const RegisterPage = () => {
  const [opened, setOpened] = useState(false);
  const signUp = useSignUp();
  const upload = useUpload();
  const verification = useVerfication();
  const [mediaUrl, setMediaUrl] = useState("");

  const { push } = useHistory();

  const {
    tokens: { access },
  } = useAuth();
  const isLogin = Boolean(access);
  if (isLogin) {
    push("/");
  }
  const { getInputProps, onSubmit, values, setValues, setErrors } =
    useForm<FormValue>({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        fName: "",
        lName: "",
        phone: "",
        region: "tashkent_region",
        code: "",
        city: "",
        profile_image_id: 0,
      },

      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        fName: (value) => (value.length > 3 ? null : "First name is too small"),
        lName: (value) => (value.length > 3 ? null : "First name is too small"),
        password: (value) =>
          /^.*(?=.{13,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(value)
            ? null
            : "Password must contain at least 13 characters, one uppercase, one number",
        confirmPassword: (value, values) =>
          value !== values.password ? "Passwords did not match" : null,
        phone: (value) =>
          /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/.test(
            value
          )
            ? null
            : "This number does not exist or is not a valid format please try entering number again. ",
        // code: (value) => (value.length === 6 ? null : "Verification code error!"),
      },
    });

  const handleSubmit = (values: FormValue) => {
    signUp.mutate(
      {
        email: values.email,
        password: values.password,
        first_name: values.fName,
        last_name: values.lName,
        user_type: "consumer",
        phone_number: values.phone,
        region: values.region,
        city: values.city,
        street: "9, Ibn Sino",
        zip_code: "160514",
        profile_image: values.profile_image_id,
      },
      {
        onSuccess() {
          setOpened(true);
        },
      }
    );
    // send registerationndata
    console.log(values);
  };
  const checkVerificationCode = () => {
    const { code, email } = values;
    verification.mutate(
      { code, email },
      {
        onSuccess() {
          setOpened(false);
          push("/signin");
        },
        onError(err: any) {
          setErrors({ code: "Not valid code" });
        },
      }
    );
  };

  const handleUpload = (file: File) => {
    setMediaUrl(URL.createObjectURL(file));

    upload.mutate(
      { file },
      {
        onSuccess(res) {
          setValues({ ...values, profile_image_id: res.id });
        },
        onError() {
          setMediaUrl("");
        },
      }
    );
  };
  return (
    <>
      <Home1 />

      <Container size="sm">
        <Typography align="center" m="20px" variant="h3" component="h2">
          Sign Up
        </Typography>
        <form onSubmit={onSubmit(handleSubmit)}>
          <label htmlFor="icon-button-file">
            <Typography mt="20px" variant="body1" component="h2">
              Profile picture
            </Typography>
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                e.target.files &&
                  e.target.files.length > 0 &&
                  handleUpload(e.target.files[0]);
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          {mediaUrl && (
            <div style={{ position: "relative", width: "min-content" }}>
              {upload.isLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: "10",
                    transform: "translate(-50%,-50%",
                  }}
                >
                  <Loader size="md" />
                </div>
              )}

              <Avatar size="xl" src={mediaUrl} />
            </div>
          )}
          <InputWrapper required label="Email">
            <TextInput size="md" {...getInputProps("email")} />
          </InputWrapper>

          <InputWrapper required label="First Name">
            <TextInput size="md" {...getInputProps("fName")} />
          </InputWrapper>
          <InputWrapper required label="Last Name">
            <TextInput size="md" {...getInputProps("lName")} />
          </InputWrapper>
          <InputWrapper required label="Password ">
            <TextInput size="md" {...getInputProps("password")} />
          </InputWrapper>
          <InputWrapper required label="Confirm password">
            <TextInput size="md" {...getInputProps("confirmPassword")} />
          </InputWrapper>
          <InputWrapper required label="Phone">
            <TextInput size="md" {...getInputProps("phone")} />
          </InputWrapper>
          <Autocomplete
            size="md"
            label="Region"
            placeholder="Pick one"
            data={regions}
            {...getInputProps("region")}
          />
          <InputWrapper label="City">
            <TextInput size="md" {...getInputProps("city")} />
          </InputWrapper>
          <Button
            disabled={!mediaUrl}
            loading={signUp.isLoading}
            style={{ marginTop: "20px", marginBottom: "20px" }}
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
        <div>
          <Typography align="center" m="20px" variant="caption" component="h2">
            Already have an account?
            <Link to="/signin">Signin</Link>
          </Typography>
        </div>
      </Container>
      <Modal
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <InputWrapper label="Verification code">
          <TextInput size="md" {...getInputProps("code")} required />
        </InputWrapper>
        <Button mt="md" fullWidth onClick={checkVerificationCode}>
          Verify
        </Button>
      </Modal>
    </>
  );
};

export default RegisterPage;
