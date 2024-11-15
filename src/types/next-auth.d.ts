import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      user: {
        id: number;
        email: string;
        name: string;
        image: string;
        role: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      image: string;
      role: string;
    };
  }
}
