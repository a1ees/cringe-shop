import { useLayoutEffect, useState } from "react";

export const useTheme = (): { theme: string, setTheme: (theme: string) => void } => {
    const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = isDarkTheme ? 'dark' : 'light';

    const [theme, setTheme] = useState<string>(localStorage.getItem('app-theme') || defaultTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
};
