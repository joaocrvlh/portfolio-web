import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  locales: ["en", "pt"],

  defaultLocale: "pt",
});

export default middleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
