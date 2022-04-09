import { Button, Container } from "@mantine/core";
import { Typography } from "@mui/material";
import { Avatar, Badge, Modal } from "@mantine/core";
import { useGetProfile } from "../../server-state/queries/use-get-profile";
import { useLogout } from "../../server-state/mutations/use-logout";
import { useState } from "react";
import { useAuth } from "../../state/auth/auth.state";
import { useHistory } from "react-router-dom";
import { useDeleteProfile } from "../../server-state/mutations/use-delete-profile";

const ProfilePage = () => {
  const { push } = useHistory();

  const {
    tokens: { access },
  } = useAuth();
  const isLogin = Boolean(access);
  if (!isLogin) {
    push("/");
  }
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const {
    tokens: { refresh },
  } = useAuth();

  const { data } = useGetProfile();
  const logout = useLogout();
  const deleteProfile = useDeleteProfile();
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
    deleteProfile.mutate(() => {}, {
      onSuccess(res) {
        console.log(res);
      },
    });
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
          Profile Page
        </Typography>
        <Avatar radius="xl" size={100} src={data?.profile_image.file} />
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          Email: {data?.email}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          Name: {data?.first_name} {data?.last_name}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          Phone number: {data?.phone_number}
        </Typography>
        <Typography mt="20px" mb="20px" variant="subtitle1" component="h2">
          Location: {data?.region} region {data?.city} city
        </Typography>
        User Type:
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
            styles={{ root: { width: "30%" } }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Edit profile
          </Button>
          <Button
            onClick={() => setOpened(true)}
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            styles={{ root: { width: "30%" } }}
          >
            Log Out
          </Button>
          <Button
            onClick={() => setOpened2(true)}
            styles={{ root: { width: "30%" } }}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Delete profile
          </Button>
        </div>
      </Container>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
      >
        <Typography align="center" m="20px" variant="subtitle1" component="h2">
          Do you want to log out?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button mr="xl" color="red" onClick={logoutHandler}>
            Log out
          </Button>
          <Button color="blue">Close</Button>
        </div>
      </Modal>
      <Modal
        opened={opened2}
        onClose={() => setOpened(false)}
        withCloseButton={false}
      >
        <Typography align="center" m="20px" variant="subtitle1" component="h2">
          Do you want to deletd profile?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button mr="xl" color="red" onClick={deletdHandler}>
            Deelete
          </Button>
          <Button color="blue">Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
