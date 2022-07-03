import React from "react";
import { createStyles, Title, Grid } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 30,
    lineHeight: 1.2,
    fontWeight: 900,
    marginBottom: 20,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },
}));

export default function List({ nfts }) {
  const { classes } = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "960px",
      }}
    >
      {nfts.length > 0 && (
        <>
          <Title className={classes.title}>Your NFT</Title>
          <Grid>
            {nfts.map((nft) => (
              <Grid.Col md={6} lg={3} key={nft.token_id}>
                <div
                  style={{
                    marginRight: 5,
                    flexGrow: 1,
                    flexBasis: "50%",
                  }}
                >
                  <img style={{ width: "100%" }} src={nft.metadata.media} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    {nft.metadata.title}
                  </div>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
