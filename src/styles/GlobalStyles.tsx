import { withStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

type Styles = (theme: Theme) => object

const styles: Styles = theme => ({
    '@global': {
        'html': {
            padding: 0,
            margin: 0,
            scrollBehavior: 'smooth',
        },
        'body': {
            padding: 0,
            margin: 0,
        },
        'a': {
            color: 'inherit',
            textDecoration: 'none',
        },
        '*': {
            boxSizing: 'border-box'
        },
        '.container': {
            width: "100%",
            height: "100%",
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            margin: "auto",
            [theme.breakpoints.up("sm")]: {
                maxWidth: 540
            },
            [theme.breakpoints.up("md")]: {
                maxWidth: 720
            },
            [theme.breakpoints.up("lg")]: {
                maxWidth: 1170
            }
        },
    }
})

function GlobalStyles() {
    return null;
}

export default withStyles(styles, { withTheme: true })(GlobalStyles);
