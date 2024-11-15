import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.user.role == "admin";
    },
  },
});

export const config = {
  matcher: ["/codes/:path*"],
};
