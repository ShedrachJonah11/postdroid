export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
    subtext: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    statusBar: "light" | "dark";
    tabBar: string;
    tabBarInactive: string;
    requestMethodColors: {
      GET: string;
      POST: string;
      PUT: string;
      DELETE: string;
      PATCH: string;
      OPTIONS: string;
      HEAD: string;
    };
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    accent: "#BF5AF2",
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#000000",
    subtext: "#8E8E93",
    border: "#E5E5EA",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    info: "#5AC8FA",
    statusBar: "dark",
    tabBar: "#FFFFFF",
    tabBarInactive: "#8E8E93",
    requestMethodColors: {
      GET: "#34C759",
      POST: "#0A84FF",
      PUT: "#5E5CE6",
      DELETE: "#FF3B30",
      PATCH: "#FF9F0A",
      OPTIONS: "#5AC8FA",
      HEAD: "#BF5AF2",
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  typography: {
    fontFamily: {
      regular: "Inter-Regular",
      medium: "Inter-Medium",
      semibold: "Inter-SemiBold",
      bold: "Inter-Bold",
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: "#1C1C1E",
    card: "#2C2C2E",
    text: "#FFFFFF",
    subtext: "#8E8E93",
    border: "#38383A",
    statusBar: "light",
    tabBar: "#1C1C1E",
    tabBarInactive: "#8E8E93",
    requestMethodColors: {
      ...lightTheme.colors.requestMethodColors,
    },
  },
};
