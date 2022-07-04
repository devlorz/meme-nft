import React from "react";
import { createStyles, Header, Container, Group, Button } from "@mantine/core";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function HeaderAction({ buttonClick, isLoggedIn }) {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} mb={30} fixed>
      <Container className={classes.inner} fluid>
        Meme NFT
        <Group spacing={5} className={classes.links}>
          {/* {items} */}
        </Group>
        <Button radius="xl" sx={{ height: 30 }} onClick={buttonClick}>
          {isLoggedIn ? "Sign out" : "Sign in"}
        </Button>
      </Container>
    </Header>
  );
}
