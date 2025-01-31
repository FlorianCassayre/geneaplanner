import {Avatar, CircularProgress, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const IdentificationAvatar = () => {

    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    });
    const [ancreDuMenuAvatar, modifierAncreDuMenuAvatar] = useState(null);
    const menuAvatarEstOuvert = Boolean(ancreDuMenuAvatar);
    const ouvrirMenuAvatar = (event) => {
        modifierAncreDuMenuAvatar(event.currentTarget);
    };
    const fermerMenuAvatar = () => {
        modifierAncreDuMenuAvatar(null);
    };

    return (
        <React.Fragment>
            {isLoading && (
                <div className="AppBarIcones">
                    <CircularProgress
                        color="secondary"
                        size={38}
                    />
                </div>
            )}
            {isAuthenticated && (
                <div className="AppBarIcones">
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ouvrirMenuAvatar}
                        color="inherit"
                        className="BoutonAvatar"
                    >
                        <Tooltip title={user.name}>
                            <Avatar
                                alt={user.name}
                                src={user.picture}
                                className="Avatar"
                            />
                        </Tooltip>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={ancreDuMenuAvatar}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        keepMounted
                        open={menuAvatarEstOuvert}
                        onClose={fermerMenuAvatar}
                    >
                        <MenuItem onClick={() => {
                        }}>Profile</MenuItem>
                        <MenuItem onClick={() => logout()}>Déconnexion</MenuItem>
                    </Menu>
                </div>
            )}
        </React.Fragment>
    );
};
