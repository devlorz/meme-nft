import React from "react";
import { createStyles } from "@mantine/core";
import { Heart } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: "white",
  },

  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  heart: {
    margin: "0 5px",
  },
}));

export default function FooterCentered({}) {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        Made with
        <Heart
          size={24}
          strokeWidth={2}
          color={"#bf4042"}
          className={classes.heart}
        />
        by leelorz
      </div>
    </div>
  );
}
