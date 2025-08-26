import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";
import { verifyPassword } from "@/utils/password";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        try {
          console.log("Auth attempt for:", credentials.email);

          const client = await clientPromise;
          const db = client.db("nextauth-app"); // Explicitly set database name
          const users = db.collection("users");
          console.log("Connected to auth database:", db.databaseName);

          const user = await users.findOne({ email: credentials.email });
          console.log("User found:", !!user);

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );
          console.log("Password valid:", isValid);

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user", // Include role in user object
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add role to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Add role to session
      }
      return session;
    },
  },
};
