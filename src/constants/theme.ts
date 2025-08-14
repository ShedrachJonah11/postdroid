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
    titleBackground: string;
    leftBorder: string;
    leftBorderLine: string;
    methodSelector: {
      background: string;
      border: string;
      text: string;
    };
    input: {
      border: string;
    };
    tabView: {
      background: string;
      activeText: string;
      inactiveText: string;
    };
    bodyTypeSelector: {
      selectedBackground: string;
      selectedText: string;
      unselectedBackground: string;
      unselectedText: string;
      border: string;
    };
    button: {
      addParameter: {
        background: string;
        text: string;
      };
      sendRequest: {
        background: string;
        text: string;
      };
    };
    keyValueEditor: {
      background: string;
      border: string;
      text: string;
      icon: string;
      deleteIcon: string;
      divider: string;
    };
    borderLine: string;
    response: {
      statusBackground: string;
      statusText: string;
      timeBackground: string;
      timeText: string;
      statusBadgeBackground: string;
      contentBackground: string;
      contentBorder: string;
    };
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
    primary: "#71C6FF",
    secondary: "#5E5CE6",
    accent: "#BF5AF2",
    background: "#FFFFFF",
    card: "#F4FAFF",
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
    titleBackground: "#71C6FF",
    leftBorder: "#143447",
    leftBorderLine: "#15699B3",
    methodSelector: {
      background: "#DEF3FF",
      border: "#14344766",
      text: "#143447",
    },
    input: {
      border: "#E3E3E3",
    },
    tabView: {
      background: "#2C3E50",
      activeText: "#143447",
      inactiveText: "#FFFFFF",
    },
    bodyTypeSelector: {
      selectedBackground: "#2C3E50",
      selectedText: "#FFFFFF",
      unselectedBackground: "#DEF3FF",
      unselectedText: "#143447",
      border: "#14344766",
    },
    button: {
      addParameter: {
        background: "#FF0763",
        text: "#FFFFFF",
      },
      sendRequest: {
        background: "#FFE0EB",
        text: "#FF0763B2",
      },
    },
    keyValueEditor: {
      background: "#FEF7FA",
      border: "#FF8FB8",
      text: "#8E8E93",
      icon: "#8E8E93",
      deleteIcon: "#FF0763",
      divider: "#E3E3E3",
    },
    borderLine: "#E3E3E3",
    response: {
      statusBackground: "#DEF3FF",
      statusText: "#143447",
      timeBackground: "#DEF3FF",
      timeText: "#143447",
      statusBadgeBackground: "#71C6FF",
      contentBackground: "#FFFFFF",
      contentBorder: "#E3E3E3",
    },
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
    titleBackground: "#DEF3FF",
    leftBorder: "#71C6FF",
    leftBorderLine: "#71C6FF",
    methodSelector: {
      background: "#DEF3FF",
      border: "#14344766",
      text: "#143447",
    },
    input: {
      border: "#E3E3E3",
    },
    tabView: {
      background: "#2C3E50",
      activeText: "#143447",
      inactiveText: "#FFFFFF",
    },
    bodyTypeSelector: {
      selectedBackground: "#2C3E50",
      selectedText: "#FFFFFF",
      unselectedBackground: "#DEF3FF",
      unselectedText: "#143447",
      border: "#14344766",
    },
    button: {
      addParameter: {
        background: "#FF0763",
        text: "#FFFFFF",
      },
      sendRequest: {
        background: "#FFE0EB",
        text: "#FF0763B2",
      },
    },
    keyValueEditor: {
      background: "#FEF7FA",
      border: "#FF8FB8",
      text: "#8E8E93",
      icon: "#8E8E93",
      deleteIcon: "#FF0763",
      divider: "#E3E3E3",
    },
    borderLine: "#E3E3E3",
    response: {
      statusBackground: "#DEF3FF",
      statusText: "#143447",
      timeBackground: "#DEF3FF",
      timeText: "#143447",
      statusBadgeBackground: "#71C6FF",
      contentBackground: "#FFFFFF",
      contentBorder: "#E3E3E3",
    },
    requestMethodColors: {
      ...lightTheme.colors.requestMethodColors,
    },
  },
};
