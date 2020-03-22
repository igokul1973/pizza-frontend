import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

declare module "@material-ui/core/styles/createMuiTheme" {
	interface Theme {
		appDrawer: {
			width: React.CSSProperties["width"];
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
			main: "#13598b"
		},
		secondary: {
			main: "#8b4513"
		}
	},
	verticalMenu: {
		width: 300
	},
	typography: {
		h1: {
			fontSize: "3rem"
		},
		h2: {
			fontSize: "2.6rem"
		},
		h3: {
			fontSize: "2.2rem"
		},
		h4: {
			fontSize: "1.8rem"
		},
		h5: {
			fontSize: "1.4rem"
		},
		h6: {
			fontSize: "1rem"
		}
	},
	overrides: {
		MuiLink: {
			underlineHover: {
				"&:hover": {
					textDecoration: "none",
					cursor: "pointer"
				}
			}
		}
	}
});

baseTheme = responsiveFontSizes(baseTheme);

export default baseTheme;
