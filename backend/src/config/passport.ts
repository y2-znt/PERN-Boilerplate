import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_URL } from "./env";
import prisma from "./prismaClient";

console.log("SERVER_URL utilisé :", SERVER_URL);
console.log("Redirect URI :", `${SERVER_URL}/api/auth/google/callback`);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Email not provided by Google"));
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email }],
          },
        });

        if (existingUser) {
          // Update Google ID if not set
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { googleId: profile.id },
            });
          }
          return done(null, { ...existingUser, userId: existingUser.id });
        }

        // Create new user
        const newUser = await prisma.user.create({
          data: {
            email,
            username: profile.displayName || email.split("@")[0],
            googleId: profile.id,
            avatarUrl: profile.photos?.[0]?.value || null,
          },
        });

        return done(null, { ...newUser, userId: newUser.id });
      } catch (error) {
        console.error("❌ Error Google OAuth:", error);
        return done(error as Error);
      }
    }
  )
);

export default passport;
