import { Button, Container, InputWrapper, TextInput } from "@mantine/core";
import { Typography } from "@mui/material";
import { Avatar, Badge, Modal } from "@mantine/core";
import { useGetProfile } from "../../server-state/queries/use-get-profile";
import { useLogout } from "../../server-state/mutations/use-logout";
import { useState } from "react";
import { useAuth } from "../../state/auth/auth.state";
import { useHistory } from "react-router-dom";
import { useDeleteProfile } from "../../server-state/mutations/use-delete-profile";
import { useChangePassword } from "../../server-state/mutations/use-change-password";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

interface ChangePasswordInterface {
  password: string;
  confirm_password: string;
  current_password: string;
}

const ProfilePage = () => {
  const { push } = useHistory();
  const { t, i18n } = useTranslation();
  const changePassword = useChangePassword();
  const { data } = useGetProfile();
  const logout = useLogout();
  const deleteProfile = useDeleteProfile();
  const {
    tokens: { access, refresh },
  } = useAuth();
  const isLogin = Boolean(access);
  if (!isLogin) {
    push("/");
  }
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);

  const { onSubmit, getInputProps } = useForm<ChangePasswordInterface>({
    initialValues: {
      confirm_password: "",
      current_password: "",
      password: "",
    },
    validate: {
      current_password: (value) =>
        /^.*(?=.{13,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(value)
          ? null
          : "Password must contain at least 13 characters, one uppercase, one number",
      password: (value) =>
        /^.*(?=.{13,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(value)
          ? null
          : "Password must contain at least 13 characters, one uppercase, one number",
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const logoutHandler = () => {
    logout.mutate(
      { refresh_token: refresh },
      {
        onSuccess(res) {
          console.log(res);
        },
      }
    );
  };
  const deletdHandler = () => {
    deleteProfile.mutate(() => {});
  };
  const handleChangePassword = (values: ChangePasswordInterface) => {
    const { confirm_password, current_password, password } = values;

    changePassword.mutate(
      { confirm_password, current_password, password },
      {
        onSuccess() {
          setOpened3(false);
        },
        onError(err: any) {
          console.dir(err.response.data.errors[0].message);

          // setErrors({ current_password: "Password is wrong" });
        },
      }
    );
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container size="md">
        <Typography align="center" m="20px" variant="h4" component="h2">
          {t("profile.h1")}
        </Typography>
        <Avatar radius="xl" size={100} src={data?.profile_image?.file} />
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          Email: {data?.email}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          {t("profile.name")}: {data?.first_name} {data?.last_name}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          {t("profile.number")}: {data?.phone_number}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          {t("profile.location")}: {data?.region} {t("profile.region")}{" "}
          {data?.city} {t("profile.city")} {data?.street} {t("profile.street")}
        </Typography>
        {t("profile.type")}:
        <Badge
          variant="gradient"
          mb="20px"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
        >
          {data?.user_type}
        </Badge>
        <div
          style={{
            marginBottom: "50px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => push("/edit-profile", { ...data })}
            styles={{
              root: { width: "20%", minWidth: "140px", margin: "10px" },
            }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            {t("profile.edit")}
          </Button>
          <Button
            onClick={() => setOpened3(true)}
            styles={{
              root: { width: "20%", minWidth: "140px", margin: "10px" },
            }}
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            {t("profile.change_password")}
          </Button>
          <Button
            onClick={() => setOpened(true)}
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            styles={{
              root: { width: "20%", minWidth: "140px", margin: "10px" },
            }}
          >
            {t("profile.log_out")}
          </Button>
          <Button
            onClick={() => setOpened2(true)}
            styles={{
              root: { width: "20%", minWidth: "140px", margin: "10px" },
            }}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            {t("profile.delete")}
          </Button>
        </div>
      </Container>
      {/* logout modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
      >
        <Typography align="center" m="20px" variant="subtitle1" component="h2">
          {t("profile.question_log_out")}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button mr="xl" color="red" onClick={logoutHandler}>
            {t("profile.log_out")}
          </Button>
          <Button color="blue" onClick={() => setOpened(false)}>
            {t("profile.close")}
          </Button>
        </div>
      </Modal>
      {/* delete account modal */}
      <Modal
        opened={opened2}
        onClose={() => setOpened2(false)}
        withCloseButton={false}
      >
        <Typography align="center" m="20px" variant="subtitle1" component="h2">
          {t("profile.question_delete")}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button mr="xl" color="red" onClick={deletdHandler}>
            {t("profile.delete")}
          </Button>
          <Button color="blue" onClick={() => setOpened2(false)}>
            {t("profile.close")}
          </Button>
        </div>
      </Modal>
      {/* change password modal*/}
      <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        withCloseButton={false}
      >
        <Typography align="center" m="20px" variant="subtitle1" component="h2">
          {t("profile.change_pass")}
        </Typography>
        <form onSubmit={onSubmit(handleChangePassword)}>
          <InputWrapper label={t("profile.current")}>
            <TextInput
              size="md"
              {...getInputProps("current_password")}
              required
            />
          </InputWrapper>
          <InputWrapper label={t("profile.new")}>
            <TextInput size="md" {...getInputProps("password")} required />
          </InputWrapper>
          <InputWrapper label={t("profile.confirm")}>
            <TextInput
              size="md"
              {...getInputProps("confirm_password")}
              required
            />
          </InputWrapper>
          <Button
            loading={changePassword.isLoading}
            type="submit"
            mt="md"
            fullWidth
          >
            {t("profile.change_pass")}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
