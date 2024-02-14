import React from "react";
import { useGetIdentity } from "@refinedev/core";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import product from "../../../assets/productIcon.svg";
import profiles from "../../../assets/profileIcon.svg";
import logo from "../../../assets/logo.svg";
import Typography from "@mui/material/Typography";
import Profile from "components/common/Profile";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });
  const showUserInfo = user && (user.name || user.avatar);
  const navigate = useNavigate();

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{ background: "#fcfcf" }}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-start"
          alignItems="center"
        >
          <img src={logo} onClick={()=> navigate("/")} />
        </Stack>

        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          {showUserInfo && (
            <Stack direction="row" gap="16px" alignItems="center">
             
              <img src={product} height={30} width={30}  onClick={()=> navigate("/properties")}/>
              <Typography fontSize={18} fontWeight={600} color="#11142d" onClick={()=> navigate("/properties")} style={{marginRight:'10px'}}>
                Products
              </Typography>
            
              {/* {user.avatar && ( */}
                 {/* <Avatar src={user?.avatar} alt={user?.name} /> */}
                <img src={profiles} height={30} width={30} onClick={()=> navigate("/my-profile")} style={{margin:'20px'}}/>
            
              {/* {user.name && (
                <Typography variant="subtitle2">{user?.name}</Typography>
              )} */}
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
