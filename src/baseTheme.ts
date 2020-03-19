import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

/*
    colors: (
            blue: darken(#61dafb, 30%),
            brown: saddlebrown,
            red: (
                    base: #FF0000,
                    light: #EEEEFF,
                    dark: #5555FF
            ),
            green: mix(saddlebrown, darken(#61dafb, 30%)),
            orange: (
                base: #d88300
            )
    )
*/

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appDrawer: {
            width: React.CSSProperties['width'];
            breakpoint: Breakpoint;
        };
        verticalMenu: {
            width: number;
        };
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        verticalMenu?: {
            width: number;
        };
    }
}

let baseTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#13598b'
        },
        secondary: {
            main: '#8b4513'
        }
    },
    verticalMenu: {
        width: 260
    }
});

baseTheme = responsiveFontSizes(baseTheme);

export default baseTheme;
