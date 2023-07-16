const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //   若要儲存google回傳的相關資料，可這裡用User的schema
      // 把資料傳到req.session
      done(null, profile);
    }
  )
);

// 當使用session時得用這些，使req賦予user這個屬性，裡面的東西為done回傳出來的profile
passport.serializeUser((user, done) => {
  done(null, user);
});

// 當使用session時得用這些
passport.deserializeUser((user, done) => {
  done(null, user);
});
