import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <>
      <div>
        <div>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <div className="text-white font-bold gap-10 my-5 flex justify-center">
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Intagram</div>
                <div>Youtube</div>
              </div>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Footer;
